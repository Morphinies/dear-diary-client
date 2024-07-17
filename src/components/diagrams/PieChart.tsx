import './DiagramColors.scss';
import s from './Diagram.module.scss';
import { FC, useCallback, useEffect, useState } from 'react';
import { PieChart as Chart, Pie, ResponsiveContainer, Sector } from 'recharts';

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    fill,
    type,
    value,
    stroke,
    payload,
    percent,
    dataName1,
    dataName2,
    midAngle,
    endAngle,
    startAngle,
    innerRadius,
    outerRadius,
  } = props;

  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  const colors = {
    text: '#fff',
    subText: '#adadad',
  };

  return (
    <g>
      {type === 'A' && (
        <text x={cx} y={cy} dy={8} fill={colors.text} textAnchor="middle">
          {dataName2 ? payload[dataName1][dataName2] : payload[dataName1]}
        </text>
      )}
      <Sector
        cx={cx}
        cy={cy}
        fill={fill}
        stroke={stroke}
        endAngle={endAngle}
        startAngle={startAngle}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
      />
      <Sector
        cx={cx}
        cy={cy}
        fill={fill}
        endAngle={endAngle}
        startAngle={startAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
      />
      <path
        className="none-fill"
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />

      {type === 'B' && (
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={36}
          fill={colors.text}
          textAnchor={textAnchor}
        >
          {dataName2 ? payload[dataName1][dataName2] : payload[dataName1]}
        </text>
      )}
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill={colors.subText}
      >{`${value} ₽`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        fill={colors.text}
        textAnchor={textAnchor}
      >
        {`${(percent * 100).toFixed(2)}%`}
      </text>
    </g>
  );
};

type PieChartType = {
  data: any[];
  type: 'A' | 'B';
  dataKey: string;
  dataName1?: string;
  dataName2?: string;
  className?: string;
};

const PieChart: FC<PieChartType> = ({
  data,
  type,
  dataKey,
  dataName1,
  dataName2,
  className,
}) => {
  const [colors] = useState({
    stroke: '#242424',
    primary: '#2e86de',
    secondary: '#2e86de',
  });
  const [activeIndex, setActiveIndex] = useState<number | undefined>(0);

  const onPieEnter = useCallback(
    (_: any, index: number) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  useEffect(() => {
    setActiveIndex(0);
    // setActiveIndex(undefined);
  }, [data]);

  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <Chart width={1000} height={1000}>
          <Pie
            cx="50%"
            cy="50%"
            data={data}
            dataKey={dataKey}
            className={s.pie}
            outerRadius={120}
            fill={colors.primary}
            stroke={colors.stroke}
            onMouseEnter={onPieEnter}
            activeIndex={activeIndex}
            innerRadius={type === 'B' ? undefined : 100}
            activeShape={(props: any) =>
              renderActiveShape({ ...props, type, dataName1, dataName2 })
            }
          />
        </Chart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChart;
