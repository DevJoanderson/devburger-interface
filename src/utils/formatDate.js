export function formatDate(date) {
  if (!date) return '';
  return new Date(date).toLocaleString('pt-BR', {
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}