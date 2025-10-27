import { useState } from 'react';
import { getContract, parseEth } from '../utils/ethereum';

function ProposeTransaction({ onSuccess }) {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsSubmitting(true);

    try {
      const contract = await getContract();
      const amountWei = parseEth(amount);
      
      const tx = await contract.proposeTransaction(recipient, amountWei);
      setSuccess('Transaction proposed! Waiting for confirmation...');
      
      await tx.wait();
      setSuccess('✓ Transaction proposed successfully!');
      
      // Reset form
      setRecipient('');
      setAmount('');
      
      // Call success callback
      setTimeout(() => {
        onSuccess && onSuccess();
      }, 2000);
    } catch (err) {
      console.error('Error proposing transaction:', err);
      setError(err.reason || err.message || 'Failed to propose transaction');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="propose-transaction">
      <div className="card">
        <h2>💸 Propose Withdrawal</h2>
        <p className="description">
          Create a new withdrawal proposal. It will require approvals from owners before execution.
        </p>

        <form onSubmit={handleSubmit} className="proposal-form">
          <div className="form-group">
            <label htmlFor="recipient">Recipient Address</label>
            <input
              type="text"
              id="recipient"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="0x..."
              required
              pattern="^0x[a-fA-F0-9]{40}$"
              title="Please enter a valid Ethereum address"
            />
          </div>

          <div className="form-group">
            <label htmlFor="amount">Amount (ETH)</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.0"
              step="0.001"
              min="0.000000000000000001"
              required
            />
          </div>

          {error && <div className="alert alert-error">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <button
            type="submit"
            disabled={isSubmitting || !recipient || !amount}
            className="btn-primary"
          >
            {isSubmitting ? 'Proposing...' : 'Propose Transaction'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProposeTransaction;
