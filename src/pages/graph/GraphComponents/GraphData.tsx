import {
  GraphDataType,
  GraphDataItemType,
  DiagramDataPeriodType,
  GraphDataEditItemType,
} from '../../../types/types';
import {
  Line,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  ResponsiveContainer,
} from 'recharts';
import api from '../../../api';
import s from '../Graph.module.scss';
import GraphDataList from './GraphDataList';
import GraphPopupData from './GraphPopupData';
import { FC, useEffect, useState } from 'react';
import Button from '../../../components/button/Button';
import getMonthName from '../../../utils/getMonthName';
import getDaysInMonth from '../../../utils/getDaysInMonth';
import { getDataPeriod } from '../../../utils/getDataPeriod';
import arrowDownIcon from '../../../assets/icons/arrowDownIcon';
import { getFullDate } from '../../../utils/getFullDate';

const GraphData: FC<any> = ({
  settingsList,
  activeSettings,
  updateCategoryList,
  // changeActiveSettings,
}) => {
  // const [loading, setloading] = useState(true);
  const [activeDataPeriod, setActiveDataPeriod] =
    useState<DiagramDataPeriodType>({
      startDate: 0,
      finishDate: 99999999999999,
    });

  // data
  const [dataList, setDataList] = useState<GraphDataItemType[]>([]);
  const [showedDataList, setShowedDataList] = useState<GraphDataItemType[]>([]);
  // , setTransformAllDataList
  const [transformAllDataList] = useState<GraphDataType[]>([]);
  const [transformDataList, setTransformDataList] = useState<GraphDataType[]>(
    []
  );
  const [defDataItem] = useState<GraphDataEditItemType>({
    value: 0,
    desc: '',
    date: +new Date(),
    chapterId: activeSettings.chapter.id,
  });

  const [editDataItem, setEditDataItem] = useState<
    GraphDataEditItemType | undefined
  >();

  useEffect(() => {}, [activeSettings.chapter, settingsList.categories]);

  const addDataItem = () => {
    setEditDataItem({
      ...defDataItem,
      chapterId: activeSettings.chapter.id,
    });
  };

  useEffect(() => {
    if (activeSettings.period.id) {
      setActiveDataPeriod(getDataPeriod(activeSettings.period.id));
    }
  }, [activeSettings.period]);

  const getDataPeriodTitle = () => {
    if (!activeDataPeriod) return;
    // year
    const startYear = new Date(activeDataPeriod.startDate).getFullYear();
    const finishYear = new Date(activeDataPeriod.finishDate).getFullYear();
    const year =
      startYear === finishYear
        ? `${startYear}`
        : `${startYear} - ${finishYear}`;
    // month
    const startMonth = getMonthName(
      new Date(activeDataPeriod.startDate).getMonth()
    );
    const finishMonth = getMonthName(
      new Date(activeDataPeriod.finishDate).getMonth()
    );
    // date
    const startDate =
      String(new Date(activeDataPeriod.startDate).getDate()).padStart(2, '0') +
      '.' +
      String(new Date(activeDataPeriod.startDate).getMonth() + 1).padStart(
        2,
        '0'
      );
    const finishDate =
      String(new Date(activeDataPeriod.finishDate).getDate()).padStart(2, '0') +
      '.' +
      String(new Date(activeDataPeriod.finishDate).getMonth() + 1).padStart(
        2,
        '0'
      );
    const date =
      startDate === finishDate ? startDate : `${startDate} - ${finishDate} `;

    const month =
      startMonth === finishMonth
        ? startMonth
        : `${startMonth} - ${finishMonth} `;

    let resText = '';

    switch (activeDataPeriod.id) {
      case 1:
        resText = date;
        break;
      case 2:
        resText = month + ' ' + year;
        break;
      case 3:
        resText = year;
        break;
      default:
        resText = date;
        break;
    }
    return (
      <>
        {/* <p className={s.secondary}>{firstLine}</p> */}
        {/* <p className={s.secondary}>{secondLine}</p> */}
        <div className={s.diagramPeriodTitleWrap}>
          <button onClick={() => changePeriod('prev')} className="btnPrev">
            {arrowDownIcon}
          </button>
          {/* <h3 className={s.diagramPeriodTitle}>{thirdLine}</h3> */}
          <h3 className={s.diagramPeriodTitle}>{resText}</h3>
          <button onClick={() => changePeriod('next')} className="btnNext">
            {arrowDownIcon}
          </button>
        </div>
      </>
    );
  };

  const changePeriod = (key: 'next' | 'prev') => {
    if (!activeDataPeriod) return;
    let newStartDate = 0;
    let newFinishDate = 0;
    const startDate = new Date(activeDataPeriod.startDate);
    const finishDate = new Date(activeDataPeriod.finishDate);
    const curYear = startDate.getFullYear();

    switch (activeDataPeriod.id) {
      // week
      case 1:
        const extraVal = 7 * 24 * 3600 * 1000 * (key === 'next' ? 1 : -1);
        newStartDate = +activeDataPeriod.startDate + extraVal;
        newFinishDate = +activeDataPeriod.finishDate + extraVal;
        break;
      // month
      case 2:
        if (key === 'next') {
          newStartDate = +activeDataPeriod.finishDate + 1;
          const daysInMonth = getDaysInMonth({
            year: new Date(newStartDate).getFullYear(),
            month: new Date(newStartDate).getMonth() + 1,
          });
          newFinishDate = newStartDate + daysInMonth * 24 * 3600 * 1000 - 1;
        } else {
          const startDate = new Date(activeDataPeriod.startDate - 1);
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
      setActiveDataPeriod({
        ...activeDataPeriod,
        startDate: newStartDate,
        finishDate: newFinishDate,
      });
    }
  };

  const saveDataItem = async (
    dataItem: GraphDataEditItemType | GraphDataItemType
  ) => {
    const data = await api.graph.editDataItem(dataItem);
    if (data) {
      const editDataItemId = dataList.findIndex(
        (trans) => trans.id === dataItem.id
      );
      setDataList([
        ...dataList.slice(0, editDataItemId),
        data,
        ...dataList.slice(editDataItemId + 1),
      ]);
      setEditDataItem(undefined);
    }
  };

  const getDataList = async (chapterId: string) => {
    // setloading(true);
    const data = await api.graph.getDataList(chapterId);
    if (data) {
      setDataList([...data]);
    } else {
      console.log('Не удалось загрузить данные');
    }
    // setloading(false);
  };

  // const getDefDataList = async (chapterId: string) => {
  //   setloading(true);
  //   const data = await api.graph.getDataList(chapterId);
  //   if (data) {
  //     const transformedData = getTransformDataList(data);
  //     setTransformAllDataList([...transformedData]);
  //   } else {
  //     console.log('Не удалось загрузить данные');
  //   }
  //   setloading(false);
  // };

  const delDataItem = async (id: string) => {
    if (id) {
      const data = await api.graph.delDataItem(id);
      if (data) {
        setDataList((prev) => [...prev.filter((item) => item.id !== id)]);
        setEditDataItem(undefined);
      } else {
        console.log('Не удалось удалить');
      }
    }
  };

  const getTransformDataList = (
    list: GraphDataItemType[],
    chapterId?: string
  ) => {
    const transformList: any[] = list.map((item) => ({
      name: getFullDate(new Date(item.date)),
      value: item.value,
      unit: '₽',
    }));
    return transformList;
  };

  useEffect(() => {
    // filter by date
    const filtredByDateList = dataList.filter(
      (item) =>
        item.date <= activeDataPeriod.finishDate &&
        item.date >= +activeDataPeriod.startDate
    );
    // sorted by date
    const sortedByDateList = filtredByDateList.sort((a, b) => a.date - b.date);
    setShowedDataList([...sortedByDateList]);
    const transformedData = getTransformDataList(
      sortedByDateList,
      activeSettings.chapter.id
    );
    setTransformDataList([...transformedData]);
  }, [dataList, activeDataPeriod, activeSettings.chapter]);

  useEffect(() => {
    if (activeSettings.chapter.id) {
      getDataList(activeSettings.chapter.id);
    }
  }, [activeSettings.chapter]);

  useEffect(() => {
    // if (activeSettings.chapter.length >= 0) {
    //   getDefDataList(activeSettings.chapter.id);
    // }
  }, [activeSettings.chapter]);

  const renderTooltip = ({ active, payload, label }: any) => {
    const value = payload[0]?.value || payload[0]?.payload?.value;
    const unit = payload[0]?.unit || payload[0]?.payload?.unit;
    return (
      <div>
        <p>{label}</p>
        <p>
          {value} {unit}
        </p>
      </div>
    );
  };

  return (
    <div className={s.main}>
      <div className={s.graphDataListWrap}>
        <div className={s.graphDataList}>
          <GraphDataList
            dataList={showedDataList}
            setEditDataItem={setEditDataItem}
          />
          <Button
            text="Добавить запись"
            className={s.btnAddDataItem}
            handleClick={addDataItem}
          />
        </div>
      </div>
      <div className={s.lineChartWrap}>
        <div className={s.lineChartDataPeriod}>{getDataPeriodTitle()}</div>
        <div className={s.lineChart}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              // width={730}
              // height={250}
              data={transformDataList}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              {/* <CartesianGrid strokeDasharray="3 3" /> */}
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={renderTooltip} cursor={{ strokeWidth: 0 }} />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
              {/* <Legend /> */}
            </LineChart>
          </ResponsiveContainer>
        </div>
        {!!transformAllDataList.length && (
          <div className={s.summary}>
            <ul className={s.summaryList}></ul>
          </div>
        )}
      </div>
      {editDataItem && (
        <GraphPopupData
          del={delDataItem}
          save={saveDataItem}
          dataItem={editDataItem}
          settingsList={settingsList}
          activeSettings={activeSettings}
          updateCategoryList={updateCategoryList}
          close={() => setEditDataItem(undefined)}
        />
      )}
    </div>
  );
};

export default GraphData;
