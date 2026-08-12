````markdown
# 🚀 Multi-Chain Blockchain Module

A comprehensive, production-ready blockchain integration module supporting **Ethereum**, **Polygon**, **Solana**, and **Bitcoin** with unified APIs for smart contract deployment, testing, transaction validation, and real-time monitoring.

## ✨ Features

### 🚀 Smart Contract Deployment
- Deploy smart contracts to multiple blockchains simultaneously
- Automatic gas optimization and fee calculation
- Transaction verification and tracking
- Block explorer integration for all chains
- Error recovery and retry mechanisms

### ✅ Comprehensive Testing
- Unit test framework for smart contracts
- Multi-chain parallel testing
- Gas usage analysis and optimization
- Coverage reporting
- Integration test support

### 🔍 Transaction Validation
- Real-time transaction status checking
- Multi-chain support with unified interface
- Confirmation tracking (respects chain-specific confirmation counts)
- Detailed error reporting and analysis
- Transaction failure diagnostics

### 📊 Real-Time Monitoring
- Live blockchain activity tracking
- Real-time metrics and analytics
- Address balance monitoring
- Network health status indicators
- Event emission for custom handlers
- Customizable monitoring dashboards

## 🔗 Supported Blockchains

| Blockchain | Mainnet ChainID | Testnet | Status | Block Time |
|-----------|-----------------|---------|--------|-----------|
| **Ethereum** | 1 | Sepolia (11155111) | ✅ Active | ~12s |
| **Polygon** | 137 | Mumbai (80001) | ✅ Active | ~2s |
| **Solana** | 101 | Devnet (102) | ✅ Active | ~400ms |
| **Bitcoin** | 0 | Testnet | ✅ Active | ~10m |

## 📦 Installation

```bash
npm install @de-asi/blockchain-module

# or with yarn
yarn add @de-asi/blockchain-module
```

## ⚙️ Configuration

### 1. Create Environment File

```bash
cp .env.blockchain.example .env.blockchain
```

### 2. Add Your RPC URLs and Private Key

```env
BLOCKCHAIN_ENV=testnet

# Ethereum (use Alchemy, Infura, or QuickNode)
ETHEREUM_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_KEY
ETHEREUM_TESTNET_RPC=https://eth-sepolia.g.alchemy.com/v2/YOUR_KEY

# Polygon
POLYGON_RPC_URL=https://polygon-mainnet.g.alchemy.com/v2/YOUR_KEY
POLYGON_TESTNET_RPC=https://polygon-mumbai.g.alchemy.com/v2/YOUR_KEY

# Solana
SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
SOLANA_TESTNET_RPC=https://api.devnet.solana.com

# Bitcoin
BITCOIN_RPC_URL=https://blockchain.info
BITCOIN_TESTNET_RPC=https://testnet.blockchain.info

# Wallet (KEEP SECURE!)
WALLET_PRIVATE_KEY=0x...
WALLET_ADDRESS=0x...
```

## 🎯 Usage Examples

### Deploy Smart Contracts

```typescript
import { deployToMultipleChains } from '@de-asi/blockchain-module';

const deployments = await deployToMultipleChains([
  {
    chain: 'ethereum',
    contractName: 'MyToken',
    contractAbi: tokenABI,
    contractBytecode: tokenBytecode,
    constructorArgs: ['My Token', 'MTK', 18],
    privateKey: process.env.WALLET_PRIVATE_KEY,
    gasLimit: ethers.parseUnits('3', 'mwei'),
  },
  {
    chain: 'polygon',
    contractName: 'MyToken',
    contractAbi: tokenABI,
    contractBytecode: tokenBytecode,
    constructorArgs: ['My Token', 'MTK', 18],
    privateKey: process.env.WALLET_PRIVATE_KEY,
  },
]);

deployments.forEach(result => {
  console.log(`✅ Deployed to ${result.chain}`);
  console.log(`Address: ${result.contractAddress}`);
  console.log(`TX Hash: ${result.transactionHash}`);
  console.log(`Explorer: ${result.explorerUrl}`);
});
```

### Run Tests

```typescript
import { EVMTestSuite, generateTestReport } from '@de-asi/blockchain-module';

const testSuite = new EVMTestSuite('ethereum', process.env.WALLET_PRIVATE_KEY);

const results = await testSuite.runAllTests([
  {
    name: 'Contract Deployment',
    description: 'Test contract deployment',
    execute: async () => {
      return await testSuite.testContractDeployment(abi, bytecode);
    },
  },
  {
    name: 'Balance Check',
    description: 'Verify wallet balance',
    execute: async () => {
      return await testSuite.testBalanceCheck(process.env.WALLET_ADDRESS);
    },
  },
]);

console.log(generateTestReport(results));
```

### Validate Transactions

```typescript
import { validateMultipleTransactions, generateValidationReport } from '@de-asi/blockchain-module';

const validations = await validateMultipleTransactions([
  {
    chain: 'ethereum',
    txHash: '0xabcd1234...',
    fromAddress: '0x...',
    toAddress: '0x...',
  },
  {
    chain: 'polygon',
    txHash: '0xefgh5678...',
    fromAddress: '0x...',
    toAddress: '0x...',
  },
]);

console.log(generateValidationReport(validations));
```

### Monitor Blockchain Activity

```typescript
import { MonitoringDashboard } from '@de-asi/blockchain-module';

const dashboard = new MonitoringDashboard();
dashboard.initializeMonitors();

// Start monitoring all blockchains
await dashboard.startAllMonitors();

// Get current metrics
const metrics = await dashboard.getAllMetrics();
metrics.forEach(metric => {
  console.log(`${metric.chain}: Block #${metric.currentBlock}`);
  console.log(`Status: ${metric.networkStatus}`);
});

// Generate dashboard report
const report = await dashboard.generateDashboard();
console.log(report);

// Clean up
dashboard.stopAllMonitors();
```

## 📚 API Reference

### Deployment Service

#### `deployToEVM(config: DeploymentConfig): Promise<DeploymentResult>`
Deploy to Ethereum or Polygon networks.

**Parameters:**
- `chain`: 'ethereum' | 'polygon'
- `contractName`: string - Name of contract
- `contractAbi`: any - Contract ABI
- `contractBytecode`: string - Compiled bytecode
- `constructorArgs`: any[] - Constructor arguments
- `privateKey`: string - Deployer private key
- `gasLimit`: string (optional)
- `gasPrice`: string (optional)

**Returns:**
```typescript
{
  chain: string;
  contractAddress: string;
  transactionHash: string;
  blockNumber: number;
  gasUsed: string;
  timestamp: string;
  explorerUrl: string;
}
```

#### `deployToSolana(config: DeploymentConfig): Promise<DeploymentResult>`
Deploy Solana programs using Anchor framework.

#### `deployToBitcoin(config: DeploymentConfig): Promise<DeploymentResult>`
Deploy Bitcoin scripts.

#### `deployToMultipleChains(configs: DeploymentConfig[]): Promise<DeploymentResult[]>`
Deploy to multiple chains in parallel.

### Testing Service

#### `EVMTestSuite`
```typescript
constructor(chain: string, privateKey: string)

// Methods
async testContractDeployment(abi, bytecode): Promise<TestResult>
async testContractCall(address, abi, functionName, args): Promise<TestResult>
async testBalanceCheck(address): Promise<TestResult>
async runAllTests(testCases): Promise<TestResult[]>
```

#### `generateTestReport(results: TestResult[]): string`
Generate formatted test report.

### Validation Service

#### `validateEVMTransaction(txData: TransactionData): Promise<ValidationResult>`
Validate Ethereum or Polygon transaction.

#### `validateMultipleTransactions(transactions: TransactionData[]): Promise<ValidationResult[]>`
Validate multiple transactions across chains.

#### `generateValidationReport(results: ValidationResult[]): string`
Generate formatted validation report.

### Monitoring Service

#### `EVMMonitor`
```typescript
constructor(chain: string)

// Methods
async startMonitoring(): Promise<void>
stopMonitoring(): void
async watchAddress(address: string): Promise<void>
async getMetrics(): Promise<MonitoringMetrics>
```

#### `MonitoringDashboard`
```typescript
initializeMonitors(): void
async startAllMonitors(): Promise<void>
stopAllMonitors(): void
async getAllMetrics(): Promise<MonitoringMetrics[]>
async generateDashboard(): Promise<string>
```

## 🔄 GitHub Actions Integration

Automated CI/CD workflow included:

1. **Lint & Test** - Code quality checks and tests
2. **Validate Transactions** - Multi-chain validation
3. **Deploy to Testnet** - Automatic testnet deployment
4. **Monitor** - Continuous blockchain activity tracking
5. **Deploy to Mainnet** - Protected mainnet deployment (requires approval)

See `.github/workflows/blockchain-deploy.yml` for configuration.

## 🛡️ Security Best Practices

⚠️ **CRITICAL SECURITY NOTES:**

1. **Never commit private keys** to version control
   ```bash
   # Add to .gitignore
   .env
   .env.*.local
   *.key
   *.pem
   ```

2. **Use GitHub Secrets** for sensitive data
   ```bash
   # Set secrets in GitHub repository settings
   ETHEREUM_RPC_URL
   WALLET_PRIVATE_KEY
   ```

3. **Validate all contracts** before deployment
   - Use formal verification tools
   - Get security audits for mainnet
   - Test thoroughly on testnet first

4. **Implement access controls**
   - Use GitHub environments for mainnet
   - Require approvals for production deployments
   - Audit all transactions

5. **Monitor for suspicious activity**
   - Enable blockchain monitoring
   - Set up alerts for unusual transactions
   - Review gas prices before deployment

## ⚡ Performance Metrics

| Operation | Network | Time | Gas (approx) |
|-----------|---------|------|--------------|
| Deploy Contract | Ethereum | 30-120s | 1-3M |
| Deploy Contract | Polygon | 10-30s | 1-3M |
| Deploy Program | Solana | 20-60s | N/A |
| Validate TX | Ethereum | <1s | 0 |
| Validate TX | Polygon | <1s | 0 |
| Get Metrics | All | <1s | 0 |

## 🐛 Troubleshooting

### Connection Errors
```
Error: Could not connect to RPC endpoint

Solution:
- Verify RPC URL is correct
- Check API rate limits
- Ensure endpoint is not rate-limited
- Try different RPC provider
```

### Deployment Failures
```
Error: Transaction reverted

Solution:
- Verify ABI and bytecode match
- Check constructor arguments
- Increase gas limit
- Ensure wallet has sufficient balance
```

### Transaction Validation Issues
```
Error: Transaction not found

Solution:
- Verify transaction hash format
- Confirm correct blockchain selected
- Wait for transaction to be included in block
- Check block explorer directly
```

## 📖 Examples

See `examples/` directory for complete examples:
- `/examples/deploy-token.ts` - Deploy ERC-20 token
- `/examples/test-contract.ts` - Run comprehensive tests
- `/examples/validate-swap.ts` - Validate DEX swap
- `/examples/monitor-wallets.ts` - Monitor multiple wallets

## 📝 License

MIT

## 🤝 Support

- 📖 [Documentation](./blockchain/README.md)
- 🐛 [Report Issues](https://github.com/De-ASI-INTERFACE/issues)
- 💬 [Discussions](https://github.com/De-ASI-INTERFACE/discussions)

## 📊 Version History

**v1.0.0** - Initial Release
- Multi-chain deployment (Ethereum, Polygon, Solana, Bitcoin)
- Smart contract testing framework
- Transaction validation suite
- Real-time monitoring dashboard
- GitHub Actions CI/CD integration
- Comprehensive documentation
````
