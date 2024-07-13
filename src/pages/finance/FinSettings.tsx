import {
  finChartType,
  transPeriodType,
  displayTypeType,
  transCategoryType,
  finTransCategoryType,
} from '../../types/types';
import { FC, useState } from 'react';
import s from './Finance.module.scss';
import Select from '../../components/select/Select';
import SelectBlock from '../../components/select/SelectBlock';
import barChartIcon from '../../assets/icons/diagrams/barChartIcon';
import pieChartIcon from '../../assets/icons/diagrams/pieChartIcon';
import DiagramThemeSelect from '../../components/diagrams/DiagramThemeSelect';
import pieChartTypeBIcon from '../../assets/icons/diagrams/pieChartTypeBIcon';

type FinanceSettingsType = {
  activeTransType: number;
  activeChart: finChartType;
  activePeriod: finChartType;
  activeDisplayType: displayTypeType;
  activeTransCategory: transCategoryType;
  setActiveTransType: (val: number) => void;
  showedTransCategory: finTransCategoryType[];
  setActiveChart: (val: finChartType) => void;
  setActivePeriod: (val: transPeriodType) => void;
  setActiveDisplayType: (val: displayTypeType) => void;
  setActiveTransCategory: (val: transCategoryType) => void;
};

const FinSettings: FC<FinanceSettingsType> = ({
  activeChart,
  activePeriod,
  setActiveChart,
  setActivePeriod,
  activeTransType,
  activeDisplayType,
  setActiveTransType,
  activeTransCategory,
  showedTransCategory,
  setActiveDisplayType,
  setActiveTransCategory,
}) => {
  const [finChartList] = useState<finChartType[]>([
    { id: 1, name: 'Расходы' },
    { id: 2, name: 'Доходы' },
    { id: 3, name: 'Расходы / Доходы' },
    {
      id: 4,
      name: 'Накопления / Долги',
    },
  ]);
  const [periodsList] = useState<finChartType[]>([
    { id: 3, name: 'Год' },
    { id: 2, name: 'Месяц' },
    { id: 1, name: 'Неделя' },
  ]);
  const [displayTypeList] = useState<displayTypeType[]>([
    { id: 1, icon: pieChartIcon, title: 'Круговая диаграмма тип "A"' },
    { id: 2, icon: pieChartTypeBIcon, title: 'Круговая диаграмма тип "B"' },
    { id: 3, icon: barChartIcon, title: 'Гистограмма' },
  ]);

  const changeActiveTransType = (chapter: any) => {
    if (chapter.id !== activeTransType) {
      setActiveTransType(chapter.id);
      setActiveTransCategory({ name: 'Все категории', id: '1' });
    }
  };

  const changeChart = (chapter: any) => {
    setActiveChart(chapter);
    // change type transactions
    if ([1, 2, 3].includes(chapter.id)) {
      changeActiveTransType(chapter);
    }
  };

  return (
    <div className={s.financeSettings}>
      <div className={s.left}>
        <Select
          list={finChartList}
          listId="finChartSelect"
          selectedItem={activeChart}
          handleSelect={changeChart}
          listClassName={s.settingsSelectList}
        />
        <Select
          list={periodsList}
          listId="finPeriodsSelect"
          selectedItem={activePeriod}
          listClassName={s.settingsSelectList}
          handleSelect={(val) => setActivePeriod({ ...activePeriod, ...val })}
        />
        <Select
          listId={'transCategoryFilterList'}
          selectedItem={activeTransCategory}
          listClassName={s.settingsSelectList}
          handleSelect={(val) => setActiveTransCategory(val)}
          list={[{ name: 'Все категории', id: '1' }, ...showedTransCategory]}
        />
      </div>
      <div className={s.right}>
        <SelectBlock
          list={displayTypeList}
          title="Тип отображения"
          listId={'selectSortTasks'}
          selectedItem={activeDisplayType}
          listClassName={s.finSelectSortList}
          handleSelect={(val) => setActiveDisplayType(val)}
        />
        <DiagramThemeSelect />
      </div>
    </div>
  );
};

export default FinSettings;
