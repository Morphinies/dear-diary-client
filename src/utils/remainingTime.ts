const caseSetting = (value: number): number => {
  const val = Math.abs(value);
  // падежи
  // 1 - именительный (день)
  // 2 - именительный мн. ч. (дни)
  // 3 - родительный (дня)
  // 4 - родительный  мн. ч. (дней)

  // 5 - именительный

  if (val === 1 || (val > 20 && String(val).endsWith('1'))) {
    return 1;
  } else if (
    (val > 1 && val < 5) ||
    (val > 20 && ['2', '3', '4'].includes(String(val).slice(-1)))
  ) {
    return 3;
  } else if (val === 0 || val >= 5) {
    return 4;
  } else {
    return 1;
  }
};

const getDayName = (val: number): string => {
  const caseKey = caseSetting(val);
  switch (caseKey) {
    case 1:
      return 'день';
    case 3:
      return 'дня';
    case 4:
      return 'дней';
    default:
      return 'день';
  }
};

const getHoursName = (val: number): string => {
  const caseKey = caseSetting(val);
  switch (caseKey) {
    case 1:
      return 'час';
    case 3:
      return 'часа';
    case 4:
      return 'часов';
    default:
      return 'час';
  }
};

const getMinName = (val: number): string => {
  const caseKey = caseSetting(val);
  switch (caseKey) {
    case 1:
      return 'минута';
    case 3:
      return 'минуты';
    case 4:
      return 'минут';
    default:
      return 'минута';
  }
};

export function remainingTime(deadline: number): string {
  let resStr = '';
  const curDate = +new Date();

  // console.log('deadline: ', new Date(deadline));
  // console.log('curDate: ', new Date(curDate));

  let deltaMinutes = Math.floor((deadline - curDate) / 1000 / 60);
  const isNegative = deltaMinutes < 0;
  deltaMinutes = Math.abs(deltaMinutes);

  let deltaHours = Math.floor(deltaMinutes / 60);
  const days = Math.floor(deltaHours / 24);

  const hours = deltaHours - days * 24;
  const minutes = deltaMinutes - days * 24 * 60 - hours * 60;

  // days
  if (deltaHours > 24 && days !== 0) {
    resStr += days + ' ' + getDayName(days) + ' ';
  }

  // hours
  if (deltaHours > 0 && deltaHours < 48 && hours !== 0) {
    resStr += hours + ' ' + getHoursName(hours) + ' ';
  }

  // minutes
  if (deltaHours < 12) {
    resStr += minutes + ' ' + getMinName(minutes);
  }
  return (isNegative ? '- ' : '') + resStr;
}
