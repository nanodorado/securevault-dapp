import { useState, useEffect } from 'react';
import { connectWallet, getProvider } from '../utils/ethereum';

export const useWallet = () => {
  const [account, setAccount] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(null);

  const connect = async () => {
    // Prevent multiple simultaneous connection attempts
    if (isConnecting) {
      console.log('Connection already in progress, skipping...');
      return;
    }

    setIsConnecting(true);
    setError(null);
    try {
      const { address, chainId: chain } = await connectWallet();
      setAccount(address);
      setChainId(chain);
      setError(null); // Clear any previous errors
    } catch (err) {
      // Handle specific MetaMask errors
      let errorMessage = err.message;
      
      if (err.code === -32002) {
        errorMessage = 'Please check MetaMask - there is a pending connection request waiting for your approval.';
      } else if (err.code === 4001) {
        errorMessage = 'Connection rejected. Please approve the connection in MetaMask.';
      } else if (err.message?.includes('already pending')) {
        errorMessage = 'Please check your MetaMask extension - a request is waiting for approval.';
      }
      
      setError(errorMessage);
      console.error('Wallet connection error:', err);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = () => {
    setAccount(null);
    setChainId(null);
  };

  useEffect(() => {
    // Check if already connected
    const checkConnection = async () => {
      if (window.ethereum) {
        try {
          const provider = getProvider();
          const accounts = await provider.send('eth_accounts', []);
          if (accounts.length > 0) {
            const network = await provider.getNetwork();
            setAccount(accounts[0]);
            setChainId(network.chainId.toString());
          }
        } catch (err) {
          console.error('Error checking connection:', err);
        }
      }
    };

    checkConnection();

    // Listen for account changes
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        } else {
          disconnect();
        }
      });

      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners('accountsChanged');
        window.ethereum.removeAllListeners('chainChanged');
      }
    };
  }, []);

  return {
    account,
    chainId,
    isConnecting,
    error,
    connect,
    disconnect,
    isConnected: !!account,
  };
};
