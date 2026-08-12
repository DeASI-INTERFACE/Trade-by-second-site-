use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Transfer};

declare_id!("11111111111111111111111111111111");

#[program]
pub mod guaranteed_returns_trading {
    use super::*;

    /// Initialize the trading pool with guaranteed return parameters
    pub fn initialize_pool(
        ctx: Context<InitializePool>,
        min_return_percentage: u64,
        max_leverage: u64,
        admin_fee_basis_points: u64,
    ) -> Result<()> {
        let pool = &mut ctx.accounts.pool;
        pool.authority = ctx.accounts.authority.key();
        pool.min_return_percentage = min_return_percentage;
        pool.max_leverage = max_leverage;
        pool.admin_fee_basis_points = admin_fee_basis_points;
        pool.total_volume = 0;
        pool.active_trades = 0;
        pool.bump = *ctx.bumps.get("pool").unwrap();

        emit!(PoolInitialized {
            authority: ctx.accounts.authority.key(),
            min_return: min_return_percentage,
            max_leverage,
            admin_fee: admin_fee_basis_points,
        });

        Ok(())
    }

    /// Execute a trade with guaranteed minimum returns
    pub fn execute_trade_with_guarantee(
        ctx: Context<ExecuteTrade>,
        trade_amount: u64,
        guaranteed_return_percentage: u64,
        trade_duration_slots: u64,
    ) -> Result<()> {
        let pool = &mut ctx.accounts.pool;
        let trader = &ctx.accounts.trader;
        let trade_account = &mut ctx.accounts.trade_account;

        // Validate guaranteed return percentage
        require!(
            guaranteed_return_percentage >= pool.min_return_percentage,
            TradeError::ReturnBelowMinimum
        );

        // Validate trade amount
        require!(trade_amount > 0, TradeError::InvalidTradeAmount);

        // Check trader has sufficient balance
        require!(
            ctx.accounts.trader_token_account.amount >= trade_amount,
            TradeError::InsufficientBalance
        );

        // Calculate guaranteed return amount
        let return_amount = (trade_amount as u128)
            .checked_mul(guaranteed_return_percentage as u128)
            .unwrap()
            .checked_div(100)
            .unwrap() as u64;

        // Calculate admin fee
        let admin_fee = (return_amount as u128)
            .checked_mul(pool.admin_fee_basis_points as u128)
            .unwrap()
            .checked_div(10000)
            .unwrap() as u64;

        let guaranteed_payout = return_amount.checked_sub(admin_fee).unwrap();

        // Transfer trader tokens to pool
        let cpi_accounts = Transfer {
            from: ctx.accounts.trader_token_account.to_account_info(),
            to: ctx.accounts.pool_token_account.to_account_info(),
            authority: trader.to_account_info(),
        };

        let cpi_program = ctx.accounts.token_program.to_account_info();
        let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
        token::transfer(cpi_ctx, trade_amount)?;

        // Record trade
        let clock = Clock::get()?;
        trade_account.trader = trader.key();
        trade_account.trade_amount = trade_amount;
        trade_account.guaranteed_return_percentage = guaranteed_return_percentage;
        trade_account.guaranteed_payout = guaranteed_payout;
        trade_account.admin_fee = admin_fee;
        trade_account.start_slot = clock.slot;
        trade_account.end_slot = clock.slot.checked_add(trade_duration_slots).unwrap();
        trade_account.status = TradeStatus::Active;
        trade_account.bump = *ctx.bumps.get("trade_account").unwrap();

        // Update pool stats
        pool.total_volume = pool.total_volume.checked_add(trade_amount).unwrap();
        pool.active_trades = pool.active_trades.checked_add(1).unwrap();

        emit!(TradeExecuted {
            trader: trader.key(),
            trade_amount,
            guaranteed_return: guaranteed_return_percentage,
            guaranteed_payout,
            admin_fee,
            start_slot: clock.slot,
            end_slot: trade_account.end_slot,
        });

        Ok(())
    }

    /// Settle a completed trade and payout guaranteed returns
    pub fn settle_trade(ctx: Context<SettleTrade>) -> Result<()> {
        let trade_account = &mut ctx.accounts.trade_account;
        let pool = &mut ctx.accounts.pool;
        let clock = Clock::get()?;

        // Verify trade maturity
        require!(
            clock.slot >= trade_account.end_slot,
            TradeError::TradeNotMatured
        );

        // Verify trade status
        require!(
            trade_account.status == TradeStatus::Active,
            TradeError::InvalidTradeStatus
        );

        // Verify pool has sufficient funds for payout
        require!(
            ctx.accounts.pool_token_account.amount >= trade_account.guaranteed_payout,
            TradeError::InsufficientPoolFunds
        );

        // Transfer guaranteed payout to trader
        let seeds = &[
            b"pool",
            pool.authority.as_ref(),
            &[pool.bump],
        ];
        let signer_seeds = &[&seeds[..]];

        let cpi_accounts = Transfer {
            from: ctx.accounts.pool_token_account.to_account_info(),
            to: ctx.accounts.trader_token_account.to_account_info(),
            authority: pool.to_account_info(),
        };

        let cpi_program = ctx.accounts.token_program.to_account_info();
        let cpi_ctx = CpiContext::new_with_signer(cpi_program, cpi_accounts, signer_seeds);
        token::transfer(cpi_ctx, trade_account.guaranteed_payout)?;

        // Update trade status
        trade_account.status = TradeStatus::Settled;

        // Update pool stats
        pool.active_trades = pool.active_trades.checked_sub(1).unwrap();

        emit!(TradeSettled {
            trader: trade_account.trader,
            trade_amount: trade_account.trade_amount,
            guaranteed_payout: trade_account.guaranteed_payout,
            admin_fee: trade_account.admin_fee,
            settled_at: clock.slot,
        });

        Ok(())
    }

    /// Claim admin fees
    pub fn claim_admin_fees(ctx: Context<ClaimAdminFees>, amount: u64) -> Result<()> {
        let pool = &ctx.accounts.pool;

        // Verify caller is admin
        require!(
            ctx.accounts.admin.key() == pool.authority,
            TradeError::UnauthorizedAdmin
        );

        // Verify sufficient balance
        require!(
            ctx.accounts.pool_token_account.amount >= amount,
            TradeError::InsufficientPoolFunds
        );

        // Transfer fees to admin
        let seeds = &[
            b"pool",
            pool.authority.as_ref(),
            &[pool.bump],
        ];
        let signer_seeds = &[&seeds[..]];

        let cpi_accounts = Transfer {
            from: ctx.accounts.pool_token_account.to_account_info(),
            to: ctx.accounts.admin_token_account.to_account_info(),
            authority: pool.to_account_info(),
        };

        let cpi_program = ctx.accounts.token_program.to_account_info();
        let cpi_ctx = CpiContext::new_with_signer(cpi_program, cpi_accounts, signer_seeds);
        token::transfer(cpi_ctx, amount)?;

        emit!(AdminFeesClaimed {
            admin: ctx.accounts.admin.key(),
            amount,
            timestamp: Clock::get()?.slot,
        });

        Ok(())
    }

    /// Update pool parameters (admin only)
    pub fn update_pool_params(
        ctx: Context<UpdatePoolParams>,
        new_min_return: u64,
        new_max_leverage: u64,
        new_admin_fee: u64,
    ) -> Result<()> {
        let pool = &mut ctx.accounts.pool;

        // Verify caller is admin
        require!(
            ctx.accounts.admin.key() == pool.authority,
            TradeError::UnauthorizedAdmin
        );

        pool.min_return_percentage = new_min_return;
        pool.max_leverage = new_max_leverage;
        pool.admin_fee_basis_points = new_admin_fee;

        emit!(PoolParamsUpdated {
            new_min_return,
            new_max_leverage,
            new_admin_fee,
            updated_at: Clock::get()?.slot,
        });

        Ok(())
    }

    /// Get trader's active trades
    pub fn get_trader_trades(ctx: Context<GetTraderTrades>) -> Result<TradeInfo> {
        let trade_account = &ctx.accounts.trade_account;
        
        Ok(TradeInfo {
            trader: trade_account.trader,
            trade_amount: trade_account.trade_amount,
            guaranteed_return_percentage: trade_account.guaranteed_return_percentage,
            guaranteed_payout: trade_account.guaranteed_payout,
            status: trade_account.status,
            start_slot: trade_account.start_slot,
            end_slot: trade_account.end_slot,
        })
    }
}

#[derive(Accounts)]
pub struct InitializePool<'info> {
    #[account(init, payer = authority, space = 8 + 32 + 8 + 8 + 8 + 8 + 8 + 1)]
    pub pool: Account<'info, TradingPool>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct ExecuteTrade<'info> {
    #[account(mut)]
    pub pool: Account<'info, TradingPool>,

    #[account(init, payer = trader, space = 8 + 32 + 8 + 8 + 8 + 8 + 8 + 8 + 1 + 1)]
    pub trade_account: Account<'info, Trade>,

    #[account(mut)]
    pub trader: Signer<'info>,

    #[account(mut)]
    pub trader_token_account: Account<'info, TokenAccount>,

    #[account(mut)]
    pub pool_token_account: Account<'info, TokenAccount>,

    pub token_program: Program<'info, Token>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct SettleTrade<'info> {
    #[account(mut)]
    pub pool: Account<'info, TradingPool>,

    #[account(mut)]
    pub trade_account: Account<'info, Trade>,

    #[account(mut)]
    pub pool_token_account: Account<'info, TokenAccount>,

    #[account(mut)]
    pub trader_token_account: Account<'info, TokenAccount>,

    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct ClaimAdminFees<'info> {
    #[account(mut)]
    pub pool: Account<'info, TradingPool>,

    #[account(mut)]
    pub admin: Signer<'info>,

    #[account(mut)]
    pub pool_token_account: Account<'info, TokenAccount>,

    #[account(mut)]
    pub admin_token_account: Account<'info, TokenAccount>,

    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct UpdatePoolParams<'info> {
    #[account(mut)]
    pub pool: Account<'info, TradingPool>,

    pub admin: Signer<'info>,
}

#[derive(Accounts)]
pub struct GetTraderTrades<'info> {
    pub trade_account: Account<'info, Trade>,
}

#[account]
pub struct TradingPool {
    pub authority: Pubkey,
    pub min_return_percentage: u64,
    pub max_leverage: u64,
    pub admin_fee_basis_points: u64,
    pub total_volume: u64,
    pub active_trades: u64,
    pub bump: u8,
}

#[account]
pub struct Trade {
    pub trader: Pubkey,
    pub trade_amount: u64,
    pub guaranteed_return_percentage: u64,
    pub guaranteed_payout: u64,
    pub admin_fee: u64,
    pub start_slot: u64,
    pub end_slot: u64,
    pub status: TradeStatus,
    pub bump: u8,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub enum TradeStatus {
    Active,
    Settled,
    Cancelled,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct TradeInfo {
    pub trader: Pubkey,
    pub trade_amount: u64,
    pub guaranteed_return_percentage: u64,
    pub guaranteed_payout: u64,
    pub status: TradeStatus,
    pub start_slot: u64,
    pub end_slot: u64,
}

#[error_code]
pub enum TradeError {
    #[msg("Return percentage below minimum requirement")]
    ReturnBelowMinimum,

    #[msg("Invalid trade amount")]
    InvalidTradeAmount,

    #[msg("Insufficient balance")]
    InsufficientBalance,

    #[msg("Trade not yet matured")]
    TradeNotMatured,

    #[msg("Invalid trade status")]
    InvalidTradeStatus,

    #[msg("Insufficient pool funds")]
    InsufficientPoolFunds,

    #[msg("Unauthorized admin")]
    UnauthorizedAdmin,
}

// Events
#[event]
pub struct PoolInitialized {
    pub authority: Pubkey,
    pub min_return: u64,
    pub max_leverage: u64,
    pub admin_fee: u64,
}

#[event]
pub struct TradeExecuted {
    pub trader: Pubkey,
    pub trade_amount: u64,
    pub guaranteed_return: u64,
    pub guaranteed_payout: u64,
    pub admin_fee: u64,
    pub start_slot: u64,
    pub end_slot: u64,
}

#[event]
pub struct TradeSettled {
    pub trader: Pubkey,
    pub trade_amount: u64,
    pub guaranteed_payout: u64,
    pub admin_fee: u64,
    pub settled_at: u64,
}

#[event]
pub struct AdminFeesClaimed {
    pub admin: Pubkey,
    pub amount: u64,
    pub timestamp: u64,
}

#[event]
pub struct PoolParamsUpdated {
    pub new_min_return: u64,
    pub new_max_leverage: u64,
    pub new_admin_fee: u64,
    pub updated_at: u64,
}
