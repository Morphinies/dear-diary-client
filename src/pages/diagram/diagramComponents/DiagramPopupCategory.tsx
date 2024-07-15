import api from '../../../api';
import { FC, useState } from 'react';
import s from '../Diagram.module.scss';
import Input from '../../../components/Input/Input';
import Popup from '../../../components/popup/Popup';
import Button from '../../../components/button/Button';
import { DiagramActiveSettingsType } from '../../../types/types';

type PopupAddCategoryType = {
  close: () => void;
  editCategory: any;
  activeSettings: DiagramActiveSettingsType;
  updateCategoryList: (val: any, key: string) => void;
};

const DiagramPopupCategory: FC<PopupAddCategoryType> = ({
  close,
  editCategory,
  activeSettings,
  updateCategoryList,
}) => {
  const [value, setValue] = useState(editCategory.name || '');

  const save = async () => {
    if (value) {
      const data = await api.diagram.editCategory({
        id: editCategory.id,
        name: value,
        chapterId: activeSettings.chapter.id,
      });
      if (data) {
        setValue('');
        updateCategoryList(data, 'add');
      }
    }
  };

  const del = async () => {
    if (value) {
      const data = await api.diagram.delCategory(editCategory.id);
      if (data) {
        setValue('');
        updateCategoryList(data, 'del');
      }
    }
  };

  return (
    <Popup
      close={close}
      windowClass={s.popupAddCategory}
      del={editCategory.id ? del : undefined}
      contentClass={s.popupAddCategoryContent}
      title={
        editCategory.id ? 'Категория: ' + editCategory.name : 'Новая категория'
      }
    >
      <Input
        autofocus
        value={value}
        id="categoryNameInput"
        className={s.categoryNameInput}
        placeholder={`Название категории`}
        handleChange={(val) => setValue(String(val))}
      />
      <Button
        handleClick={save}
        text={editCategory.id ? 'Сохранить' : 'Добавить'}
        title={
          editCategory.id ? 'Редактировать категорию' : 'Добавить категорию'
        }
      />
    </Popup>
  );
};

export default DiagramPopupCategory;
