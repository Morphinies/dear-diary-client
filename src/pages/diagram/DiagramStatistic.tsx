import { useState } from 'react';
import s from './Diagram.module.scss';
import Select from '../../components/select/Select';

const DiagramStatistic = () => {
  const [diagramChartList] = useState([{ id: 1, name: 'Общая' }]);
  const [diagramChartDateList] = useState([
    { id: 3, name: 'Год' },
    { id: 2, name: 'Месяц' },
    { id: 1, name: 'Неделя' },
  ]);
  const [finChartActive] = useState(diagramChartList[0]);
  const [finChartDateActive] = useState(diagramChartDateList[0]);

  return (
    <div className={s.statistic}>
      <h2 className={'text-center'}>Статистика</h2>
      <div className={s.diagramSettings}>
        <div className={s.left}>
          <Select
            list={diagramChartList}
            listId="finStatisticChart"
            selectedItem={finChartActive}
            listClassName={s.selectSortList}
            handleSelect={() => console.log('123')}
          />
          <Select
            list={diagramChartDateList}
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

export default DiagramStatistic;
