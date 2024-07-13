type daysInMonthType = {
  month: number;
  year: number;
};

const getDaysInMonth = ({ month, year }: daysInMonthType): number => {
  const date = new Date(year, month - 1, 1);
  return 33 - +new Date(+date + 32 * 24 * 3600 * 1000).getDate();
};

export default getDaysInMonth;
