type dateViewType = 'YMD' | 'DM';

const dateFromNumb = (dateNumb: number, dateView: dateViewType = 'YMD') => {
  const date = new Date(dateNumb);
  // const curDate = new Date();

  const day = String(date.getDate()).padStart(2, '0');
  const year = String(date.getFullYear()).padStart(4, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');

  switch (dateView) {
    case 'DM':
      return [day, month].join('.');
    default:
      return [year, month, day].join('-');
  }
};

export default dateFromNumb;
