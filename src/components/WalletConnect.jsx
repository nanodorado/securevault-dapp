import { formatAddress } from '../utils/ethereum';

function WalletConnect({ account, isConnected, isConnecting, onConnect, error }) {
  return (
    <div className="wallet-connect">
      {!isConnected ? (
        <button onClick={onConnect} disabled={isConnecting} className="btn-connect">
          {isConnecting ? 'Connecting...' : 'Connect Wallet'}
        </button>
      ) : (
        <div className="wallet-info">
          <span className="status-dot"></span>
          <span className="address">{formatAddress(account)}</span>
        </div>
      )}
      {error && <p className="error-text">{error}</p>}
    </div>
  );
}

export default WalletConnect;
