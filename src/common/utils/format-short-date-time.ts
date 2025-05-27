export default function formatShortDateTime (date: Date) {
  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'short' });
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${day} ${month} • ${hours}:${minutes}`;
};
