export const numbFromPrice = (val: string) => {
  return +String(val).replace(/,/g, '');
};
