import {
  DiagramActiveViewType,
  DiagramPieChartDataType,
} from '../../../types/types';
import { FC, useEffect, useState } from 'react';
import s from '../Diagram.module.scss';
import PieChart from '../../../components/diagrams/PieChart';
import BarChart from '../../../components/diagrams/BarChart';

type DiagramPieChartType = {
  diagramData: DiagramPieChartDataType[];
  activeViewType: DiagramActiveViewType;
};

const DiagramPieChart: FC<DiagramPieChartType> = ({
  activeViewType,
  diagramData,
}) => {
  const [data, setData] = useState<DiagramPieChartDataType[]>(diagramData);

  useEffect(() => {
    setData([...diagramData]);
  }, [diagramData]);

  return (
    <>
      {activeViewType.id === 1 && (
        <PieChart
          type="A"
          data={data}
          dataKey="value"
          dataName1="category"
          className={s.pieChart}
        />
      )}
      {activeViewType.id === 2 && (
        <PieChart
          type="B"
          data={data}
          dataKey="value"
          dataName1="category"
          className={s.pieChart}
        />
      )}
      {activeViewType.id === 3 && (
        <BarChart
          data={data}
          dataKey="value"
          dataName1="category"
          className={s.barChart}
        />
      )}
    </>
  );
};

export default DiagramPieChart;
