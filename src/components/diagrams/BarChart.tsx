import { useState } from 'react';
import s from './Diagram.module.scss';
import {
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart as Chart,
  ResponsiveContainer,
} from 'recharts';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{label}</p>
        <p className="desc">{payload[0].value + ' ₽'}</p>
      </div>
    );
  }
  return null;
};

type BarChartType = {
  className?: string;
  data: any[];
  dataKey: string;
  dataName1: string;
};

export default function BarChart({
  className,
  data,
  dataKey,
  dataName1,
}: BarChartType) {
  const [colors] = useState({
    primary: '#2e86de',
    secondary: '#fff',
    stroke: '#242424',
  });

  return (
    <div className={s.barChart + ' ' + className}>
      <ResponsiveContainer width="100%" height="100%">
        <Chart
          width={600}
          height={400}
          data={data}
          margin={{
            top: 5,
            right: 30,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="2 2" stroke={colors.stroke} />
          <XAxis
            className={s.axis}
            dataKey={dataName1}
            stroke={colors.secondary}
          />
          <YAxis
            className={s.axis}
            dataKey={dataKey}
            stroke={colors.secondary}
          />
          <Tooltip content={<CustomTooltip />} />
          {/* <Legend /> */}
          <Bar
            className={s.bar}
            dataKey={dataKey}
            barSize={20}
            fill={colors.primary}
          />
        </Chart>
      </ResponsiveContainer>
    </div>
  );
}
