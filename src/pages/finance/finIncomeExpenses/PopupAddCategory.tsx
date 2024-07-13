import api from '../../../api';
import { FC, useState } from 'react';
import s from '../Finance.module.scss';
import Input from '../../../components/Input/Input';
import Popup from '../../../components/popup/Popup';
import Button from '../../../components/button/Button';
import { finTransCategoryType } from '../../../types/types';

type PopupAddCategoryType = {
  close: () => void;
  transTypeId: number;
  addCategory: (cat: finTransCategoryType) => void;
};

const PopupAddCategory: FC<PopupAddCategoryType> = ({
  close,
  addCategory,
  transTypeId,
}) => {
  const [value, setValue] = useState('');

  const add = async () => {
    if (value) {
      const data = await api.finance.addCategory({
        name: value,
        // type: { id: transTypeId },
        type: transTypeId,
      });
      if (data) {
        setValue('');
        addCategory(data);
      }
    }
  };

  return (
    <Popup
      close={close}
      title={'Новая категория'}
      windowClass={s.popupAddCategory}
      contentClass={s.popupAddCategoryContent}
    >
      <Input
        autofocus
        value={value}
        id="transCatInput"
        className={s.transCatInput}
        placeholder={`Название категории`}
        handleChange={(val) => setValue(String(val))}
      />
      <Button text="Добавить" title="Добавить категорию" handleClick={add} />
    </Popup>
  );
};

export default PopupAddCategory;
