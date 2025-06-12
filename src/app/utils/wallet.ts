export const truncateAddress = (address: string): string => {
  if (!address) return '';
  const start = address.slice(0, 4);
  const end = address.slice(-4);
  return `${start}...${end}`;
}; 