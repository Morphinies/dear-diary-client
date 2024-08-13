import {
  DataDayType,
  ListItemType,
  CalendarTaskType,
  CalendarDayDataType,
} from '../../types/types';
import _ from 'lodash';
import s from './CalendarUI.module.scss';
import getDayName from '../../utils/getDayName';
import { FC, useEffect, useState } from 'react';
import noteIcon from '../../assets/icons/noteIcon';
import tasksIcon from '../../assets/icons/tasksIcon';
import deadlineIcon from '../../assets/icons/deadlineIcon';
import getDaysListInMonth from '../../utils/getDaysListInMonth';

type CalendarUIType = {
  date: Date;
  activeDate: Date;
  className?: string;
  tasks: CalendarTaskType[];
  deadlines: ListItemType[];
  dayDataList: CalendarDayDataType[];
  // dayDataList: CalendarNoteType [];
  dayClick: (day: DataDayType) => void;
};

const CalendarUI: FC<CalendarUIType> = ({
  date,
  tasks,
  dayClick,
  deadlines,
  activeDate,
  dayDataList,
  className = '',
}) => {
  const [dayList, setDayList] = useState<DataDayType[]>([]);
  const [activeColumn, setActiveColumn] = useState<number>(-1);

  // set day list
  useEffect(() => {
    const dayList = getDaysListInMonth(date, deadlines, dayDataList, tasks);
    setDayList([...dayList]);
  }, [date, deadlines, dayDataList, tasks]);

  const cellClass = (i: number, date: Date | undefined) => {
    let className = '';
    if (!date) {
      className += ' ' + s.empty;
    }
    return className;
  };

  const dayClass = (day: DataDayType) => {
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

  const dayTasksCompletedPercent = (day: DataDayType) => {
    if (day.dayData?.completedDayTaskIds.length && day.tasks?.length) {
      return `calc(${
        (day.dayData.completedDayTaskIds.length / day.tasks.length) * 100 + '%'
      } + 4px)`;
    } else {
      return '';
    }
  };

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
                <div
                  style={{ width: dayTasksCompletedPercent(day) }}
                  className={s.filler}
                ></div>
                <div className={s.markers}>
                  {day.deadlines && (
                    <div className={s.markerIcon + ' ' + s.deadline}>
                      {deadlineIcon}
                      <p className={s.count}>{day.deadlines.length}</p>
                    </div>
                  )}
                  {day.dayData?.note && (
                    <div className={s.markerIcon + ' ' + s.note}>
                      {noteIcon}
                    </div>
                  )}
                  {!!day.tasks?.length && (
                    <ul>
                      <div className={s.markerIcon + ' ' + s.task}>
                        {tasksIcon}
                        <p className={s.count}>{day.tasks.length}</p>
                      </div>
                    </ul>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default CalendarUI;
