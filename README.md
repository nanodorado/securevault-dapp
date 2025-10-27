# 🔐 SecureVault dApp

A decentralized application (dApp) for interacting with a multi-signature Ethereum vault with timelock functionality. Built with React, Vite, and ethers.js.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19.1.1-61dafb.svg)
![ethers.js](https://img.shields.io/badge/ethers.js-6.15.0-blue.svg)

## 🌐 Live Demo

**App:** https://securevault-dapp.vercel.app  
**Contract:** [0xa6Db445e0ef1f0d4e18A9C0c848713D4381699CC](https://sepolia.etherscan.io/address/0xa6Db445e0ef1f0d4e18A9C0c848713D4381699CC)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [How It Works](#how-it-works)
- [User Guide](#user-guide)
- [Smart Contract](#smart-contract)
- [Project Structure](#project-structure)
- [Development](#development)
- [Deployment](#deployment)
- [Security](#security)
- [Troubleshooting](#troubleshooting)
- [License](#license)

---

## 🎯 Overview

SecureVault is a **multi-signature wallet** with **timelock** functionality deployed on Ethereum Sepolia testnet. It provides enterprise-grade security for managing digital assets by requiring multiple owner approvals and enforcing a mandatory delay before transaction execution.

### Key Concepts

- **Multi-Signature**: Requires multiple owners to approve transactions (e.g., 2-of-3, 3-of-5)
- **Timelock**: Enforces a delay between approval and execution (e.g., 1 hour)
- **Pausable**: Emergency pause functionality for suspicious activity
- **On-chain Verification**: All transactions are transparent and verifiable on Etherscan

---

## ✨ Features

### Core Functionality
- 💼 **Wallet Connection**: MetaMask integration with network detection
- 📊 **Real-time Dashboard**: Live vault balance, owners list, and configuration
- 💸 **Propose Transactions**: Create withdrawal proposals with recipient and amount
- ✅ **Multi-sig Approval**: Multiple owners must approve before execution
- ⏱️ **Queue System**: Timelock enforcement with countdown timer
- 🚀 **Execute**: Send ETH after timelock expires
- 🔄 **Auto-refresh**: Data updates every 10 seconds

### Security Features
- 🔒 **Access Control**: Only owners can propose/approve/execute
- ⏰ **Timelock Protection**: Prevents immediate withdrawals
- ⏸️ **Pausable**: Emergency stop for suspicious activity
- 🔐 **ECDSA Signatures**: Cryptographic verification
- 🛡️ **ReentrancyGuard**: Protection against reentrancy attacks

---

## 🛠️ Tech Stack

- **React 19.1.1** - UI framework
- **Vite 7.1.12** - Build tool and dev server
- **ethers.js 6.15.0** - Ethereum JavaScript library
- **Solidity 0.8.20** - Smart contract language
- **OpenZeppelin 5.4.0** - Security libraries
- **Vercel** - Hosting and deployment

---

## 🚀 Getting Started

### Prerequisites

1. **Node.js** 16+ and npm
2. **MetaMask** browser extension
3. **Sepolia testnet ETH** (get from [faucet](https://sepoliafaucet.com))

### Installation

```bash
# Clone repository
git clone https://github.com/nanodorado/securevault-dapp.git
cd securevault-dapp

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start development server
npm run dev
```

Open http://localhost:5173

---

## 🔄 How It Works

### Transaction Lifecycle

```
PROPOSE → APPROVE (multi-sig) → QUEUE → WAIT (timelock) → EXECUTE
```

### Example Flow

1. **Owner 1** proposes: "Send 0.5 ETH to Alice"
2. **Owner 2** approves the transaction
3. **Owner 3** approves (threshold met: 2/3 ✅)
4. **Any owner** queues the transaction
5. **System** enforces timelock (e.g., 1 hour wait)
6. **Any owner** executes after delay
7. **Result**: 0.5 ETH sent to Alice ✅

---

## 📖 User Guide

### 1. Connect Wallet

- Click **"Connect Wallet"**
- Approve MetaMask connection
- Ensure you're on **Sepolia testnet**

### 2. Deposit ETH

**From MetaMask:**
```
1. Click "Send"
2. To: 0xa6Db445e0ef1f0d4e18A9C0c848713D4381699CC
3. Amount: Your choice
4. Confirm
```

### 3. Propose Transaction

- Go to **"Propose Transaction"** tab
- Enter recipient address
- Enter amount in ETH
- Click **"Propose"** and confirm in MetaMask

### 4. Approve (Other Owners)

- Go to **"Transactions"** tab
- Find your transaction
- Click **"Approve"** and confirm

### 5. Queue Transaction

- When approvals meet threshold
- Click **"Queue"** and confirm

### 6. Execute (After Timelock)

- Wait for timelock to expire
- Click **"Execute"** and confirm
- ETH sent! ✅

### Transaction States

| Status | Description | Actions |
|--------|-------------|---------|
| 🟡 Pending | Awaiting approvals | Approve, Cancel |
| 🟢 Approved | Threshold met | Queue |
| 🔵 Queued | In timelock | Wait |
| ⚪ Ready | Can execute | Execute |
| ✅ Executed | Completed | - |

---

## 🔐 Smart Contract

### Deployment Info

- **Network**: Sepolia Testnet (Chain ID: 11155111)
- **Contract**: `0xa6Db445e0ef1f0d4e18A9C0c848713D4381699CC`
- **Timelock**: `0xAACD4f270A9DC3f014FFE7AdC7bd6e4A9820C702`
- **Verified**: ✅ [View on Etherscan](https://sepolia.etherscan.io/address/0xa6Db445e0ef1f0d4e18A9C0c848713D4381699CC#code)

### Core Functions

```solidity
// Transaction Management
proposeTransaction(address to, uint256 amount)
approveTransaction(uint256 txId)
queueTransaction(uint256 txId)
executeTransaction(uint256 txId)
cancelTransaction(uint256 txId)

// Emergency
pause()
unpause()
```

---

## 📁 Project Structure

```
securevault-dapp/
├── src/
│   ├── components/          # React components
│   │   ├── WalletConnect.jsx
│   │   ├── VaultDashboard.jsx
│   │   ├── ProposeTransaction.jsx
│   │   └── TransactionsList.jsx
│   ├── contracts/
│   │   └── SecureVaultABI.js
│   ├── hooks/
│   │   ├── useWallet.js
│   │   └── useVaultInfo.js
│   ├── utils/
│   │   ├── ethereum.js
│   │   └── debug.js
│   ├── App.jsx
│   └── main.jsx
├── .env.example
├── package.json
├── vite.config.js
└── README.md
```

---

## 💻 Development

### Scripts

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Environment Variables

```env
VITE_CONTRACT_ADDRESS=0xa6Db445e0ef1f0d4e18A9C0c848713D4381699CC
VITE_TIMELOCK_ADDRESS=0xAACD4f270A9DC3f014FFE7AdC7bd6e4A9820C702
VITE_NETWORK_NAME=sepolia
VITE_CHAIN_ID=11155111
```

---

## 🚀 Deployment

### Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Import GitHub repository
3. Add environment variables
4. Deploy!

**Auto-deployment**: Every push to `main` triggers new deployment.

---

## 🔒 Security

### What's Safe to Share

✅ **Public**:
- Frontend code
- Contract address
- Network config
- Contract ABI

❌ **Private**:
- Private keys (MetaMask handles these)
- Seed phrases
- Personal wallet info

### Security Features

- `.env` file gitignored
- No private keys in code
- Contract verified on Etherscan
- HTTPS only (Vercel)
- Input validation
- MetaMask signature handling

---

## 🐛 Troubleshooting

### "MetaMask not installed"
**Solution**: Install [MetaMask](https://metamask.io/)

### "Wrong network"
**Solution**: Switch MetaMask to Sepolia testnet

### "Insufficient funds"
**Solution**: Get Sepolia ETH from [faucet](https://sepoliafaucet.com)

### "Connection pending" (-32002)
**Solution**: 
1. Click MetaMask icon
2. Approve/reject pending request
3. Refresh page

### "Not an owner"
**Solution**: Only contract owners can propose/approve transactions

---

## 📞 Resources

- **Live App**: https://securevault-dapp.vercel.app
- **Smart Contract Repo**: https://github.com/nanodorado/evm_secure_vault
- **Frontend Repo**: https://github.com/nanodorado/securevault-dapp
- **Etherscan**: https://sepolia.etherscan.io/address/0xa6Db445e0ef1f0d4e18A9C0c848713D4381699CC
- **User Guide (Spanish)**: [USER_GUIDE.md](./USER_GUIDE.md)

---

## 📄 License

MIT License

---

## 🙏 Acknowledgments

- OpenZeppelin - Security libraries
- ethers.js - Ethereum library
- Vite - Build tool
- Vercel - Hosting
- React - UI framework

---

**Built with ❤️ for secure Ethereum asset management**

🔐 **SecureVault** - Multi-Signature Ethereum Vault with Timelock
