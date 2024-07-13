const datetimeFromNumb = (dateNumb: number) => {
  const date = new Date(dateNumb);

  const day = String(date.getDate()).padStart(2, '0');
  const year = String(date.getFullYear()).padStart(4, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');

  const hour = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');

  return [year, month, day].join('-') + 'T' + [hour, min].join(':');
};

export default datetimeFromNumb;
