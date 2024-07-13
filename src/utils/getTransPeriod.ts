import { getTransPeriodType, transPeriodType } from '../types/types';
import getDaysInMonth from './getDaysInMonth';

export function getTransPeriod({
  typeId,
}: getTransPeriodType): transPeriodType {
  const defTransPeriodList = [
    { id: 3, name: 'Год' },
    { id: 2, name: 'Месяц' },
    { id: 1, name: 'Неделя' },
  ];

  const curDate = new Date();
  const activeTransPeriod =
    defTransPeriodList.find((transPeriod) => transPeriod.id === typeId) ||
    defTransPeriodList[0];

  let curDay = curDate.getDay();
  if (curDay === 0) curDay = 7;
  const curDateNumb = curDate.getDate();

  let startDate = new Date(curDate);
  let finishDate = new Date(curDate);

  switch (typeId) {
    // week
    case 1:
      startDate.setDate(curDateNumb - curDay + 1);
      startDate.setHours(0, 0, 0, 0);
      finishDate = new Date(+startDate + 6 * 24 * 3600 * 1000);
      finishDate.setHours(23, 59, 59, 999);
      break;
    // month
    case 2:
      startDate.setDate(1);
      startDate.setHours(0, 0, 0, 0);
      const daysInMonth = getDaysInMonth({
        month: startDate.getFullYear(),
        year: startDate.getMonth(),
      });
      finishDate = new Date(+startDate + (daysInMonth - 1) * 24 * 3600 * 1000);
      finishDate.setHours(23, 59, 59, 999);
      break;
    // year
    case 3:
      startDate.setDate(1);
      startDate.setMonth(0);
      startDate.setHours(0, 0, 0, 0);

      finishDate.setMonth(11);
      const daysInMonth2 = getDaysInMonth({
        year: finishDate.getFullYear(),
        month: finishDate.getMonth() + 1,
      });
      finishDate.setDate(daysInMonth2);
      finishDate.setHours(23, 59, 59, 999);
      break;
    default:
      break;
  }
  return {
    ...activeTransPeriod,
    startDate: +startDate,
    finishDate: +finishDate,
  };
}
