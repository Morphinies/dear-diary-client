import {
  finTransType,
  transPeriodType,
  displayTypeType,
  finTransDataType,
  transCategoryType,
  finTransCategoryType,
  finTransCategoryDataType,
  // finChartType,
  // getTransPeriodType,
} from '../../../types/types';
import _ from 'lodash';
import api from '../../../api';
import FinDiagram from './FinDiagram';
import s from '../Finance.module.scss';
import FinTransForm from './FinTransForm';
import FinTransList from './FinTransList';
import { FC, useEffect, useState } from 'react';
// import PopupAddCategory from './PopupAddCategory';
import PopupEditFinTrans from './PopupEditFinTrans';
import getMonthName from '../../../utils/getMonthName';
import getDaysInMonth from '../../../utils/getDaysInMonth';
import arrowDownIcon from '../../../assets/icons/arrowDownIcon';

type FinIncomeExpensesType = {
  activeTransType: number;
  activeTransPeriod: transPeriodType;
  activeDisplayType: displayTypeType;
  activeTransCategory: transCategoryType;
  showedTransCategory: finTransCategoryType[];
  setTransCategoryPopup: (val: boolean) => void;
  addCategory: (val: finTransCategoryType) => void;
  setActiveTransPeriod: (val: transPeriodType) => void;
};

const FinIncomeExpenses: FC<FinIncomeExpensesType> = ({
  addCategory,
  activeTransType,
  activeDisplayType,
  activeTransPeriod,
  showedTransCategory,
  activeTransCategory,
  setActiveTransPeriod,
  setTransCategoryPopup,
}) => {
  const [transEditable, setTransEditable] = useState<
    finTransType | finTransDataType
  >();

  const [showedTransList, setShowedTransList] = useState<finTransType[]>([]);

  const [transByCategoriesList, setTransByCategoriesList] = useState<
    finTransCategoryDataType[]
  >([]);

  const [transList, setTransList] = useState<finTransType[]>([]);

  const [transData, setTransData] = useState<finTransDataType>({
    num: 1,
    sum: '',
    desc: '',
    date: +new Date(),
    category: undefined,
    type: activeTransType,
  });

  const getTransPeriodTitle = () => {
    // year
    const startYear = new Date(activeTransPeriod.startDate).getFullYear();
    const finishYear = new Date(activeTransPeriod.finishDate).getFullYear();
    const year =
      startYear === finishYear
        ? `${startYear}`
        : `${startYear} - ${finishYear}`;
    // month
    const startMonth = getMonthName(
      new Date(activeTransPeriod.startDate).getMonth()
    );
    const finishMonth = getMonthName(
      new Date(activeTransPeriod.finishDate).getMonth()
    );
    // date
    const startDate =
      String(new Date(activeTransPeriod.startDate).getDate()).padStart(2, '0') +
      '.' +
      String(new Date(activeTransPeriod.startDate).getMonth() + 1).padStart(
        2,
        '0'
      );
    const finishDate =
      String(new Date(activeTransPeriod.finishDate).getDate()).padStart(
        2,
        '0'
      ) +
      '.' +
      String(new Date(activeTransPeriod.finishDate).getMonth() + 1).padStart(
        2,
        '0'
      );
    const date =
      startDate === finishDate ? startDate : `${startDate} - ${finishDate} `;

    const month =
      startMonth === finishMonth
        ? startMonth
        : `${startMonth} - ${finishMonth} `;

    let firstLine = '';
    let secondLine = '';
    let thirdLine = '';

    switch (activeTransPeriod.id) {
      case 1:
        firstLine = year;
        secondLine = month;
        thirdLine = date;
        break;
      case 2:
        firstLine = year;
        secondLine = '';
        // secondLine = date;
        thirdLine = month;
        break;
      case 3:
        firstLine = '';
        secondLine = '';
        // secondLine = date;
        thirdLine = year;
        break;
      default:
        break;
    }
    return (
      <>
        <p className={s.secondary}>{firstLine}</p>
        <p className={s.secondary}>{secondLine}</p>
        <div className={s.transPeriodTitleWrap}>
          <button onClick={() => changePeriod('prev')} className="btnPrev">
            {arrowDownIcon}
          </button>
          <h3 className={s.transPeriodTitle}>{thirdLine}</h3>
          <button onClick={() => changePeriod('next')} className="btnNext">
            {arrowDownIcon}
          </button>
        </div>
      </>
    );
  };

  const changePeriod = (key: 'next' | 'prev') => {
    let newStartDate = 0;
    let newFinishDate = 0;
    const startDate = new Date(activeTransPeriod.startDate);
    const finishDate = new Date(activeTransPeriod.finishDate);
    const curYear = startDate.getFullYear();

    switch (activeTransPeriod.id) {
      // week
      case 1:
        const extraVal = 7 * 24 * 3600 * 1000 * (key === 'next' ? 1 : -1);
        newStartDate = +activeTransPeriod.startDate + extraVal;
        newFinishDate = +activeTransPeriod.finishDate + extraVal;
        break;
      // month
      case 2:
        if (key === 'next') {
          newStartDate = +activeTransPeriod.finishDate + 1;
          const daysInMonth = getDaysInMonth({
            year: new Date(newStartDate).getFullYear(),
            month: new Date(newStartDate).getMonth() + 1,
          });
          newFinishDate = newStartDate + daysInMonth * 24 * 3600 * 1000 - 1;
        } else {
          const startDate = new Date(activeTransPeriod.startDate - 1);
          newFinishDate = +startDate;
          startDate.setDate(1);
          startDate.setHours(0, 0, 0, 0);
          newStartDate = +startDate;
        }
        break;
      // year
      case 3:
        if (key === 'next') {
          startDate.setFullYear(curYear + 1);
          finishDate.setFullYear(curYear + 1);
        } else {
          startDate.setFullYear(curYear - 1);
          finishDate.setFullYear(curYear - 1);
        }
        newStartDate = +startDate;
        newFinishDate = +finishDate;
        break;
      default:
        break;
    }
    if (newStartDate && newFinishDate) {
      setActiveTransPeriod({
        ...activeTransPeriod,
        startDate: newStartDate,
        finishDate: newFinishDate,
      });
    }
  };

  const addTransaction = async (transData: finTransDataType | finTransType) => {
    const existingTrans = transData as finTransType;
    if (existingTrans.id) {
      const data = await api.finance.addFinTransaction(existingTrans);
      if (data) {
        const editingTransId = transList.findIndex(
          (trans) => trans.id === existingTrans.id
        );
        setTransList([
          ...transList.slice(0, editingTransId),
          existingTrans,
          ...transList.slice(editingTransId + 1),
        ]);
        setTransEditable(undefined);
      }
    } else if (transData.category?.id && transData.sum) {
      const trans: finTransDataType = {
        num: transData.num,
        desc: transData.desc,
        date: transData.date,
        sum: Number(transData.sum),
        category: {
          id: transData.category.id,
          name: transData.category.name,
        },
        type: activeTransType,
      };
      const data = await api.finance.addFinTransaction(trans);
      if (data) {
        setTransEditable(undefined);
        setTransList((prev) => [...prev, data]);
        setTransData((prev) => ({ ...prev, sum: '', desc: '' }));
      }
    }
  };

  const getTransList = async () => {
    const data = await api.finance.getFinTransactionList();
    if (data) {
      setTransList([...data]);
    } else {
      console.log('Не удалось загрузить транзакции');
    }
  };

  const delTransaction = async (id: string) => {
    if (id) {
      const data = await api.finance.delFinTransaction({
        id,
      });
      if (data) {
        setTransList((prev) => [...prev.filter((item) => item.id !== id)]);
        setTransEditable(undefined);
      } else {
        console.log('Не удалось удалить транзакцию');
      }
    }
  };

  useEffect(() => {
    // filter by type
    const filtredList = transList.filter(
      (trans) => trans.type === activeTransType
    );
    // filter by category
    const filtredByCategory =
      activeTransCategory.id === '1'
        ? filtredList
        : filtredList.filter(
            (trans) => trans.category.id === activeTransCategory.id
          );

    // filter by date
    const filtredByDateList = filtredByCategory.filter(
      (trans) =>
        trans.date <= activeTransPeriod.finishDate &&
        trans.date >= +activeTransPeriod.startDate
    );
    // sorted by date
    const sortedByDateList = filtredByDateList.sort((a, b) => a.date - b.date);
    // transformation by category
    const transformList: finTransCategoryDataType[] = [];
    for (let item of sortedByDateList) {
      const categoryIndex = transformList.findIndex(
        (transformItem) => transformItem.category === item.category.name
      );
      if (categoryIndex < 0) {
        transformList.push({ category: item.category.name, data: [item] });
      } else {
        const newItem = {
          ...transformList[categoryIndex],
          data: [...transformList[categoryIndex].data, item],
        };
        transformList.splice(categoryIndex, 1, newItem);
      }
    }

    setShowedTransList([...sortedByDateList]);
    setTransByCategoriesList([...transformList]);
    if (sortedByDateList.length) {
      const maxNumTrans = _.maxBy(sortedByDateList, 'num');
      if (!maxNumTrans) return;
      setTransData((prev) => ({ ...prev, num: maxNumTrans.num + 1 }));
    } else {
      setTransData((prev) => ({ ...prev, num: 1 }));
    }
  }, [transList, activeTransType, activeTransPeriod, activeTransCategory]);

  useEffect(() => {
    getTransList();
  }, []);

  useEffect(() => {
    showedTransCategory[0]
      ? setTransData((prev) => ({ ...prev, category: showedTransCategory[0] }))
      : setTransData((prev) => ({ ...prev, category: undefined }));
  }, [showedTransCategory]);

  return (
    <div className={s.main}>
      <div className={s.trans}>
        <div className={s.transListWrap}>
          <FinTransList
            transList={showedTransList}
            setTransEditable={setTransEditable}
          />
          <FinTransForm
            transData={transData}
            setTransData={setTransData}
            activeTransType={activeTransType}
            setTransEditable={setTransEditable}
            showedTransCategory={showedTransCategory}
            setTransCategoryPopup={setTransCategoryPopup}
            addTransaction={() => addTransaction(transData)}
          />
        </div>
      </div>
      <div className={s.transDiagram}>
        <div className={s.transPeriod}>{getTransPeriodTitle()}</div>
        <FinDiagram
          finData={transByCategoriesList}
          activeDisplayType={activeDisplayType}
        />
      </div>
      {transEditable && (
        <PopupEditFinTrans
          del={delTransaction}
          save={addTransaction}
          trans={transEditable}
          addCategory={addCategory}
          activeTransType={activeTransType}
          transCategoryList={showedTransCategory}
          close={() => setTransEditable(undefined)}
        />
      )}
    </div>
  );
};

export default FinIncomeExpenses;
