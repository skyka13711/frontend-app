export function formatCurrency(value: number | string): string {
  const num = typeof value === 'string' ? Number(value) : value
  if (isNaN(num)) return ''
  return num.toLocaleString('ru-RU') + ' ₽'
}
