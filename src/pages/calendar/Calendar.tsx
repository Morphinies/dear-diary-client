import {
  ErrorType,
  DataDayType,
  MenuItemType,
  DataEditDayType,
  CalendarTaskType,
  EditCalendarDataType,
  CalendarEditTaskType,
} from '../../types/types';
import api from '../../api';
import s from './Calendar.module.scss';
import EditDayPopup from './EditDayPopup';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import jsonEqual from '../../utils/jsonEqual';
import CalendarSettings from './CalendarSettings';
import Header from '../../components/header/Header';
import Loader from '../../components/loader/Loader';
import EditDeadlinesPopup from './EditDeadlinesPopup';
import EditDayTasksPopup from './EditDayTasksPopup';
import CalendarUI from '../../components/calendar/CalendarUI';

const Calendar = () => {
  const { menuId } = useParams();
  const [loading, setLoading] = useState(true);
  const [menu, setMenu] = useState<MenuItemType>();
  const [editTasks, setEditTasks] = useState(false);
  const [date, setDate] = useState<Date>(new Date());
  // const [settingsList, setSettingsList] = useState({});
  const [editDay, setEditDay] = useState<DataDayType>();
  const [editDeadlines, setEditDeadlines] = useState(false);
  const [nowDate, setNowDate] = useState<Date>(new Date());
  const [calendarData, setCalendarData] = useState<EditCalendarDataType>({
    tasks: [],
    deadlines: [],
    dayDataList: [],
    deadlineIds: [],
  });
  const [menuList, setMenuList] = useState<MenuItemType[]>([]);
  const [activeSettings, setActiveSettingsList] = useState({
    date: new Date(),
  });
  const [updateMessage, setUpdateMessage] = useState('');
  const [updateLoading, setUpdateLoading] = useState(false);
  // const [dayTaskList, setDayTaskList] = useState([
  //   { id: 1, task: 'ПН', isComleted: false },
  // ]);

  // set now date
  useEffect(() => {
    const defCurDate = new Date();
    defCurDate.setUTCHours(0, 0, 0, 0);
    if (!nowDate || +defCurDate !== +nowDate) {
      setDate(defCurDate);
      setNowDate(defCurDate);
      setActiveSettingsList((prev) => ({ ...prev, date: defCurDate }));
    }
    // eslint-disable-next-line
  }, []);

  const getMenuList = async () => {
    const menuList = await api.menu.getList(1);
    if (menuList) {
      setMenuList([...menuList]);
    } else {
      console.log('menu list error');
    }
  };

  const getCalendarData = async () => {
    if (!menuId) return;
    setLoading(true);
    const menu = await api.menu.getItem(menuId);
    const data = await api.calendar.getData(menuId);
    if (menu) {
      setMenu(menu);
    }
    if (data) {
      setCalendarData(data);
    }
    setLoading(false);
  };

  const updateTask = async (
    taskData: CalendarEditTaskType
  ): Promise<'error' | 'success'> => {
    if (!calendarData.menuId) {
      console.log('menu id not found');
      return 'error';
    }
    const resp = await api.calendar.updateDayTask({
      ...taskData,
    });
    if ((resp as ErrorType).error) {
      return 'error';
      // setUpdateMessage(resp.error);
    } else {
      setCalendarData((prev) => ({
        ...prev,
        tasks: [...prev.tasks, resp as CalendarTaskType],
      }));
      return 'success';
      // setUpdateMessage('Сохранено');
    }
  };

  const delTask = async (taskId: string): Promise<'error' | 'success'> => {
    if (!taskId) {
      console.log('task id not found');
      return 'error';
    }
    const resp = await api.calendar.deleteDayTask(taskId);
    if ((resp as ErrorType).error) {
      return 'error';
    } else {
      setCalendarData((prev) => ({
        ...prev,
        tasks: [...prev.tasks.filter((task) => task.id !== taskId)],
      }));
      return 'success';
    }
  };

  const updateCalendarData = async (data: any) => {
    if (!menuId) return;
    setUpdateLoading(true);
    const resp = await api.calendar.update({
      deadlineIds: data.deadlineIds,
      menuId,
      id: calendarData.id,
    });
    if (resp.error) {
      setUpdateMessage(resp.error);
    } else {
      setCalendarData(resp);
      setUpdateMessage('Сохранено');
    }
    setUpdateLoading(false);
    setTimeout(() => {
      setUpdateMessage('');
    }, 2000);
  };

  const updateDayTasks = async (tasks: CalendarTaskType[]) => {
    if (jsonEqual(calendarData.tasks, tasks)) {
      setUpdateMessage('Изменений не найдено');
      setTimeout(() => {
        setUpdateMessage('');
      }, 2000);
      return;
    }
    let i = tasks.length - 1;
    while (i >= 0) {
      if (!jsonEqual(tasks[i], calendarData.tasks[i])) {
        const resp = await updateTask(tasks[i]);
        if (resp === 'error') {
          console.log('Не удалось обновить', tasks[i]);
        }
      }
      i--;
    }
    console.log(tasks);
    setCalendarData((prev) => ({ ...prev, tasks: [...tasks] }));
    setUpdateMessage('Сохранено');
    setTimeout(() => {
      setUpdateMessage('');
    }, 2000);
  };

  const handleComplete = async (id: string) => {
    const resp = await api.list.complete(id);
    console.log(resp);
  };

  const updateCalendarDayData = async (data: DataEditDayType) => {
    setUpdateLoading(true);
    if (!menuId) {
      setUpdateLoading(false);
      return console.log('menuId not found');
    }
    // deadlines
    if (data.completedDeadlines) {
      const updatedDeadlines = [...calendarData.deadlines];
      for (let deadlineId of data.completedDeadlines) {
        await handleComplete(deadlineId);
        const deadlineIndex = updatedDeadlines.findIndex(
          (d) => d.id === deadlineId
        );
        if (deadlineIndex >= 0) {
          updatedDeadlines.splice(deadlineIndex, 1);
        }
      }
      setCalendarData((prev) => ({
        ...prev,
        deadlines: [...updatedDeadlines],
      }));
      setEditDay((prev) =>
        prev
          ? {
              ...prev,
              deadlines: prev.deadlines
                ? prev.deadlines.filter(
                    (d) => !data.completedDeadlines.includes(d.id)
                  )
                : undefined,
            }
          : undefined
      );
    }
    //
    const updatedData = await api.calendar.updateDay({
      menuId: menuId,
      note: data.note,
      date: data.date,
      completedDayTaskIds: data.completedDayTaskIds,
    });
    if (updatedData.error) {
      setUpdateMessage(updatedData.error);
    } else {
      const updatedDayDataList = [...calendarData.dayDataList];
      const updatedDayDataIndex = updatedDayDataList.findIndex(
        (n) => n.date === data.date
      );
      if (updatedDayDataIndex >= 0) {
        updatedDayDataList.splice(updatedDayDataIndex, 1, updatedData);
      }
      setCalendarData((prev) => ({ ...prev, dayDataList: updatedDayDataList }));
      setEditDay((prev) =>
        prev
          ? {
              ...prev,
              dayData: prev.dayData
                ? {
                    ...prev.dayData,
                    note: data.note,
                  }
                : undefined,
            }
          : undefined
      );
      setUpdateMessage('Сохранено');
    }
    setUpdateLoading(false);
    setTimeout(() => {
      setUpdateMessage('');
    }, 2000);
  };

  useEffect(() => {
    getMenuList();
    getCalendarData();
    // eslint-disable-next-line
  }, []);

  const changeActiveSettings = (key: string, val: any) => {
    setActiveSettingsList((prev) => ({ ...prev, [key]: val }));
  };

  const getTitle = () => {
    if (loading) {
      return '';
    }
    if (menu?.name) {
      return menu.name;
    } else {
      return 'Календарь';
    }
  };

  return !loading ? (
    <>
      <Header title={getTitle()} />
      <div className={s.calendarWrap}>
        <CalendarSettings
          date={date}
          nowDate={nowDate}
          setDate={setDate}
          editTasks={() => setEditTasks(true)}
          editDeadlines={() => setEditDeadlines(true)}
        />
        <CalendarUI
          date={date}
          className={s.calendar}
          tasks={calendarData.tasks}
          activeDate={activeSettings.date}
          deadlines={calendarData.deadlines}
          dayDataList={calendarData.dayDataList}
          dayClick={(day) => {
            setEditDay(day);
            changeActiveSettings('date', day.date);
          }}
        />
      </div>
      {editDay && (
        <EditDayPopup
          dayData={editDay}
          respMes={updateMessage}
          loading={updateLoading}
          save={updateCalendarDayData}
          close={() => setEditDay(undefined)}
        />
      )}
      {editDeadlines && (
        <EditDeadlinesPopup
          menuList={menuList}
          respMes={updateMessage}
          loading={updateLoading}
          save={updateCalendarData}
          calendarData={calendarData}
          close={() => setEditDeadlines(false)}
        />
      )}
      {editTasks && (
        <EditDayTasksPopup
          delTask={delTask}
          addTask={updateTask}
          save={updateDayTasks}
          respMes={updateMessage}
          loading={updateLoading}
          calendarData={calendarData}
          close={() => setEditTasks(false)}
        />
      )}
    </>
  ) : (
    <Loader />
  );
};

export default Calendar;
