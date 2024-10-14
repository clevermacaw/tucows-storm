export function capitalize(text: string) {
  return text[0].toUpperCase() + text.slice(1);
}

export function formatPrice(price: number) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return formatter.format(price);
}
