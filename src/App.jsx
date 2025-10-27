import { useState } from 'react';
import { useWallet } from './hooks/useWallet';
import { useVaultInfo } from './hooks/useVaultInfo';
import { formatAddress } from './utils/ethereum';
import WalletConnect from './components/WalletConnect';
import VaultDashboard from './components/VaultDashboard';
import ProposeTransaction from './components/ProposeTransaction';
import TransactionsList from './components/TransactionsList';
import './App.css';

function App() {
  const { account, isConnected, connect, isConnecting, error: walletError } = useWallet();
  const { balance, owners, requiredApprovals, minDelay, transactionCount, isPaused, loading, error: vaultError, refetch } = useVaultInfo();
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-content">
          <h1>🔐 SecureVault</h1>
          <p className="subtitle">Multi-Signature Ethereum Vault</p>
        </div>
        <WalletConnect 
          account={account}
          isConnected={isConnected}
          isConnecting={isConnecting}
          onConnect={connect}
          error={walletError}
        />
      </header>

      <main className="app-main">
        {!isConnected ? (
          <div className="connect-prompt">
            <h2>Welcome to SecureVault</h2>
            <p>Connect your wallet to interact with the vault</p>
            <button onClick={connect} disabled={isConnecting} className="btn-primary">
              {isConnecting ? 'Connecting...' : 'Connect Wallet'}
            </button>
          </div>
        ) : (
          <>
            <nav className="tabs">
              <button 
                className={activeTab === 'dashboard' ? 'active' : ''}
                onClick={() => setActiveTab('dashboard')}
              >
                Dashboard
              </button>
              <button 
                className={activeTab === 'propose' ? 'active' : ''}
                onClick={() => setActiveTab('propose')}
              >
                Propose Transaction
              </button>
              <button 
                className={activeTab === 'transactions' ? 'active' : ''}
                onClick={() => setActiveTab('transactions')}
              >
                Transactions ({transactionCount})
              </button>
            </nav>

            <div className="tab-content">
              {activeTab === 'dashboard' && (
                <VaultDashboard
                  balance={balance}
                  owners={owners}
                  requiredApprovals={requiredApprovals}
                  minDelay={minDelay}
                  transactionCount={transactionCount}
                  isPaused={isPaused}
                  loading={loading}
                  error={vaultError}
                  currentAccount={account}
                />
              )}

              {activeTab === 'propose' && (
                <ProposeTransaction
                  onSuccess={() => {
                    refetch();
                    setActiveTab('transactions');
                  }}
                />
              )}

              {activeTab === 'transactions' && (
                <TransactionsList
                  transactionCount={transactionCount}
                  currentAccount={account}
                  onUpdate={refetch}
                />
              )}
            </div>
          </>
        )}
      </main>

      <footer className="app-footer">
        <p>
          <a 
            href={`https://sepolia.etherscan.io/address/${import.meta.env.VITE_CONTRACT_ADDRESS}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Contract on Etherscan →
          </a>
        </p>
        <p className="contract-address">
          Contract: {formatAddress(import.meta.env.VITE_CONTRACT_ADDRESS)}
        </p>
      </footer>
    </div>
  );
}

export default App;
