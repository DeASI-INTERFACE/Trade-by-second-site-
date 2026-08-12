# Blockchain Configuration

## 📌 Environment Selection

Set `BLOCKCHAIN_ENV` to choose between mainnet and testnet:

```env
BLOCKCHAIN_ENV=mainnet  # or 'testnet'
```

---

## 🔗 ETHEREUM

### Mainnet RPC URLs

**Production Ready (Recommended):**
```env
# Alchemy - Most Reliable
ETHEREUM_MAINNET_RPC=https://eth-mainnet.g.alchemy.com/v2/YOUR_API_KEY

# Infura - Industry Standard
ETHEREUM_MAINNET_RPC=https://mainnet.infura.io/v3/YOUR_PROJECT_ID

# QuickNode - High Performance
ETHEREUM_MAINNET_RPC=https://eth-mainnet--rpc.datahub.figment.io/apikey/YOUR_API_KEY/
```

**Free Options:**
```env
# Ankr - Free & Fast
ETHEREUM_MAINNET_RPC=https://rpc.ankr.com/eth

# Chainstack
ETHEREUM_MAINNET_RPC=https://eth-mainnet.nodereal.io/v1/YOUR_API_KEY
```

### Testnet RPC URLs (Sepolia)

```env
# Alchemy
ETHEREUM_TESTNET_RPC=https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY

# Infura
ETHEREUM_TESTNET_RPC=https://sepolia.infura.io/v3/YOUR_PROJECT_ID

# Ankr (Free)
ETHEREUM_TESTNET_RPC=https://rpc.ankr.com/eth_sepolia
```

**Get Testnet ETH:**
- [Sepolia Faucet](https://sepoliafaucet.com)
- [Alchemy Faucet](https://www.alchemy.com/faucets/ethereum-sepolia)

---

## 🟣 POLYGON

### Mainnet RPC URLs

**Production Ready:**
```env
# Alchemy
POLYGON_MAINNET_RPC=https://polygon-mainnet.g.alchemy.com/v2/YOUR_API_KEY

# QuickNode
POLYGON_MAINNET_RPC=https://polygon-mainnet--rpc.datahub.figment.io/apikey/YOUR_API_KEY/

# Infura
POLYGON_MAINNET_RPC=https://polygon-mainnet.infura.io/v3/YOUR_PROJECT_ID
```

**Free Options:**
```env
# Ankr (Free)
POLYGON_MAINNET_RPC=https://rpc.ankr.com/polygon

# Chainstack
POLYGON_MAINNET_RPC=https://polygon-mainnet.nodereal.io/v1/YOUR_API_KEY
```

### Testnet RPC URLs (Mumbai)

```env
# Alchemy
POLYGON_TESTNET_RPC=https://polygon-mumbai.g.alchemy.com/v2/YOUR_API_KEY

# Ankr (Free)
POLYGON_TESTNET_RPC=https://rpc.ankr.com/polygon_mumbai

# Infura
POLYGON_TESTNET_RPC=https://polygon-mumbai.infura.io/v3/YOUR_PROJECT_ID
```

**Get Testnet MATIC:**
- [Polygon Faucet](https://faucet.polygon.technology/)

---

## ◎ SOLANA

### Mainnet RPC URLs

**Production Ready:**
```env
# Official - Free & Recommended
SOLANA_MAINNET_RPC=https://api.mainnet-beta.solana.com

# QuickNode - Premium
SOLANA_MAINNET_RPC=https://solana-mainnet--rpc.datahub.figment.io/apikey/YOUR_API_KEY/

# Serum Network
SOLANA_MAINNET_RPC=https://solana-api.projectserum.com

# GenesysGo
SOLANA_MAINNET_RPC=https://ssc-dao.genesysgo.net/

# Chainstack
SOLANA_MAINNET_RPC=https://solana-mainnet.nodereal.io/v1/YOUR_API_KEY
```

### Testnet RPC URLs (Devnet)

```env
# Official - Free
SOLANA_TESTNET_RPC=https://api.devnet.solana.com

# QuickNode
SOLANA_TESTNET_RPC=https://solana-devnet--rpc.datahub.figment.io/apikey/YOUR_API_KEY/
```

**Get Testnet SOL:**
```bash
solana config set --url https://api.devnet.solana.com
solana airdrop 2  # Request 2 SOL
```

---

## ₿ BITCOIN

### Mainnet RPC URLs

**Free Options (Recommended):**
```env
# Blockchain.info - Most Popular
BITCOIN_MAINNET_RPC=https://blockchain.info

# Mempool Space - Fast & Reliable
BITCOIN_MAINNET_RPC=https://mempool.space/api

# BlockCypher
BITCOIN_MAINNET_RPC=https://api.blockcypher.com/v1/btc/main

# Blockchair
BITCOIN_MAINNET_RPC=https://api.blockchair.com/bitcoin
```

**Premium Options:**
```env
# QuickNode
BITCOIN_MAINNET_RPC=https://bitcoin-mainnet--jsonrpc.datahub.figment.io/apikey/YOUR_API_KEY/
```

### Testnet RPC URLs

```env
# Blockchain.info (Free)
BITCOIN_TESTNET_RPC=https://testnet.blockchain.info

# Mempool Space Testnet
BITCOIN_TESTNET_RPC=https://testnet.mempool.space/api

# BlockCypher Testnet
BITCOIN_TESTNET_RPC=https://api.blockcypher.com/v1/btc/test3

# Blockchair Testnet
BITCOIN_TESTNET_RPC=https://api.blockchair.com/bitcoin/testnet
```

**Get Testnet BTC:**
- [Bitcoin Testnet Faucet](https://testnet-faucet.mempool.space/)
- [Coinfaucet](https://coinfaucet.eu/en/btc-testnet/)

---

## 🔐 Wallet Configuration

```env
# Ethereum/Polygon/Bitcoin Private Key (KEEP SECURE!)
WALLET_PRIVATE_KEY=0x...

# Your wallet address
WALLET_ADDRESS=0x...

# Solana Secret Key (Base58 encoded)
SOLANA_SECRET_KEY=[1,2,3,...,64]

# Bitcoin WIF (Wallet Import Format)
BITCOIN_WIF=...
```

---

## 📡 WebSocket Endpoints (Real-Time Updates)

```env
# Ethereum
ETHEREUM_MAINNET_WS=wss://eth-mainnet.g.alchemy.com/v2/YOUR_API_KEY
ETHEREUM_TESTNET_WS=wss://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY

# Polygon
POLYGON_MAINNET_WS=wss://polygon-mainnet.g.alchemy.com/v2/YOUR_API_KEY
POLYGON_TESTNET_WS=wss://polygon-mumbai.g.alchemy.com/v2/YOUR_API_KEY

# Solana
SOLANA_MAINNET_WS=wss://api.mainnet-beta.solana.com
SOLANA_TESTNET_WS=wss://api.devnet.solana.com
```

---

## ⚙️ Advanced Settings

```env
# Gas Configuration
MAX_GAS_PRICE=500              # Max gas price in Gwei
GAS_BUFFER_MULTIPLIER=1.2      # Buffer multiplier for gas estimation
TIP_MULTIPLIER=1.0             # EIP-1559 tip multiplier

# Rate Limiting
MAX_TPS=10                     # Max transactions per minute
MAX_DEPLOY_ATTEMPTS=3          # Max deployment retries

# Monitoring
MONITORING_ENABLED=true        # Enable blockchain monitoring
MONITORING_INTERVAL=10000      # Monitor check interval (ms)

# Logging
LOG_LEVEL=info                 # error, warn, info, debug
DEBUG_MODE=false               # Enable debug logging
```

---

## 📋 Complete Example Configuration

```env
# ============== ENVIRONMENT ==============
BLOCKCHAIN_ENV=mainnet

# ============== ETHEREUM ==============
ETHEREUM_MAINNET_RPC=https://eth-mainnet.g.alchemy.com/v2/YOUR_ALCHEMY_KEY
ETHEREUM_TESTNET_RPC=https://eth-sepolia.g.alchemy.com/v2/YOUR_ALCHEMY_KEY
ETHEREUM_MAINNET_WS=wss://eth-mainnet.g.alchemy.com/v2/YOUR_ALCHEMY_KEY

# ============== POLYGON ==============
POLYGON_MAINNET_RPC=https://polygon-mainnet.g.alchemy.com/v2/YOUR_ALCHEMY_KEY
POLYGON_TESTNET_RPC=https://polygon-mumbai.g.alchemy.com/v2/YOUR_ALCHEMY_KEY
POLYGON_MAINNET_WS=wss://polygon-mainnet.g.alchemy.com/v2/YOUR_ALCHEMY_KEY

# ============== SOLANA ==============
SOLANA_MAINNET_RPC=https://api.mainnet-beta.solana.com
SOLANA_TESTNET_RPC=https://api.devnet.solana.com

# ============== BITCOIN ==============
BITCOIN_MAINNET_RPC=https://blockchain.info
BITCOIN_TESTNET_RPC=https://testnet.blockchain.info

# ============== WALLET ==============
WALLET_PRIVATE_KEY=0x...
WALLET_ADDRESS=0x...

# ============== ADVANCED ==============
MAX_GAS_PRICE=500
GAS_BUFFER_MULTIPLIER=1.2
MONITORING_ENABLED=true
MONITORING_INTERVAL=10000
LOG_LEVEL=info
```

---

## 🚀 Free-Only Configuration

No API keys required! Free tier endpoints:

```env
BLOCKCHAIN_ENV=testnet

# Ethereum
ETHEREUM_TESTNET_RPC=https://rpc.ankr.com/eth_sepolia

# Polygon
POLYGON_TESTNET_RPC=https://rpc.ankr.com/polygon_mumbai

# Solana
SOLANA_TESTNET_RPC=https://api.devnet.solana.com

# Bitcoin
BITCOIN_TESTNET_RPC=https://testnet.blockchain.info

# Wallet
WALLET_PRIVATE_KEY=0x...
WALLET_ADDRESS=0x...
```

---

## 🔑 Getting API Keys

### Alchemy (Recommended)
1. Go to [alchemy.com](https://www.alchemy.com)
2. Sign up (free tier available)
3. Create app for each blockchain
4. Copy API key from dashboard
5. Add to `.env.blockchain`

### Infura
1. Visit [infura.io](https://infura.io)
2. Create account & project
3. Copy Project ID
4. Use in RPC URL: `https://{network}.infura.io/v3/{PROJECT_ID}`

### QuickNode
1. Go to [quicknode.com](https://www.quicknode.com)
2. Create endpoint for each chain
3. Copy HTTP Provider URL
4. Add to `.env.blockchain`

---

## 📊 Provider Comparison

| Provider | Ethereum | Polygon | Solana | Bitcoin | Free Tier | Speed |
|----------|----------|---------|--------|---------|-----------|-------|
| Alchemy | ✅ | ✅ | ❌ | ❌ | Yes | ⭐⭐⭐⭐⭐ |
| Infura | ✅ | ✅ | ❌ | ❌ | Yes | ⭐⭐⭐⭐ |
| QuickNode | ✅ | ✅ | ✅ | ✅ | No | ⭐⭐⭐⭐⭐ |
| Ankr | ✅ | ✅ | ✅ | ❌ | Yes | ⭐⭐⭐ |
| Blockchain.info | ❌ | ❌ | ❌ | ✅ | Yes | ⭐⭐⭐ |

---

## ⚠️ Security

### DO ✅
- Use environment variables
- Store `.env` in `.gitignore`
- Use GitHub Secrets for CI/CD
- Rotate API keys monthly
- Use separate keys for mainnet/testnet

### DON'T ❌
- Commit private keys to git
- Share API keys
- Use same key for all chains
- Store keys in code
- Commit `.env` files

---

## 🔗 Block Explorers

**Ethereum:**
- Mainnet: [etherscan.io](https://etherscan.io)
- Testnet: [sepolia.etherscan.io](https://sepolia.etherscan.io)

**Polygon:**
- Mainnet: [polygonscan.com](https://polygonscan.com)
- Testnet: [mumbai.polygonscan.com](https://mumbai.polygonscan.com)

**Solana:**
- All: [solscan.io](https://solscan.io)

**Bitcoin:**
- Mainnet: [blockchain.com](https://blockchain.com)
- Testnet: [testnet.blockchain.info](https://testnet.blockchain.info)

---

## 📞 Troubleshooting

**Connection Error:**
- Verify RPC URL is correct
- Check API rate limits
- Try alternative provider

**Rate Limited:**
- Upgrade to paid tier
- Use multiple API keys
- Implement rate limiting

**Invalid ChainID:**
- Verify chain configuration
- Check environment variable
- Confirm network is supported
