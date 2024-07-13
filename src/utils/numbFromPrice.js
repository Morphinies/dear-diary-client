export const numbFromPrice = (val) => {
  return +String(val).replace(/,/g, '');
};
