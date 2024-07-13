import {
  displayTypeType,
  finTransCategoryDataType,
} from '../../../types/types';
import s from '../Finance.module.scss';
import { FC, useEffect, useState } from 'react';
import PieChart from '../../../components/diagrams/PieChart';
import BarChart from '../../../components/diagrams/BarChart';

type FinDiagramType = {
  finData: finTransCategoryDataType[];
  activeDisplayType: displayTypeType;
};

type finDiagramDataType = {
  category: string;
  sum: number;
};

const FinDiagram: FC<FinDiagramType> = ({ activeDisplayType, finData }) => {
  const [data, setData] = useState<finDiagramDataType[]>([]);

  useEffect(() => {
    const newData = finData.map((finItem) => ({
      category: finItem.category,
      sum: finItem.data.reduce((acc, item) => acc + +item.sum, 0),
    }));
    setData([...newData]);
  }, [finData]);

  return (
    <>
      {activeDisplayType.id === 1 && (
        <PieChart
          type="A"
          data={data}
          dataKey="sum"
          dataName1="category"
          className={s.pieChart}
        />
      )}
      {activeDisplayType.id === 2 && (
        <PieChart
          type="B"
          data={data}
          dataKey="sum"
          dataName1="category"
          className={s.pieChart}
        />
      )}
      {activeDisplayType.id === 3 && (
        <BarChart
          data={data}
          dataKey="sum"
          dataName1="category"
          className={s.barChart}
        />
      )}

      {!!data.length && (
        <div className={s.summary}>
          <ul className={s.summaryList}>
            <li className={s.summaryItem + ' ' + s.summaryTotal}>
              <p>Всего:</p>
              <p>{data.reduce((prev, cur) => prev + cur.sum, 0)}₽</p>
            </li>
            {data.map((item, i) => (
              <li key={i} className={s.summaryItem}>
                <div className={s.circle}></div>
                <p>{item.category}:</p>
                <p>{item.sum}₽</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default FinDiagram;
