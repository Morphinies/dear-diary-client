import { useState } from 'react';
import s from './Calendar.module.scss';
// import Input from '../../components/Input/Input';
import Popup from '../../components/popup/Popup';
import { getFullDate } from '../../utils/getFullDate';
import Textarea from '../../components/Input/Textarea';
import Checkbox from '../../components/checkbox/Checkbox';
import { DataDayType, DataEditDayType } from '../../types/types';
import deadlineIcon from '../../assets/icons/deadlineIcon';

type EditDayPopupType = {
  respMes: string;
  loading: boolean;
  close: () => void;
  dayData: DataDayType;
  save: (data: DataEditDayType) => void;
};

const EditDayPopup = ({
  close,
  save,
  loading,
  dayData,
  respMes,
}: EditDayPopupType) => {
  const [data, setData] = useState<DataEditDayType>({
    // task: '',
    id: dayData.id,
    completedDayTaskIds: dayData.dayData?.completedDayTaskIds
      ? [...dayData.dayData?.completedDayTaskIds]
      : [],
    completedDeadlines: [],
    // tasks: dayData.tasks || [],
    note: dayData.dayData?.note || '',
    date: dayData.date ? +dayData.date : 0,
  });

  const changeData = (key: string, val: any) => {
    if (['completedDeadlines', 'completedDayTaskIds'].includes(key)) {
      const objKey = key as 'completedDeadlines' | 'completedDayTaskIds';
      if (data[objKey].includes(val)) {
        setData((prev) => ({
          ...prev,
          [objKey]: [...prev[objKey].filter((item) => item !== val)],
        }));
      } else {
        setData((prev) => ({
          ...prev,
          [objKey]: [...prev[objKey], val],
        }));
      }
    } else {
      setData((prev) => ({ ...prev, [key]: val }));
    }
  };

  return (
    <Popup
      close={close}
      loading={loading}
      message={respMes}
      windowClass={s.popup}
      ok={() => save(data)}
      contentClass={s.popupContent}
      title={dayData.date ? getFullDate(dayData.date) : ''}
    >
      <Textarea
        id="calendarDayNote"
        placeholder="Заметка"
        value={data.note || ''}
        className={s.popupTextarea}
        handleChange={(val) => changeData('note', val)}
      />
      <h3 className={s.checkboxTitle}>Задачи и Дедлайны:</h3>
      {(dayData.deadlines?.length || 0) + (dayData.tasks?.length || 0) > 0 && (
        <div className={s.checkboxList}>
          {(dayData.deadlines || []).map((deadlineItem, i) => (
            <li key={i} className={s.checkboxItem}>
              <Checkbox
                className={s.checkbox}
                title={deadlineItem.text}
                val={data.completedDeadlines.includes(deadlineItem.id)}
                setVal={() => changeData('completedDeadlines', deadlineItem.id)}
              />
              <div className={s.checkboxIcon}>{deadlineIcon}</div>
            </li>
          ))}
          {(dayData.tasks || []).map((taskItem, i) => (
            <li key={i} className={s.checkboxItem}>
              <Checkbox
                title={taskItem.text}
                className={s.checkbox}
                val={data.completedDayTaskIds.includes(taskItem.id)}
                setVal={() => changeData('completedDayTaskIds', taskItem.id)}
              />
            </li>
          ))}
        </div>
      )}
      {(dayData.deadlines?.length || 0) + (dayData.tasks?.length || 0) ===
        0 && (
        <div className={s.emptyTextWrap}>
          <p>Пусто</p>
        </div>
      )}
    </Popup>
  );
};

export default EditDayPopup;
