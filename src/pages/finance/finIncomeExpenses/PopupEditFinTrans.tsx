import {
  finTransType,
  finTransCatType,
  finTransDataType,
  finTransCategoryType,
} from '../../../types/types';
import { FC, useState } from 'react';
import s from '../Finance.module.scss';
import Popup from '../../../components/popup/Popup';
import Input from '../../../components/Input/Input';
import PopupAddCategory from './PopupAddCategory';
import Select from '../../../components/select/Select';
import Textarea from '../../../components/Input/Textarea';
import Button from '../../../components/button/Button';

type PopupFinanceTransType = {
  close: () => void;
  activeTransType: number;
  del: (id: string) => void;
  transCategoryList: finTransCatType[];
  trans: finTransType | finTransDataType;
  addCategory: (cat: finTransCategoryType) => void;
  save: (v: finTransType | finTransDataType) => void;
};

const PopupEditFinTrans: FC<PopupFinanceTransType> = ({
  del,
  save,
  close,
  trans,
  addCategory,
  activeTransType,
  transCategoryList,
}) => {
  const [transData, setTransData] = useState<finTransType | finTransDataType>(
    trans
  );
  const [transCategoryPopup, setTransCategoryPopup] = useState(false);

  const handleDel = () => {
    const t = trans as finTransType;
    return t ? () => del(t.id) : undefined;
  };

  return (
    <Popup
      del={handleDel()}
      title={`Статья о ${trans.type === 1 ? 'расходе' : 'доходе'} № ${
        trans.num
      }`}
      close={close}
    >
      <div className={s.finTransPopupForm}>
        <Input
          unit="₽"
          type="number"
          placeholder="Сумма"
          id="editTransSumInput"
          className={s.transInput}
          value={transData.sum}
          handleChange={(val) =>
            setTransData((prev) => ({ ...prev, sum: val as number }))
          }
        />
        <Select
          list={transCategoryList}
          className={s.transSelect}
          listId={'editTransCategory'}
          addLabel="Добавить категорию"
          selectedItem={transData.category}
          handleAdd={() => setTransCategoryPopup(true)}
          handleSelect={(cat) => setTransData({ ...transData, category: cat })}
        />
        <Input
          type="date"
          id="editTransDateInput"
          value={transData.date}
          className={s.inputTransDate}
          handleChange={(val) =>
            setTransData({ ...transData, date: val as number })
          }
        />
        <Textarea
          id="editTransDescInput"
          value={transData.desc}
          className={s.transDescInput}
          placeholder="Дополнительная информация"
          handleChange={(val) =>
            setTransData({ ...transData, desc: val as string })
          }
        />
        <Button
          className={s.submit}
          text="Сохранить изменения"
          handleClick={() => save(transData)}
        />
      </div>
      {transCategoryPopup && (
        <PopupAddCategory
          close={() => setTransCategoryPopup(false)}
          transTypeId={activeTransType}
          addCategory={(val) => {
            addCategory(val);
            setTransCategoryPopup(false);
          }}
        />
      )}
    </Popup>
  );
};

export default PopupEditFinTrans;
