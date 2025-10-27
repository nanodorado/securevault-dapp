import { ethers } from 'ethers';
import { SECURE_VAULT_ABI } from '../contracts/SecureVaultABI';

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;
const EXPECTED_CHAIN_ID = import.meta.env.VITE_CHAIN_ID;

// Get provider and signer
export const getProvider = () => {
  if (!window.ethereum) {
    throw new Error('MetaMask is not installed');
  }
  return new ethers.BrowserProvider(window.ethereum);
};

export const getSigner = async () => {
  const provider = getProvider();
  return await provider.getSigner();
};

// Get contract instance
export const getContract = async () => {
  const signer = await getSigner();
  return new ethers.Contract(CONTRACT_ADDRESS, SECURE_VAULT_ABI, signer);
};

// Get read-only contract instance
export const getReadOnlyContract = () => {
  const provider = getProvider();
  return new ethers.Contract(CONTRACT_ADDRESS, SECURE_VAULT_ABI, provider);
};

// Connect wallet
export const connectWallet = async () => {
  try {
    const provider = getProvider();
    const accounts = await provider.send('eth_requestAccounts', []);
    const network = await provider.getNetwork();
    
    // Check if on correct network
    if (network.chainId.toString() !== EXPECTED_CHAIN_ID) {
      throw new Error(`Please switch to Sepolia testnet (Chain ID: ${EXPECTED_CHAIN_ID})`);
    }
    
    return {
      address: accounts[0],
      chainId: network.chainId.toString(),
    };
  } catch (error) {
    console.error('Error connecting wallet:', error);
    throw error;
  }
};

// Switch to Sepolia network
export const switchToSepolia = async () => {
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0xaa36a7' }], // Sepolia chainId in hex
    });
  } catch (error) {
    // This error code indicates that the chain has not been added to MetaMask
    if (error.code === 4902) {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: '0xaa36a7',
            chainName: 'Sepolia Testnet',
            nativeCurrency: {
              name: 'Sepolia ETH',
              symbol: 'ETH',
              decimals: 18,
            },
            rpcUrls: ['https://sepolia.infura.io/v3/'],
            blockExplorerUrls: ['https://sepolia.etherscan.io'],
          },
        ],
      });
    } else {
      throw error;
    }
  }
};

// Format address for display
export const formatAddress = (address) => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

// Format ETH amount
export const formatEth = (wei) => {
  return ethers.formatEther(wei);
};

// Parse ETH amount to wei
export const parseEth = (eth) => {
  return ethers.parseEther(eth.toString());
};
