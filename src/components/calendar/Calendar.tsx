import _ from 'lodash';
import api from '../../api';
import Button from '../button/Button';
import Select from '../select/Select';
import s from './Calendar.module.scss';
import { dayNotesType } from '../../types/types';
import getDayName from '../../utils/getDayName';
import { FC, useEffect, useState } from 'react';

type CalendarType = {
  date: Date;
  nowDate: Date;
  className?: string;
  dayClick?: () => void;
  notes?: dayNotesType[];
  updateNotes?: (date: number) => void;
  setDate: (date: Date) => void;
};

type monthItemType = {
  id: number;
  name: string;
};

type dayItemType = {
  id: number;
  date?: Date;
};

const Calendar: FC<CalendarType> = ({
  date,
  notes,
  setDate,
  nowDate,
  dayClick,
  updateNotes,
  className = '',
}) => {
  const [localDate, setLocalDate] = useState<Date>(new Date(date));
  const [yearList, setYearList] = useState<number[]>([]);
  const [dayList, setDayList] = useState<dayItemType[]>([]);
  const [monthList, setMonthList] = useState<monthItemType[]>([]);
  const [activeColumn, setActiveColumn] = useState<number>(-1);

  const getDefValues = async () => {
    const data = await api.main.getMonthList();
    if (data?.length > 0) {
      setMonthList([...data]);
    }
    setYearList([..._.range(date.getFullYear() - 10, date.getFullYear() + 10)]);
  };

  useEffect(() => {
    getDefValues();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (updateNotes) {
      updateNotes(+localDate);
    }
    // eslint-disable-next-line
  }, [localDate]);

  useEffect(() => {
    const initDate = new Date(localDate);
    const date = new Date(localDate);

    date.setDate(1);
    const startDay = date.getDay();

    date.setDate(32);
    const endDay = 32 - date.getDate();

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
  }, [localDate]);

  const cellClass = (i: number, date: Date | undefined) => {
    let className = '';
    if (!date) {
      className += ' ' + s.empty;
    }
    return className;
  };

  const dayClass = (day: dayItemType) => {
    if (!day.date) return '';
    if (+day.date === +date) {
      // console.log(day.date);
      // console.log(date);
      return ' ' + s.active;
    } else {
      return '';
    }
  };

  const selectYear = (year: number) => {
    localDate.setFullYear(year);
    const newDate = new Date(localDate);
    setLocalDate(newDate);
  };

  const selectMonth = (month: monthItemType) => {
    localDate.setMonth(month.id);
    const newDate = new Date(localDate);
    setLocalDate(newDate);
  };

  const reset = () => {
    setActiveColumn(-1);
    setDate(new Date(nowDate));
    setLocalDate(new Date(nowDate));
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

  const getSelectedMonth = () => {
    return monthList.find((month) => month.id === localDate.getMonth());
  };

  const handleDayClick = (day: dayItemType) => {
    if (day.date) {
      setDate(day.date);
      dayClick && dayClick();
    }
  };

  const getDayNotes = (day: dayItemType): string[] | undefined => {
    const date = day.date ? +day.date : 0;
    if (date && notes?.length) {
      return notes.find((note) => +note.date === date)?.notes || undefined;
    } else {
      return undefined;
    }
  };

  return (
    <div className={s.calendarWrap + ' ' + className}>
      <div className={s.sort}>
        {+nowDate !== +localDate && (
          <Button
            text="Сброс"
            handleClick={reset}
            className={s.btnReset}
            title="Вернуться к текущему дню"
          />
        )}
        <Select
          listId="year"
          list={yearList}
          className={s.selectYear}
          handleSelect={selectYear}
          selectedItem={localDate.getFullYear()}
        />
        <Select
          listId="month"
          list={monthList}
          className={s.selectMonth}
          handleSelect={selectMonth}
          selectedItem={getSelectedMonth()}
        />
      </div>
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
            const dayNotes: string[] | undefined = getDayNotes(day);
            return (
              <li
                key={i}
                className={
                  s.cell +
                  cellClass(i, day.date) +
                  dayClass(day) +
                  activeColumnClass(i)
                }
                onClick={() => handleDayClick(day)}
              >
                {day.date ? day.date.getDate() : ''}
                {dayNotes && (
                  <div className={s.notesMark}>{dayNotes.length}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Calendar;
