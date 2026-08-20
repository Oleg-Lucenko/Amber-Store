const usdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});


export function centsToDollars(cents: number): number {
    return cents / 100;
}

export function formatDollars(dollars: number): string {
  return usdFormatter.format(dollars);
}
