import {
  GraphDataEditItemType,
  DiagramActiveSettingsType,
  DiagramSettingsListType,
} from '../../../types/types';
import { FC, useState } from 'react';
import s from '../Graph.module.scss';
import Popup from '../../../components/popup/Popup';
import Input from '../../../components/Input/Input';
import Textarea from '../../../components/Input/Textarea';

type GraphPopupDataType = {
  close: () => void;
  del: (id: string) => void;
  dataItem: GraphDataEditItemType;
  settingsList: DiagramSettingsListType;
  activeSettings: DiagramActiveSettingsType;
  save: (val: GraphDataEditItemType) => void;
  updateCategoryList: (cat: any, key: string) => void;
};

const GraphPopupData: FC<GraphPopupDataType> = ({
  del,
  save,
  close,
  dataItem,
  settingsList,
  activeSettings,
}) => {
  const [data, setData] = useState<GraphDataEditItemType>(dataItem);

  const handleDel = (itemId: string) => {
    del(itemId);
  };

  const changeData = (key: string, val: any) => {
    setData((prev) => ({ ...prev, [key]: val }));
  };

  return (
    <Popup
      close={close}
      ok={() => save(data)}
      title={`Статья "${activeSettings.chapter.name}"`}
      del={data.id ? () => data.id && handleDel(data.id) : undefined}
    >
      <div className={s.dataItemPopupForm}>
        <Input
          unit={'р'}
          type="number"
          placeholder="Значение"
          value={data.value || ''}
          id="editDataItemValueInput"
          className={s.dataItemInput}
          handleChange={(val) => changeData('value', val)}
        />
        <Input
          type="date"
          value={data.date}
          id="editDataItemDateInput"
          className={s.dataItemDateInput}
          handleChange={(val) => changeData('date', val)}
        />
        <Textarea
          value={data.desc}
          id="editDataItemDescInput"
          className={s.dataItemDescInput}
          placeholder="Дополнительная информация"
          handleChange={(val) => changeData('desc', val)}
        />
        {/* <Button
            className={s.submit}
            text="Сохранить изменения"
            handleClick={() => save(data)}
          /> */}
      </div>
    </Popup>
  );
};

export default GraphPopupData;
