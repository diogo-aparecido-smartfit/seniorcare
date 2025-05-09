export const formatQuantity = (quantity: number): string => {
  if (quantity >= 1_000_000) {
    return `${(quantity / 1_000_000).toFixed(1)}M`;
  } else if (quantity >= 1_000) {
    return `${(quantity / 1_000).toFixed(1)}K`;
  }
  return quantity.toString();
};

export const capitalizeFirstLetter = (text: string): string => {
  const capitalizedLetter = text.charAt(0).toUpperCase();

  return capitalizedLetter + text.slice(1);
};
