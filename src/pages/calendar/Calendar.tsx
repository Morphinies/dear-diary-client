import api from '../../api';
import s from './Calendar.module.scss';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MenuItemType } from '../../types/types';
import Header from '../../components/header/Header';
import Loader from '../../components/loader/Loader';
import CalendarUI from '../../components/calendar/CalendarUI';
import CalendarSettings from './CalendarSettings';

const Calendar = () => {
  const { menuId } = useParams();
  const [loading, setLoading] = useState(true);
  const [menu, setMenu] = useState<MenuItemType>();
  const [date, setDate] = useState<Date>(new Date());
  const [settingsList, setSettingsList] = useState({});
  const [nowDate, setNowDate] = useState<Date>(new Date());
  const [activeSettings, setActiveSettingsList] = useState({
    date: new Date(),
  });

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

  const getCalendarData = async () => {
    if (!menuId) return;
    setLoading(true);
    // const data = await api.calendar.getData(menuId);
    const menu = await api.menu.getItem(menuId);
    if (menu) {
      setMenu(menu);
    }
    setLoading(false);
  };

  useEffect(() => {
    getCalendarData();
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
        <CalendarSettings date={date} nowDate={nowDate} setDate={setDate} />
        <CalendarUI
          date={date}
          className={s.calendar}
          activeDate={activeSettings.date}
          dayClick={(day) => changeActiveSettings('date', day.date)}
        />
      </div>
    </>
  ) : (
    <Loader />
  );
};

export default Calendar;
