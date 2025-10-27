import { formatAddress } from '../utils/ethereum';

function VaultDashboard({ balance, owners, requiredApprovals, minDelay, transactionCount, isPaused, loading, error, currentAccount }) {
  if (loading) {
    return <div className="loading">Loading vault information...</div>;
  }

  if (error) {
    return <div className="error">Error loading vault: {error}</div>;
  }

  const isOwner = owners.some(owner => owner.toLowerCase() === currentAccount?.toLowerCase());

  return (
    <div className="dashboard">
      <div className="card-grid">
        <div className="card">
          <h3>💰 Vault Balance</h3>
          <p className="value-large">{balance} ETH</p>
        </div>

        <div className="card">
          <h3>📊 Configuration</h3>
          <div className="config-list">
            <div className="config-item">
              <span>Required Approvals:</span>
              <strong>{requiredApprovals} of {owners.length}</strong>
            </div>
            <div className="config-item">
              <span>Timelock Delay:</span>
              <strong>{minDelay} seconds</strong>
            </div>
            <div className="config-item">
              <span>Total Transactions:</span>
              <strong>{transactionCount}</strong>
            </div>
          </div>
        </div>

        <div className="card">
          <h3>🔐 Your Status</h3>
          <div className="status-info">
            {isOwner ? (
              <div className="status-badge owner">✓ You are an Owner</div>
            ) : (
              <div className="status-badge not-owner">Not an Owner</div>
            )}
            {isPaused && (
              <div className="status-badge paused">⏸ Vault is Paused</div>
            )}
          </div>
        </div>
      </div>

      <div className="card owners-card">
        <h3>👥 Vault Owners ({owners.length})</h3>
        <div className="owners-list">
          {owners.map((owner, index) => (
            <div key={owner} className="owner-item">
              <span className="owner-number">{index + 1}</span>
              <span className="owner-address">{owner}</span>
              {owner.toLowerCase() === currentAccount?.toLowerCase() && (
                <span className="you-badge">YOU</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default VaultDashboard;
