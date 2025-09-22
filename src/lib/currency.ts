export const CURRENCY = {
  INR: 'INR',
  USD: 'USD',
} as const;

export type Currency = typeof CURRENCY[keyof typeof CURRENCY];

export const formatCurrency = (amount: number, currency: Currency = CURRENCY.INR): string => {
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  
  return formatter.format(amount);
};

export const formatCurrencyWithDecimals = (amount: number, currency: Currency = CURRENCY.INR): string => {
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  
  return formatter.format(amount);
};

export const parseCurrency = (value: string): number => {
  return parseFloat(value.replace(/[^\d.-]/g, ''));
};
