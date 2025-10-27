// SecureVault Contract ABI - Essential functions only
export const SECURE_VAULT_ABI = [
  // Read functions
  "function getOwners() external view returns (address[])",
  "function requiredApprovals() external view returns (uint256)",
  "function getBalance() external view returns (uint256)",
  "function getMinDelay() external view returns (uint256)",
  "function getTimelockAddress() external view returns (address)",
  "function getTransaction(uint256 _transactionId) external view returns (tuple(address recipient, uint256 amount, uint256 approvalCount, bool executed, bool queued, uint256 queuedAt, bytes32 timelockId))",
  "function transactionCount() external view returns (uint256)",
  "function hasApproved(uint256 _transactionId, address _owner) external view returns (bool)",
  "function isReadyForExecution(uint256 _transactionId) external view returns (bool)",
  "function paused() external view returns (bool)",
  
  // Write functions
  "function proposeTransaction(address payable _recipient, uint256 _amount) external returns (uint256)",
  "function approveTransaction(uint256 _transactionId) external",
  "function revokeApproval(uint256 _transactionId) external",
  "function queueTransaction(uint256 _transactionId) external",
  "function executeTransaction(uint256 _transactionId) external",
  "function pause() external",
  "function unpause() external",
  
  // Events
  "event ProposalCreated(uint256 indexed transactionId, address indexed proposer, address indexed recipient, uint256 amount)",
  "event ApprovalReceived(uint256 indexed transactionId, address indexed approver)",
  "event ApprovalRevoked(uint256 indexed transactionId, address indexed revoker)",
  "event TransactionQueued(uint256 indexed transactionId, bytes32 indexed timelockId, uint256 executeAfter)",
  "event TransactionExecuted(uint256 indexed transactionId, address indexed recipient, uint256 amount)",
  "event VaultPaused(address indexed by)",
  "event VaultUnpaused(address indexed by)",
  "event Deposit(address indexed sender, uint256 amount)"
];
