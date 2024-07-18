import _ from 'lodash';
import s from './CalendarUI.module.scss';
import getDayName from '../../utils/getDayName';
import { FC, useEffect, useState } from 'react';

type dayCellType = {
  id: number;
  date?: Date;
};

type CalendarUIType = {
  date: Date;
  activeDate: Date;
  className?: string;
  dayClick: (day: dayCellType) => void;
};

const CalendarUI: FC<CalendarUIType> = ({
  date,
  dayClick,
  activeDate,
  className = '',
}) => {
  const [dayList, setDayList] = useState<dayCellType[]>([]);
  const [activeColumn, setActiveColumn] = useState<number>(-1);

  useEffect(() => {
    console.log(date);
    const initDate = new Date(date);
    const upDate = new Date(date);

    upDate.setDate(1);
    const startDay = date.getDay();

    upDate.setDate(32);
    const endDay = 32 - upDate.getDate();

    const dayArr = [];

    let k = 0;
    for (let i of _.range(42)) {
      if (startDay === 0 && i < 6) {
        dayArr.push({ id: i });
      } else if (i + 1 < startDay || k >= endDay) {
        dayArr.push({ id: i });
      } else {
        k += 1;
        dayArr.push({
          id: i,
          date: new Date(initDate.setDate(k)),
        });
      }
    }
    setDayList(dayArr);
  }, [date]);

  const cellClass = (i: number, date: Date | undefined) => {
    let className = '';
    if (!date) {
      className += ' ' + s.empty;
    }
    return className;
  };

  const dayClass = (day: dayCellType) => {
    if (!day.date) return '';
    if (+day.date === +activeDate) {
      return ' ' + s.active;
    } else {
      return '';
    }
  };

  const toggleActiveColumn = (i: number) => {
    setActiveColumn((prev) => (prev === i ? -1 : i));
  };

  const activeColumnClass = (i: number) => {
    if (activeColumn < 0) return '';
    let k = activeColumn;
    let className = '';
    while (k < 42 && !className) {
      if (k === i) {
        className = ' ' + s.activeColumn;
      } else {
        k += 7;
      }
    }
    return className;
  };

  // console.log(dayList);
  // selectedItem

  return (
    <div className={s.calendarWrap + ' ' + className}>
      <div className={s.calendar}>
        <ul className={s.tableHead}>
          {[..._.range(1, 7), 0].map((dayId, i) => (
            <li
              key={i}
              onClick={() => toggleActiveColumn(i)}
              className={s.cellHeader + activeColumnClass(i)}
            >
              {getDayName(dayId)}
            </li>
          ))}
        </ul>
        <ul className={s.table}>
          {dayList.map((day, i) => {
            return (
              <li
                key={i}
                className={
                  s.cell +
                  cellClass(i, day.date) +
                  dayClass(day) +
                  activeColumnClass(i)
                }
                onClick={() => {
                  day.date && dayClick(day);
                }}
              >
                {day.date ? day.date.getDate() : ''}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default CalendarUI;
