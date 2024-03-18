export const formatAmount = (amount: number | string, currencySign: string): string => {
    return `${currencySign}${amount.toLocaleString('en-US')}`;
};
