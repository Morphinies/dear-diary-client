import { useState } from 'react';
import Select from '../../components/select/Select';
import s from './Finance.module.scss';

const FinStatistic = () => {
  const [finChartList] = useState([{ id: 1, name: 'Общая' }]);
  const [finChartDateList] = useState([
    { id: 3, name: 'Год' },
    { id: 2, name: 'Месяц' },
    { id: 1, name: 'Неделя' },
  ]);
  const [finChartActive] = useState(finChartList[0]);
  const [finChartDateActive] = useState(finChartDateList[0]);

  return (
    <div className={s.statistic}>
      <h2 className={'text-center'}>Статистика</h2>
      <div className={s.financeSettings}>
        <div className={s.left}>
          <Select
            list={finChartList}
            listId="finStatisticChart"
            selectedItem={finChartActive}
            listClassName={s.selectSortList}
            handleSelect={() => console.log('123')}
          />
          <Select
            list={finChartDateList}
            listId="finStatisticChartDate"
            listClassName={s.selectSortList}
            selectedItem={finChartDateActive}
            handleSelect={() => console.log('123')}
          />
        </div>
      </div>
    </div>
  );
};

export default FinStatistic;
