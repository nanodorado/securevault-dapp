import { useState, useEffect } from 'react';
import { getContract, getReadOnlyContract, formatEth, formatAddress } from '../utils/ethereum';

function TransactionsList({ transactionCount, currentAccount, onUpdate }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processingTx, setProcessingTx] = useState(null);

  const fetchTransactions = async () => {
    try {
      const contract = getReadOnlyContract();
      const txs = [];

      for (let i = transactionCount - 1; i >= 0 && txs.length < 10; i--) {
        const tx = await contract.getTransaction(i);
        const hasApproved = await contract.hasApproved(i, currentAccount);
        const isReady = await contract.isReadyForExecution(i);
        
        txs.push({
          id: i,
          recipient: tx[0],
          amount: formatEth(tx[1]),
          approvalCount: Number(tx[2]),
          executed: tx[3],
          queued: tx[4],
          queuedAt: Number(tx[5]),
          timelockId: tx[6],
          hasApproved,
          isReady,
        });
      }

      setTransactions(txs);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching transactions:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (transactionCount > 0) {
      fetchTransactions();
    } else {
      setLoading(false);
    }
  }, [transactionCount, currentAccount]);

  const handleApprove = async (txId) => {
    setProcessingTx(txId);
    try {
      const contract = await getContract();
      const tx = await contract.approveTransaction(txId);
      await tx.wait();
      await fetchTransactions();
      onUpdate && onUpdate();
    } catch (err) {
      console.error('Error approving:', err);
      alert(err.reason || err.message || 'Failed to approve transaction');
    } finally {
      setProcessingTx(null);
    }
  };

  const handleQueue = async (txId) => {
    setProcessingTx(txId);
    try {
      const contract = await getContract();
      const tx = await contract.queueTransaction(txId);
      await tx.wait();
      await fetchTransactions();
      onUpdate && onUpdate();
    } catch (err) {
      console.error('Error queueing:', err);
      alert(err.reason || err.message || 'Failed to queue transaction');
    } finally {
      setProcessingTx(null);
    }
  };

  const handleExecute = async (txId) => {
    setProcessingTx(txId);
    try {
      const contract = await getContract();
      const tx = await contract.executeTransaction(txId);
      await tx.wait();
      await fetchTransactions();
      onUpdate && onUpdate();
    } catch (err) {
      console.error('Error executing:', err);
      alert(err.reason || err.message || 'Failed to execute transaction');
    } finally {
      setProcessingTx(null);
    }
  };

  if (loading) {
    return <div className="loading">Loading transactions...</div>;
  }

  if (error) {
    return <div className="error">Error loading transactions: {error}</div>;
  }

  if (transactions.length === 0) {
    return (
      <div className="empty-state">
        <h3>No Transactions Yet</h3>
        <p>Propose your first transaction to get started</p>
      </div>
    );
  }

  return (
    <div className="transactions-list">
      <h2>📋 Recent Transactions</h2>
      
      {transactions.map((tx) => (
        <div key={tx.id} className={`transaction-card ${tx.executed ? 'executed' : ''}`}>
          <div className="tx-header">
            <span className="tx-id">Transaction #{tx.id}</span>
            {tx.executed && <span className="badge success">✓ Executed</span>}
            {!tx.executed && tx.queued && <span className="badge warning">⏱ Queued</span>}
            {!tx.executed && !tx.queued && <span className="badge pending">⏳ Pending</span>}
          </div>

          <div className="tx-details">
            <div className="detail-row">
              <span className="label">Recipient:</span>
              <span className="value">{formatAddress(tx.recipient)}</span>
            </div>
            <div className="detail-row">
              <span className="label">Amount:</span>
              <span className="value">{tx.amount} ETH</span>
            </div>
            <div className="detail-row">
              <span className="label">Approvals:</span>
              <span className="value">{tx.approvalCount}</span>
            </div>
          </div>

          {!tx.executed && (
            <div className="tx-actions">
              {!tx.hasApproved && !tx.queued && (
                <button
                  onClick={() => handleApprove(tx.id)}
                  disabled={processingTx === tx.id}
                  className="btn-secondary"
                >
                  {processingTx === tx.id ? 'Approving...' : 'Approve'}
                </button>
              )}

              {tx.hasApproved && <span className="status-text">✓ You approved this</span>}

              {!tx.queued && tx.approvalCount >= 1 && ( // Adjust based on required approvals
                <button
                  onClick={() => handleQueue(tx.id)}
                  disabled={processingTx === tx.id}
                  className="btn-secondary"
                >
                  {processingTx === tx.id ? 'Queueing...' : 'Queue'}
                </button>
              )}

              {tx.queued && tx.isReady && (
                <button
                  onClick={() => handleExecute(tx.id)}
                  disabled={processingTx === tx.id}
                  className="btn-primary"
                >
                  {processingTx === tx.id ? 'Executing...' : 'Execute'}
                </button>
              )}

              {tx.queued && !tx.isReady && (
                <span className="status-text">⏱ Waiting for timelock...</span>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default TransactionsList;
