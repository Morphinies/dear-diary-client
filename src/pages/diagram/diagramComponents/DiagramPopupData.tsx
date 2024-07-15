import {
  DiagramDataEditItemType,
  DiagramActiveSettingsType,
  DiagramSettingsListType,
} from '../../../types/types';
import { FC, useState } from 'react';
import s from '../Diagram.module.scss';
import Popup from '../../../components/popup/Popup';
import Input from '../../../components/Input/Input';
import Select from '../../../components/select/Select';
import Button from '../../../components/button/Button';
import Textarea from '../../../components/Input/Textarea';
import DiagramPopupCategory from './DiagramPopupCategory';

type DiagramPopupDataType = {
  close: () => void;
  del: (id: string) => void;
  dataItem: DiagramDataEditItemType;
  settingsList: DiagramSettingsListType;
  activeSettings: DiagramActiveSettingsType;
  save: (val: DiagramDataEditItemType) => void;
  updateCategoryList: (cat: any, key: string) => void;
};

const DiagramPopupData: FC<DiagramPopupDataType> = ({
  del,
  save,
  close,
  dataItem,
  settingsList,
  activeSettings,
  updateCategoryList,
}) => {
  const [data, setData] = useState<DiagramDataEditItemType>(dataItem);
  const [editCategory, setEditCategory] = useState<any>();

  const handleDel = () => {
    if (dataItem.id) {
      del(dataItem.id);
    }
  };

  const changeData = (key: string, val: any) => {
    setData((prev) => ({ ...prev, [key]: val }));
  };

  const getSelectedItem = () => {
    return settingsList.categories.find(
      (cat) => cat.id === dataItem.categoryId
    );
  };

  return (
    <Popup del={handleDel} title={`Статья`} close={close}>
      <div className={s.dataItemPopupForm}>
        <Input
          unit={'р'}
          type="number"
          value={data.value}
          placeholder="Сумма"
          id="editTransSumInput"
          className={s.dataItemInput}
          handleChange={(val) => changeData('value', val)}
        />
        <Select
          className={s.dataItemSelect}
          handleEdit={setEditCategory}
          listId={'editTransCategory'}
          addLabel="Добавить категорию"
          list={settingsList.categories}
          selectedItem={getSelectedItem()}
          handleAdd={() => setEditCategory({})}
          handleSelect={(val) => changeData('categoryId', val.id)}
        />
        <Input
          type="date"
          value={data.date}
          id="dataItemDateInput"
          className={s.dataItemDateInput}
          handleChange={(val) => changeData('date', val)}
        />
        <Textarea
          value={data.desc}
          id="dataItemDescInput"
          className={s.dataItemDescInput}
          placeholder="Дополнительная информация"
          handleChange={(val) => changeData('desc', val)}
        />
        <Button
          className={s.submit}
          text="Сохранить изменения"
          handleClick={() => save(data)}
        />
      </div>
      {editCategory && (
        <DiagramPopupCategory
          editCategory={editCategory}
          activeSettings={activeSettings}
          updateCategoryList={updateCategoryList}
          close={() => setEditCategory(undefined)}
        />
      )}
    </Popup>
  );
};

export default DiagramPopupData;
