// import _ from 'lodash';
import { useEffect, useState } from 'react';
import s from './Finance.module.scss';
import FinSettings from './FinSettings';
import { getTransPeriod } from '../../utils/getTransPeriod';
import pieChartIcon from '../../assets/icons/diagrams/pieChartIcon';
import {
  displayTypeType,
  transPeriodType,
  transCategoryType,
  finTransCategoryType,
} from '../../types/types';
import FinIncomeExpenses from './finIncomeExpenses/FinIncomeExpenses';
import PopupAddCategory from './finIncomeExpenses/PopupAddCategory';
import api from '../../api';

const Finance = () => {
  const [transCategoryPopup, setTransCategoryPopup] = useState(false);
  const [transCategoryList, setTransCategoryList] = useState<
    finTransCategoryType[]
  >([]);
  const [showedTransCategory, setShowedTransCategory] = useState<
    finTransCategoryType[]
  >([]);

  const [activeChart, setActiveChart] = useState({
    id: 1,
    name: 'Расходы',
  });
  const [activeDisplayType, setActiveDisplayType] = useState<displayTypeType>({
    id: 1,
    icon: pieChartIcon,
    title: 'Круговая диаграмма тип "A"',
  });
  const [activeTransPeriod, setActiveTransPeriod] = useState<transPeriodType>(
    getTransPeriod({ typeId: 3 })
  );
  const [activeTransCategory, setActiveTransCategory] =
    useState<transCategoryType>({
      name: 'Все категории',
      id: '1',
    });
  const [activeTransType, setActiveTransType] = useState<number>(1);

  // Category List
  const getTransCategoryList = async () => {
    const data = await api.finance.getCategoryList();
    if (data) {
      setTransCategoryList([...data]);
    }
  };

  const addCategory = (cat: finTransCategoryType) => {
    setTransCategoryList((prev) => [...prev, cat]);
    setTransCategoryPopup(false);
    // if (!transData.category) {
    //   setTransData((prev) => ({ ...prev, category: cat }));
    // }
  };

  useEffect(() => {
    setShowedTransCategory(
      transCategoryList.filter((category) => category.type === activeTransType)
    );
  }, [transCategoryList, activeTransType]);

  useEffect(() => {
    getTransCategoryList();
  }, []);

  // Category List End

  return (
    <div className={s.finance}>
      <FinSettings
        activeChart={activeChart}
        setActiveChart={setActiveChart}
        activePeriod={activeTransPeriod}
        activeTransType={activeTransType}
        activeDisplayType={activeDisplayType}
        setActivePeriod={setActiveTransPeriod}
        setActiveTransType={setActiveTransType}
        activeTransCategory={activeTransCategory}
        showedTransCategory={showedTransCategory}
        setActiveTransCategory={setActiveTransCategory}
        setActiveDisplayType={(type) => setActiveDisplayType(type)}
      />
      {[1, 2, 3].includes(activeChart.id) && (
        <FinIncomeExpenses
          addCategory={addCategory}
          activeTransType={activeTransType}
          activeDisplayType={activeDisplayType}
          activeTransPeriod={activeTransPeriod}
          showedTransCategory={showedTransCategory}
          activeTransCategory={activeTransCategory}
          setActiveTransPeriod={setActiveTransPeriod}
          setTransCategoryPopup={setTransCategoryPopup}
        />
      )}

      {/* popups */}
      {transCategoryPopup && (
        <PopupAddCategory
          addCategory={addCategory}
          transTypeId={activeTransType}
          close={() => setTransCategoryPopup(false)}
        />
      )}

      {/* <FinStatistic /> */}
    </div>
  );
};

export default Finance;
