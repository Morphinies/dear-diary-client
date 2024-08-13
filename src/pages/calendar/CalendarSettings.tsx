import { useEffect, useState } from 'react';
import Button from '../../components/button/Button';
import Select from '../../components/select/Select';
import s from './Calendar.module.scss';
import api from '../../api';
import _ from 'lodash';

type CalendarSettingsType = {
  date: Date;
  nowDate: Date;
  editTasks: () => void;
  editDeadlines: () => void;
  setDate: (val: Date) => void;
};

type MonthItemType = {
  id: number;
  name: string;
};

const CalendarSettings = ({
  date,
  nowDate,
  setDate,
  editTasks,
  editDeadlines,
}: CalendarSettingsType) => {
  const [yearList, setYearList] = useState<number[]>([]);
  const [monthList, setMonthList] = useState<MonthItemType[]>([]);

  const reset = () => {
    // setActiveColumn(-1);
    setDate(new Date(nowDate));
  };

  const selectYear = (year: number) => {
    const upDate = new Date(+date);
    upDate.setFullYear(year);
    setDate(upDate);
  };

  const selectMonth = (month: MonthItemType) => {
    const upDate = new Date(+date);
    upDate.setMonth(month.id);
    setDate(upDate);
  };

  const getDefValues = () => {
    const data = api.main.getMonthList();
    if (data?.length > 0) {
      setMonthList([...data]);
    }
    setYearList([..._.range(date.getFullYear() - 10, date.getFullYear() + 10)]);
  };

  const getSelectedMonth = () => {
    return monthList.find((month) => month.id === date.getMonth());
  };

  useEffect(() => {
    getDefValues();
    // eslint-disable-next-line
  }, []);

  return (
    <div className={s.settings}>
      <div className={s.left}>
        <Button
          text="Дедлайны"
          // className={s.btnReset}
          title="Настроить списки"
          handleClick={editDeadlines}
        />
        <Button
          text="Задачи"
          // className={s.btnReset}
          title="Настроить задачи"
          handleClick={editTasks}
        />
      </div>
      <div className={s.right}>
        {+nowDate !== +date && (
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
          selectedItem={date.getFullYear()}
        />
        <Select
          listId="month"
          list={monthList}
          className={s.selectMonth}
          handleSelect={selectMonth}
          selectedItem={getSelectedMonth()}
        />
      </div>
    </div>
  );
};

export default CalendarSettings;
