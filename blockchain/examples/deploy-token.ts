/**
 * Example: Deploy Token to Multiple Chains
 * This example demonstrates how to deploy an ERC-20 token
 * to Ethereum and Polygon simultaneously
 */

import { deployToMultipleChains } from '../blockchain';

// Example ERC-20 Token ABI (simplified)
const TOKEN_ABI = [
  {
    inputs: [
      { name: 'initialSupply', type: 'uint256' },
      { name: 'name', type: 'string' },
      { name: 'symbol', type: 'string' },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
];

// Example bytecode (would come from compilation)
const TOKEN_BYTECODE = '0x60806040...'; // Compiled contract bytecode

async function deployTokenToMultipleChains() {
  try {
    console.log('🚀 Starting multi-chain token deployment...\n');

    const deployments = await deployToMultipleChains([
      {
        chain: 'ethereum',
        contractName: 'MyToken',
        contractAbi: TOKEN_ABI,
        contractBytecode: TOKEN_BYTECODE,
        constructorArgs: [1000000, 'My Token', 'MTK'],
        privateKey: process.env.WALLET_PRIVATE_KEY || '',
      },
      {
        chain: 'polygon',
        contractName: 'MyToken',
        contractAbi: TOKEN_ABI,
        contractBytecode: TOKEN_BYTECODE,
        constructorArgs: [1000000, 'My Token', 'MTK'],
        privateKey: process.env.WALLET_PRIVATE_KEY || '',
      },
    ]);

    console.log('\n✅ Deployment Complete!\n');
    console.log('═══════════════════════════════════════════');

    deployments.forEach((result) => {
      console.log(`\n📍 ${result.chain.toUpperCase()}`);
      console.log(`├─ Address: ${result.contractAddress}`);
      console.log(`├─ TX Hash: ${result.transactionHash}`);
      console.log(`├─ Block: ${result.blockNumber}`);
      console.log(`├─ Gas Used: ${result.gasUsed}`);
      console.log(`└─ Explorer: ${result.explorerUrl}`);
    });

    console.log('\n═══════════════════════════════════════════');
  } catch (error) {
    console.error('❌ Deployment failed:', error);
    process.exit(1);
  }
}

// Run deployment
deployTokenToMultipleChains();
