export default function formatAmount(amount: number | string, currencySign: string): string {
  return `${currencySign}${amount.toLocaleString('en-US')}`;
}
