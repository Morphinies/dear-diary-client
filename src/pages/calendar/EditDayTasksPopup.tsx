import {
  EditCalendarDataType,
  CalendarEditTaskType,
  CalendarTaskType,
} from '../../types/types';
import s from './Calendar.module.scss';
import { useEffect, useState } from 'react';
import delIcon from '../../assets/icons/delIcon';
import Popup from '../../components/popup/Popup';
import Input from '../../components/Input/Input';
import plusIcon from '../../assets/icons/plusIcon';
import Button from '../../components/button/Button';
import Checkbox from '../../components/checkbox/Checkbox';

type EditDayTasksPopupProps = {
  respMes: string;
  loading: boolean;
  close: () => void;
  calendarData: EditCalendarDataType;
  save: (val: CalendarTaskType[]) => void;
  delTask: (v: string) => Promise<'error' | 'success'>;
  addTask: (v: CalendarEditTaskType) => Promise<'error' | 'success'>;
};

// type CalendarSettingsDataType = {
//   deadlineIds: string[];
// };

const EditDayTasksPopup = ({
  save,
  close,
  delTask,
  addTask,
  loading,
  respMes,
  calendarData,
}: EditDayTasksPopupProps) => {
  const [dayList] = useState([
    { id: 1, name: 'ПН' },
    { id: 2, name: 'ВТ' },
    { id: 3, name: 'СР' },
    { id: 4, name: 'ЧТ' },
    { id: 5, name: 'ПТ' },
    { id: 6, name: 'СБ' },
    { id: 7, name: 'ВС' },
  ]);
  const [activeDayIds, setActiveDayIds] = useState<number[]>([dayList[0].id]);
  const [tasks, setTasks] = useState<CalendarTaskType[]>([
    ...calendarData.tasks,
  ]);
  const [formData, setFormData] = useState('');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    setTasks([...calendarData.tasks]);
  }, [calendarData.tasks]);

  const changeActiveDayIds = (id: number) => {
    // if (id === 10) {
    //   return !activeDayIds.length
    //     ? setActiveDayIds([...dayList.map((dayItem) => dayItem.id)])
    //     : setActiveDayIds([]);
    // }
    if (activeDayIds.includes(id)) {
      // setActiveDayIds((prev) => [...prev.filter((p) => p !== id)]);
      // setActiveDayIds([]);
    } else {
      setActiveDayIds([id]);
      // setActiveDayIds((prev) => [...prev, id]);
    }
  };

  const handleAddTask = async () => {
    if (!updating && formData.trim()) {
      setUpdating(true);
      const resp = await addTask({
        text: formData,
        menuId: calendarData.menuId || '',
      });
      resp === 'success' && setFormData('');
      setUpdating(false);
    }
  };

  const handleDelTask = async (id: string) => {
    if (!updating) {
      setUpdating(true);
      const resp = await delTask(id);
      resp === 'success' && setFormData('');
      setUpdating(false);
    }
  };

  const isActiveTask = (task: CalendarTaskType) => {
    return task.dayIds.includes(activeDayIds[0]);
  };

  const handleCheckTask = (task: CalendarTaskType) => {
    if (!activeDayIds[0]) return;
    const editTaskIndex = tasks.findIndex((t) => t.id === task.id);
    let updatedTask: CalendarTaskType;
    if (!task.dayIds.includes(activeDayIds[0])) {
      updatedTask = { ...task, dayIds: [...task.dayIds, activeDayIds[0]] };
    } else {
      updatedTask = {
        ...task,
        dayIds: [...task.dayIds.filter((dayId) => dayId !== activeDayIds[0])],
      };
    }
    setTasks((prev) => [
      ...prev.slice(0, editTaskIndex),
      updatedTask,
      ...prev.slice(editTaskIndex + 1),
    ]);
  };

  return (
    <Popup
      close={close}
      message={respMes}
      loading={loading}
      ok={() => save(tasks)}
      title={'Ежедневные задачи'}
      contentClass={s.popupContent + ' ' + s.task}
      windowClass={s.popup + ' ' + s.tasks}
    >
      {/* <p className="help-text">Задачи на каждый день</p> */}
      <div className={s.dayList}>
        {dayList.map((dayItem, i) => (
          <li
            key={i}
            onClick={() => changeActiveDayIds(dayItem.id)}
            className={
              s.dayItem +
              ' ' +
              (activeDayIds.includes(dayItem.id) ? s.active : '')
            }
          >
            {dayItem.name}
          </li>
        ))}
        {/* <li
          title={
            !activeDayIds.length ? 'Выбрать все дни' : 'Очистить выбранное'
          }
          onClick={(e) => {
            e.stopPropagation();
            changeActiveDayIds(10);
          }}
          className={s.dayItem + ' ' + s.btn}
        >
          {!activeDayIds.length ? okIcon : closeIcon}
        </li> */}
      </div>
      {!!activeDayIds.length && (
        <>
          {!!tasks.length && (
            <ul className={s.taskListWrap}>
              {tasks.map((item, i) => (
                <li key={i}>
                  <Checkbox
                    title={item.text}
                    val={isActiveTask(item)}
                    className={s.taskCheckbox}
                    setVal={() => handleCheckTask(item)}
                  />
                  <button
                    disabled={updating}
                    onClick={() => handleDelTask(item.id)}
                    className={s.btnDelTask}
                  >
                    {delIcon}
                  </button>
                </li>
              ))}
            </ul>
          )}
          {!tasks.length && (
            <div className={s.taskListEmpty}>
              <p>Пусто</p>
            </div>
          )}
          <form
            className={s.taskForm}
            onSubmit={(e) => {
              e.preventDefault();
              handleAddTask();
            }}
          >
            <Input
              id={'inputTask'}
              value={formData}
              placeholder="Добавить задачу"
              handleChange={(val) => setFormData(String(val))}
            />
            <Button
              icon={plusIcon}
              disabled={updating}
              className={s.btnAddTask}
              // handleClick={() =>
              //   addTask({ text: formData, menuId: calendarData.menuId || '' })
              // }
            />
          </form>
        </>
      )}
      {!activeDayIds.length && (
        <div className={s.taskListEmpty}>
          <p>Выберите день недели, чтобы установить задачи</p>
          {/* <p>Выберите день/дни недели, чтобы установить задачи</p> */}
        </div>
      )}
      {/* <div className={s.checkboxList}> */}
      {/* <Checkbox
            key={menuItem.id}
            val={data.deadlineIds.includes(menuItem.id)}
            title={`Дедлайны списка "${menuItem.name}"`}
            setVal={() => changeData('deadlineIds', menuItem.id)}
          /> */}
      {/* </div> */}
    </Popup>
  );
};

export default EditDayTasksPopup;
