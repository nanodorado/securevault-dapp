// Debug utilities for troubleshooting

export const checkMetaMask = () => {
  console.log('=== MetaMask Debug Info ===');
  console.log('window.ethereum exists:', !!window.ethereum);
  console.log('window.ethereum.isMetaMask:', window.ethereum?.isMetaMask);
  console.log('Environment variables:');
  console.log('  CONTRACT_ADDRESS:', import.meta.env.VITE_CONTRACT_ADDRESS);
  console.log('  CHAIN_ID:', import.meta.env.VITE_CHAIN_ID);
  console.log('  NETWORK_NAME:', import.meta.env.VITE_NETWORK_NAME);
  console.log('==========================');
};

export const testConnection = async () => {
  try {
    console.log('Testing MetaMask connection...');
    
    if (!window.ethereum) {
      console.error('❌ MetaMask not detected');
      return false;
    }
    
    console.log('✅ MetaMask detected');
    
    const accounts = await window.ethereum.request({ 
      method: 'eth_accounts' 
    });
    
    console.log('Current accounts:', accounts);
    
    if (accounts.length === 0) {
      console.log('⚠️ No accounts connected. Requesting...');
      const newAccounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      console.log('✅ Accounts after request:', newAccounts);
    }
    
    const chainId = await window.ethereum.request({ 
      method: 'eth_chainId' 
    });
    console.log('Current chainId:', chainId, '(decimal:', parseInt(chainId, 16), ')');
    
    return true;
  } catch (error) {
    console.error('❌ Test failed:', error);
    return false;
  }
};
