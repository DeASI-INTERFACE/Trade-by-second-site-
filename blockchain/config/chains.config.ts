/**
 * Multi-Chain Blockchain Configuration
 * Supports: Ethereum, Bitcoin, Solana, Polygon
 * Includes both Mainnet and Testnet endpoints
 */

export const CHAIN_CONFIG = {
  ethereum: {
    name: 'Ethereum',
    chainId: 1,
    rpcUrl: process.env.ETHEREUM_MAINNET_RPC || 'https://eth-mainnet.g.alchemy.com/v2/',
    testnetRpc: process.env.ETHEREUM_TESTNET_RPC || 'https://eth-sepolia.g.alchemy.com/v2/',
    testnetChainId: 11155111,
    blockExplorer: 'https://etherscan.io',
    testnetExplorer: 'https://sepolia.etherscan.io',
    nativeCurrency: 'ETH',
    confirmations: 12,
    websocketUrl: 'wss://eth-mainnet.g.alchemy.com/v2/',
    testnetWebsocketUrl: 'wss://eth-sepolia.g.alchemy.com/v2/',
  },
  polygon: {
    name: 'Polygon',
    chainId: 137,
    rpcUrl: process.env.POLYGON_MAINNET_RPC || 'https://polygon-mainnet.g.alchemy.com/v2/',
    testnetRpc: process.env.POLYGON_TESTNET_RPC || 'https://polygon-mumbai.g.alchemy.com/v2/',
    testnetChainId: 80001,
    blockExplorer: 'https://polygonscan.com',
    testnetExplorer: 'https://mumbai.polygonscan.com',
    nativeCurrency: 'MATIC',
    confirmations: 128,
    websocketUrl: 'wss://polygon-mainnet.g.alchemy.com/v2/',
    testnetWebsocketUrl: 'wss://polygon-mumbai.g.alchemy.com/v2/',
  },
  solana: {
    name: 'Solana',
    chainId: 101,
    rpcUrl: process.env.SOLANA_MAINNET_RPC || 'https://api.mainnet-beta.solana.com',
    testnetRpc: process.env.SOLANA_TESTNET_RPC || 'https://api.devnet.solana.com',
    testnetChainId: 102,
    blockExplorer: 'https://solscan.io',
    testnetExplorer: 'https://solscan.io?cluster=devnet',
    nativeCurrency: 'SOL',
    confirmations: 32,
    websocketUrl: 'wss://api.mainnet-beta.solana.com',
    testnetWebsocketUrl: 'wss://api.devnet.solana.com',
  },
  bitcoin: {
    name: 'Bitcoin',
    chainId: 0,
    rpcUrl: process.env.BITCOIN_MAINNET_RPC || 'https://blockchain.info',
    testnetRpc: process.env.BITCOIN_TESTNET_RPC || 'https://testnet.blockchain.info',
    testnetChainId: 1,
    blockExplorer: 'https://blockchain.com/btc/tx',
    testnetExplorer: 'https://blockchain.com/btc-testnet/tx',
    nativeCurrency: 'BTC',
    confirmations: 6,
    websocketUrl: 'https://blockchain.info',
    testnetWebsocketUrl: 'https://testnet.blockchain.info',
  },
};

export const ENVIRONMENT = process.env.BLOCKCHAIN_ENV || 'testnet';

/**
 * Get chain configuration with environment switching
 */
export const getChainConfig = (chain: string, env: string = ENVIRONMENT) => {
  const config = CHAIN_CONFIG[chain as keyof typeof CHAIN_CONFIG];
  if (!config) throw new Error(`Unsupported chain: ${chain}`);

  return {
    ...config,
    rpcUrl: env === 'mainnet' ? config.rpcUrl : config.testnetRpc,
    chainId: env === 'mainnet' ? config.chainId : config.testnetChainId,
    blockExplorer: env === 'mainnet' ? config.blockExplorer : config.testnetExplorer,
    websocketUrl: env === 'mainnet' ? config.websocketUrl : config.testnetWebsocketUrl,
  };
};

/**
 * Get all supported chains
 */
export const getSupportedChains = (): string[] => {
  return Object.keys(CHAIN_CONFIG);
};

/**
 * Get all mainnet configurations
 */
export const getMainnetChains = () => {
  return getSupportedChains().map((chain) => getChainConfig(chain, 'mainnet'));
};

/**
 * Get all testnet configurations
 */
export const getTestnetChains = () => {
  return getSupportedChains().map((chain) => getChainConfig(chain, 'testnet'));
};
