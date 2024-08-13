import s from './Calendar.module.scss';
import { useEffect, useState } from 'react';
import Popup from '../../components/popup/Popup';
import Checkbox from '../../components/checkbox/Checkbox';
import { EditCalendarDataType, MenuItemType } from '../../types/types';

type EditDayPopupType = {
  respMes: string;
  loading: boolean;
  close: () => void;
  menuList: MenuItemType[];
  save: (val: any) => void;
  calendarData: EditCalendarDataType;
};

type CalendarSettingsDataType = {
  deadlineIds: string[];
};

const EditSettingsPopup = ({
  save,
  close,
  loading,
  respMes,
  menuList,
  calendarData,
}: EditDayPopupType) => {
  const [data, setData] = useState<CalendarSettingsDataType>({
    deadlineIds: [],
  });

  useEffect(() => {
    if (calendarData.deadlineIds) {
      setData((prev) => ({
        ...prev,
        deadlineIds: [...calendarData.deadlineIds],
      }));
    } else {
      setData((prev) => ({ ...prev, deadlineIds: [] }));
    }
  }, [calendarData.deadlineIds]);

  const changeData = (key: 'deadlineIds', menuId: string) => {
    const isExistInData = data[key].includes(menuId);
    if (isExistInData) {
      setData((prev) => ({
        ...prev,
        [key]: [...prev[key].filter((id) => id !== menuId)],
      }));
    } else {
      setData((prev) => ({ ...prev, [key]: [...prev[key], menuId] }));
    }
  };

  return (
    <Popup
      close={close}
      message={respMes}
      loading={loading}
      title={'Дедлайны'}
      windowClass={s.popup}
      ok={() => save(data)}
      contentClass={s.popupContent}
    >
      <p className="help-text">
        Вы можете отметить на календаре дедлайны из ваших списков*
      </p>
      <div className={s.checkboxList}>
        {menuList.map((menuItem, i) => (
          <Checkbox
            key={i}
            val={data.deadlineIds.includes(menuItem.id)}
            title={`Дедлайны списка "${menuItem.name}"`}
            setVal={() => changeData('deadlineIds', menuItem.id)}
          />
        ))}
      </div>
    </Popup>
  );
};

export default EditSettingsPopup;
