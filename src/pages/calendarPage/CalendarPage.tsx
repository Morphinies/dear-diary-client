import api from '../../api';
import { isString } from 'lodash';
import s from './CalendarPage.module.scss';
import Popup from '../../components/popup/Popup';
import Input from '../../components/Input/Input';
import plusIcon from '../../assets/icons/plusIcon';
import { useEffect, useRef, useState } from 'react';
import Button from '../../components/button/Button';
// import Loader from '../../components/loader/Loader';
import { getFullDate } from '../../utils/getFullDate';
import Calendar from '../../components/calendar/Calendar';
import { dayNotesType } from '../../types/types';
import Header from '../../components/header/Header';

const CalendarPage = () => {
  const [date, setDate] = useState<Date>();
  const [nowDate, setNowDate] = useState<Date>();
  const noteListRef = useRef<HTMLUListElement>(null);
  const [noteInput, setNoteInput] = useState<string>('');
  const [dayNotes, setDayNotes] = useState<string[]>([]);
  const [defDayNotes, setDefDayNotes] = useState<string[]>([]);
  const [monthNotes, setMonthNotes] = useState<dayNotesType[]>([]);
  const [dayNotesPopupOpened, setDayNotesPopupOpened] =
    useState<boolean>(false);
  const [, setNotesLoading] = useState<boolean>(false); //notesLoading

  const [loadedMonthNotesDate, setLoadedMonthNotesDate] = useState<number>();

  const getMonthNotes = async (date: number, forcedly?: boolean) => {
    if (loadedMonthNotesDate !== date || forcedly) {
      setNotesLoading(true);
      setLoadedMonthNotesDate(date);
      const data = await api.notes.getMonthNotes(date);
      if (data) {
        setMonthNotes([...data]);
      }
      setNotesLoading(false);
    }
  };

  const getDayNotes = async (date: number) => {
    const day = monthNotes.find((dayNote) => dayNote.date === date);
    if (day?.notes) {
      setDayNotes([...day.notes]);
      setDefDayNotes([...day.notes]);
    } else {
      setDayNotes([]);
      setDefDayNotes([]);
    }
  };

  // get notes then changing date
  useEffect(() => {
    if (date) {
      getMonthNotes(+date);
    }
    // eslint-disable-next-line
  }, [date]);

  // set now date
  useEffect(() => {
    const defCurDate = new Date();
    defCurDate.setUTCHours(0, 0, 0, 0);
    if (!nowDate || +defCurDate !== +nowDate) {
      setNowDate(defCurDate);
      setDate(defCurDate);
    }
    // eslint-disable-next-line
  }, []);

  // autoscroll when adding elements
  useEffect(() => {
    if (noteListRef.current) {
      const height = noteListRef.current.scrollHeight;
      noteListRef.current.scrollTo({
        behavior: 'smooth',
        top: height,
      });
    }
  }, [dayNotes]);

  const save = async () => {
    if (!date) return;
    if (JSON.stringify(defDayNotes) === JSON.stringify(dayNotes)) {
      return setDayNotesPopupOpened(false);
    }
    const data: any[] | undefined = await api.notes.updateCalendarNotes({
      notes: dayNotes,
      date: +date,
    });
    if (data) {
      const monthDate = new Date(date);
      monthDate.setDate(1);
      getMonthNotes(+monthDate, true);
      setDayNotesPopupOpened(false);
    } else {
      alert('Не удалось сохранить заметки');
    }
  };

  const addNote = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!noteInput || !date) return;
    setDayNotes((prev) => [...prev, noteInput]);
    setNoteInput('');
  };

  const changeNote = (i: number, val: string | number | undefined) => {
    if (typeof val === 'undefined' || !date) {
      return;
    } else {
      const text = String(val);
      setDayNotes((prev) => [...prev.slice(0, i), text, ...prev.slice(i + 1)]);
    }
  };

  const delNote = (i: number) => {
    setDayNotes((prev) => [...prev.slice(0, i), ...prev.slice(i + 1)]);
  };

  // useEffect(() => {
  //   console.log('monthNotes', monthNotes);
  // }, [monthNotes]);

  // useEffect(() => {
  //   console.log('dayNotes', dayNotes);
  // }, [dayNotes]);

  const handleClosePopup = () => {
    setDayNotesPopupOpened(false);
    setDayNotes([]);
  };

  const updateNotes = (localDate: number) => {
    if (!nowDate) return;
    if (localDate === +nowDate) {
      setDate(nowDate);
    } else {
      const newDate = new Date(+localDate);
      newDate.setDate(1);
      setDate(newDate);
    }
  };

  return (
    <>
      <Header title="Календарь" />
      <div className={s.notesCalendar}>
        {date && nowDate && (
          <Calendar
            date={date}
            nowDate={nowDate}
            notes={monthNotes}
            className={s.calendar}
            updateNotes={updateNotes}
            setDate={(date) => {
              setDate(date);
              getDayNotes(+date);
            }}
            dayClick={() => setDayNotesPopupOpened(true)}
          />
        )}
        {/* {notesLoading && <Loader />} */}

        {dayNotesPopupOpened && (
          <Popup
            ok={() => save()}
            close={handleClosePopup}
            windowClass={s.popupWindow}
            title={`Заметки - ${getFullDate(date)}`}
          >
            <div className={s.notesPopupContent}>
              <ul ref={noteListRef} className={s.noteList}>
                {dayNotes.map((note, i) => (
                  <li className={s.noteItem} key={i}>
                    <p className={s.noteNumb}>{i + 1 + '.'}</p>
                    <Input
                      value={note}
                      id={`note_${i}`}
                      className={s.inputWrap}
                      clearInput={() => delNote(i)}
                      handleChange={(val) => changeNote(i, val)}
                    />
                  </li>
                ))}
              </ul>
              <form className={s.form} onSubmit={(e) => addNote(e)}>
                <Input
                  id="addNote"
                  value={noteInput}
                  className={s.inputWrap}
                  placeholder="Добавить заметку..."
                  clearInput={() => setNoteInput('')}
                  handleChange={(val) => isString(val) && setNoteInput(val)}
                />
                <Button
                  icon={plusIcon}
                  className={s.btnSend}
                  title={'Добавить в заметки'}
                />
              </form>
            </div>
          </Popup>
        )}
      </div>
    </>
  );
};

export default CalendarPage;
