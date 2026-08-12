/**
 * Blockchain Module - Main Entry Point
 * Exports all blockchain services for multi-chain support
 */

export { CHAIN_CONFIG, ENVIRONMENT, getChainConfig } from './config/chains.config';
export { deployToEVM, deployToSolana, deployToBitcoin, deployToMultipleChains } from './services/deploy.service';
export type { DeploymentConfig, DeploymentResult } from './services/deploy.service';
export { EVMTestSuite, SolanaTestSuite, BitcoinTestSuite, generateTestReport } from './services/test.service';
export type { TestCase, TestResult } from './services/test.service';
export { validateEVMTransaction, validateSolanaTransaction, validateBitcoinTransaction, validateMultipleTransactions, generateValidationReport } from './services/validate.service';
export type { TransactionData, ValidationResult } from './services/validate.service';
export { EVMMonitor, SolanaMonitor, BitcoinMonitor, MonitoringDashboard } from './services/monitor.service';
export type { MonitoredAddress, BlockchainEvent, MonitoringMetrics } from './services/monitor.service';
