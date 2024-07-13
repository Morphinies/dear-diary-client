import { finTransDataType, finTransCategoryType } from '../../../types/types';
import { FC } from 'react';
import s from '../Finance.module.scss';
// import Input from '../../../components/Input/Input';
// import plusIcon from '../../../assets/icons/plusIcon';
import Button from '../../../components/button/Button';
// import Select from '../../../components/select/Select';
// import listAnimation from '../../../utils/listAnimation';
// import Textarea from '../../../components/Input/Textarea';

type FinTransFormType = {
  activeTransType: number;
  addTransaction: () => void;
  transData: finTransDataType;
  showedTransCategory: finTransCategoryType[];
  setTransData: (val: finTransDataType) => void;
  setTransCategoryPopup: (val: boolean) => void;
  setTransEditable: (val: finTransDataType) => void;
};

const FinTransForm: FC<FinTransFormType> = ({
  transData,
  // setTransData,
  // addTransaction,
  // activeTransType,
  setTransEditable,
  // showedTransCategory,
  // setTransCategoryPopup,
}) => {
  // const [formOpened, setFormOpened] = useState(false);

  // useEffect(() => {
  //   if (formOpened) {
  //     listAnimation({
  //       padding: 0,
  //       open: true,
  //       id: `trans_income_form`,
  //     });
  //     listAnimation({
  //       padding: 0,
  //       open: false,
  //       id: `trans_income_form_btn_add`,
  //     });
  //   } else {
  //     listAnimation({ id: `trans_income_form`, padding: 0, open: false });
  //     listAnimation({
  //       id: `trans_income_form_btn_add`,
  //       padding: 0,
  //       open: true,
  //     });
  //   }
  // }, [formOpened]);

  return (
    <div>
      <div className={s.transFormWrap}>
        {/* <div className={s.transForm} id="trans_income_form">
          <div className={s.transInputTop}>
            <Input
              unit="₽"
              type="number"
              id="transSumInput"
              placeholder={`Сумма`}
              value={transData.sum}
              className={s.transInput}
              handleChange={(val) => setTransData({ ...transData, sum: val })}
            />
            <Button
              icon={plusIcon}
              className={s.transBtnAdd}
              handleClick={addTransaction}
              title={`Добавить cтатью о ${
                activeTransType.name === 'Расходы' ? 'Расходах' : 'Доходах'
              }`}
            />
          </div>
          <div className={s.transInputMid}>
            <Select
              className={s.transSelect}
              list={showedTransCategory}
              listId={'transCategoryList'}
              addLabel="Добавить категорию"
              selectedItem={transData.category}
              handleAdd={() => setTransCategoryPopup(true)}
              handleSelect={(cat) =>
                setTransData({ ...transData, category: cat })
              }
            />
            <Input
              type="date"
              id="inputTransDate"
              value={transData.date}
              className={s.inputTransDate}
              handleChange={(val) => {
                setTransData({ ...transData, date: val as number });
              }}
            />
          </div>
          <Textarea
            id="transDescInput"
            value={transData.desc}
            className={s.transDescInput}
            placeholder="Дополнительная информация"
            handleChange={(val) => setTransData({ ...transData, desc: val })}
          />
        </div>
        <div id="trans_income_form_btn_add" className={s.btnAddTransWrap}> */}
        <Button
          text="Добавить запись"
          className={s.btnAddTrans}
          handleClick={() => setTransEditable(transData)}
        />
        {/* </div> */}
      </div>
      {/* <button
        className={s.btnSwitchChapter}
        onClick={() => setFormOpened((prev) => !prev)}
      >
        {formOpened ? 'Свернуть форму' : 'Развернуть форму'}
      </button> */}
    </div>
  );
};

export default FinTransForm;
