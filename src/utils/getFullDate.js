export const getFullDate = (date, withTime) => {
  if (!date?.getDate()) return '';
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hour = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');
  const sec = String(date.getSeconds()).padStart(2, '0');
  if (withTime) {
    return `${year}.${month}.${day} ${hour}:${min}:${sec}`;
  } else {
    return `${year}.${month}.${day}`;
  }
};
