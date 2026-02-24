/**
 * Filipino-friendly date and time formatting.
 */

export function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleDateString('fil-PH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatTime(isoString) {
  const date = new Date(isoString);
  return date.toLocaleTimeString('fil-PH', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatDateTime(isoString) {
  return `${formatDate(isoString)}, ${formatTime(isoString)}`;
}

export function formatRelative(isoString) {
  const diff = Date.now() - new Date(isoString).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return 'Kararating lang';
  if (minutes < 60) return `${minutes} minuto na ang nakalipas`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} oras na ang nakalipas`;
  return formatDate(isoString);
}
