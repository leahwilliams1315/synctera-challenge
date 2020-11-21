
export const dateFormatter = (dateString) =>
  new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'long', day: 'numeric'})
    .format(new Date(dateString));

export const amountFormatter = (amount) => amount ? `$${amount.toFixed(2)}` : '';

