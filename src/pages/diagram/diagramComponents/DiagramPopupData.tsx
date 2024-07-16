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

  const handleDel = (itemId: string) => {
    del(itemId);
  };

  const changeData = (key: string, val: any) => {
    setData((prev) => ({ ...prev, [key]: val }));
  };

  const getSelectedItem = () => {
    return settingsList.categories
      .slice(1)
      .find((cat) => cat.id === data.categoryId);
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
        <Select
          className={s.dataItemSelect}
          handleEdit={setEditCategory}
          addLabel="Добавить категорию"
          selectedItem={getSelectedItem()}
          listId={'editDataItemCategoryInput'}
          handleAdd={() => setEditCategory({})}
          list={settingsList.categories.slice(1)}
          handleSelect={(val) => changeData('categoryId', val.id)}
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
      {editCategory && (
        <DiagramPopupCategory
          editCategory={editCategory}
          activeSettings={activeSettings}
          updateCategoryList={(cat: any, key: string) => {
            setEditCategory(undefined);
            updateCategoryList(cat, key);
          }}
          close={() => setEditCategory(undefined)}
        />
      )}
    </Popup>
  );
};

export default DiagramPopupData;
