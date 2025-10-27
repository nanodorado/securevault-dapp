# 🚀 Quick Start: Push & Deploy

## Push to GitHub (2 steps)

1. **Create repo**: https://github.com/new
   - Name: `securevault-dapp`
   - Public ✅
   - Don't initialize

2. **Push code**:
```bash
cd /Users/marianodorado/Documents/securevault-dapp
git remote set-url origin https://github.com/YOUR_USERNAME/securevault-dapp.git
git push -u origin main
```

## Deploy to Vercel (1 click)

1. Go to **https://vercel.com**
2. Sign in with GitHub
3. Import `securevault-dapp`
4. Add env vars:
   ```
   VITE_CONTRACT_ADDRESS=0xa6Db445e0ef1f0d4e18A9C0c848713D4381699CC
   VITE_TIMELOCK_ADDRESS=0xAACD4f270A9DC3f014FFE7AdC7bd6e4A9820C702
   VITE_NETWORK_NAME=sepolia
   VITE_CHAIN_ID=11155111
   ```
5. Click **Deploy** ✨

## Is it Secure? ✅ YES!

- ✅ `.env` gitignored (contains no secrets anyway)
- ✅ No private keys (MetaMask handles)
- ✅ Contract address is public (on Etherscan)
- ✅ HTTPS automatic (Vercel)

## Cost? 💰 FREE!

- Vercel free tier = perfect for this
- Sepolia testnet = free

## Recommended? ✅ YES!

Vercel is used by: Uniswap, Aave, Compound, and thousands of dApps.

---

**See `DEPLOYMENT.md` for full guide**
