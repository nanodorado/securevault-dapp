import { useState, useEffect } from 'react';
import { getReadOnlyContract, formatEth } from '../utils/ethereum';

export const useVaultInfo = () => {
  const [vaultInfo, setVaultInfo] = useState({
    balance: '0',
    owners: [],
    requiredApprovals: 0,
    minDelay: 0,
    transactionCount: 0,
    isPaused: false,
    loading: true,
    error: null,
  });

  const fetchVaultInfo = async () => {
    try {
      const contract = getReadOnlyContract();
      
      const [balance, owners, requiredApprovals, minDelay, transactionCount, isPaused] = 
        await Promise.all([
          contract.getBalance(),
          contract.getOwners(),
          contract.requiredApprovals(),
          contract.getMinDelay(),
          contract.transactionCount(),
          contract.paused(),
        ]);

      setVaultInfo({
        balance: formatEth(balance),
        owners,
        requiredApprovals: Number(requiredApprovals),
        minDelay: Number(minDelay),
        transactionCount: Number(transactionCount),
        isPaused,
        loading: false,
        error: null,
      });
    } catch (error) {
      console.error('Error fetching vault info:', error);
      setVaultInfo(prev => ({
        ...prev,
        loading: false,
        error: error.message,
      }));
    }
  };

  useEffect(() => {
    fetchVaultInfo();
    
    // Refresh every 10 seconds
    const interval = setInterval(fetchVaultInfo, 10000);
    
    return () => clearInterval(interval);
  }, []);

  return { ...vaultInfo, refetch: fetchVaultInfo };
};
