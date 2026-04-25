export const getTodayString = () => {
  return new Date().toISOString().split('T')[0];
};

export const isToday = (dateStr) => {
  return dateStr.split('T')[0] === getTodayString();
};

export const formatDate = (date = new Date()) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const formatShortDate = (date = new Date()) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
};

export const getDayLabel = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('en-US', { weekday: 'short' });
};

export const getLastNDays = (n) => {
  return Array.from({ length: n }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (n - 1 - i));
    return date.toISOString().split('T')[0];
  });
};

export const getLast7Days = () => getLastNDays(7);
export const getLast30Days = () => getLastNDays(30);
export const getLast90Days = () => getLastNDays(90);
