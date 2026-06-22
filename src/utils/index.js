export const formatDate = (dateString, options = {}) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    ...options,
  });
};

export const formatTime = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

export const formatDateTime = (dateString) => {
  if (!dateString) return 'N/A';
  return `${formatDate(dateString)} at ${formatTime(dateString)}`;
};

export const formatCurrency = (amount) => {
  if (amount == null) return '₹0';
  return `₹${amount.toLocaleString('en-IN')}`;
};

export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const truncate = (str, maxLength = 80) => {
  if (!str) return '';
  return str.length > maxLength ? `${str.slice(0, maxLength)}...` : str;
};

export const getInitials = (name) => {
  if (!name) return '?';
  return name
    .split(' ')
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join('');
};

export const timeAgo = (dateString) => {
  if (!dateString) return '';
  const now = new Date();
  const then = new Date(dateString);
  const diffMs = now - then;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return formatDate(dateString);
};

export const getPriorityColor = (priority) => {
  const map = {
    critical: '#DC2626',
    high: '#EF4444',
    medium: '#F59E0B',
    low: '#22C55E',
  };
  return map[priority] || '#9CA3AF';
};

export const getStatusColor = (status) => {
  const map = {
    open: '#EF4444',
    'in-progress': '#F59E0B',
    'under-review': '#3B82F6',
    resolved: '#22C55E',
    paid: '#22C55E',
    pending: '#F59E0B',
    overdue: '#EF4444',
    inside: '#22C55E',
    'checked-out': '#9CA3AF',
    active: '#22C55E',
    inactive: '#9CA3AF',
  };
  return map[status] || '#9CA3AF';
};
