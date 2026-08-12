/**
 * Example: Run Tests on Blockchain Code
 * This example demonstrates comprehensive testing
 * of smart contracts across multiple chains
 */

import { EVMTestSuite, generateTestReport } from '../blockchain';

async function runBlockchainTests() {
  try {
    console.log('🧪 Starting blockchain code tests...\n');

    // Create test suite for Ethereum testnet
    const ethTestSuite = new EVMTestSuite('ethereum', process.env.WALLET_PRIVATE_KEY || '');

    const testCases = [
      {
        name: 'Wallet Balance Check',
        description: 'Verify wallet has sufficient balance on Ethereum testnet',
        execute: async () => {
          return await ethTestSuite.testBalanceCheck(process.env.WALLET_ADDRESS || '');
        },
      },
      {
        name: 'Network Connection',
        description: 'Test connection to Ethereum RPC endpoint',
        execute: async () => {
          try {
            const provider = ethTestSuite['provider'];
            await provider.getBlockNumber();
            return true;
          } catch (error) {
            console.error('Network connection failed:', error);
            return false;
          }
        },
      },
    ];

    // Run all tests
    const results = await ethTestSuite.runAllTests(testCases);

    // Generate and display report
    const report = generateTestReport(results);
    console.log(report);

    // Summary
    const passed = results.filter((r) => r.status === 'passed').length;
    const failed = results.filter((r) => r.status === 'failed').length;

    console.log(`\n📊 Test Summary`);
    console.log(`├─ Total: ${results.length}`);
    console.log(`├─ Passed: ${passed}`);
    console.log(`└─ Failed: ${failed}`);

    if (failed > 0) {
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Test execution failed:', error);
    process.exit(1);
  }
}

// Run tests
runBlockchainTests();
