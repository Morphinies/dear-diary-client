import _ from 'lodash';
import {
  DataDayType,
  ListItemType,
  CalendarTaskType,
  CalendarDayDataType,
} from '../types/types';

const getDaysListInMonth = (
  date: Date,
  deadlines: ListItemType[],
  dayDataList: CalendarDayDataType[],
  tasks: CalendarTaskType[]
): DataDayType[] => {
  const initDate = new Date(date);
  const upDate = new Date(date);

  upDate.setDate(1);
  const startDay = upDate.getDay();

  upDate.setDate(32);
  const endDay = 32 - upDate.getDate();

  const dayList: DataDayType[] = [];

  let k = 0;
  for (let i of _.range(42)) {
    if (startDay === 0 && i < 6) {
      dayList.push({ id: i });
    } else if (i + 1 < startDay || k >= endDay) {
      dayList.push({ id: i });
    } else {
      k += 1;
      dayList.push({
        id: i,
        date: new Date(initDate.setDate(k)),
      });
    }
  }

  // deadlines
  for (let deadlineItem of deadlines) {
    if (deadlineItem.deadline) {
      const deadlineDayDate = new Date(deadlineItem.deadline);
      deadlineDayDate.setUTCHours(0, 0, 0, 0);
      const dayWithDeadlineIndex = dayList.findIndex((day) => {
        return (day.date ? +day.date : 0) === +deadlineDayDate;
      });
      if (dayWithDeadlineIndex >= 0) {
        const editedDay = {
          ...dayList[dayWithDeadlineIndex],
        };
        editedDay.deadlines = [
          ...(dayList[dayWithDeadlineIndex]?.deadlines || []),
          deadlineItem,
        ];
        dayList.splice(dayWithDeadlineIndex, 1, editedDay);
      }
    }
  }
  // deadlines end

  // dayDataList

  for (let dayData of dayDataList) {
    const dayWithDataIndex = dayList.findIndex(
      (dayItem) => +(dayItem.date || '') === dayData.date
    );
    if (dayWithDataIndex >= 0) {
      const editedDay = { ...dayList[dayWithDataIndex], dayData };
      dayList.splice(dayWithDataIndex, 1, editedDay);
    }
  }
  // dayDataList end

  // tasks

  const dayTasks: any = {};
  for (let task of tasks) {
    for (let day of task.dayIds) {
      if (dayTasks['day_' + day]) {
        dayTasks['day_' + day] = [...dayTasks['day_' + day], task];
      } else {
        dayTasks['day_' + day] = [task];
      }
    }
  }

  for (let day of dayList) {
    if (day.date) {
      const dayId = day.date.getDay() || 7;
      const dayTaskList = dayTasks['day_' + dayId];
      if (dayTaskList) {
        const editedDay = { ...dayList[day.id], tasks: [...dayTaskList] };
        dayList.splice(day.id, 1, editedDay);
      }
    }
  }

  // tasks end

  return dayList;
};

export default getDaysListInMonth;
