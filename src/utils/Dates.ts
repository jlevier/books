export const formatDate = (date: Date) => {
  return `${date.getMonth().toString().padStart(2, '0')}/${date.getDay().toString().padStart(2, '0')}/${date.getFullYear().toString().padStart(4, '0')}`;
}