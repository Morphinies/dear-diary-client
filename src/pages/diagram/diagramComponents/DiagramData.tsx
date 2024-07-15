import {
  DiagramDataItemType,
  DiagramDataPeriodType,
  DiagramDataEditItemType,
  DiagramActiveSettingsType,
  DiagramSettingsListType,
} from '../../../types/types';
import _ from 'lodash';
import api from '../../../api';
import s from '../Diagram.module.scss';
import DiagramPieChart from './DiagramPieChart';
import DiagramDataList from './DiagramDataList';
import { FC, useEffect, useState } from 'react';
import DiagramPopupData from './DiagramPopupData';
import getMonthName from '../../../utils/getMonthName';
import getDaysInMonth from '../../../utils/getDaysInMonth';
import { getDataPeriod } from '../../../utils/getDataPeriod';
import arrowDownIcon from '../../../assets/icons/arrowDownIcon';
import Button from '../../../components/button/Button';

type DiagramDataType = {
  settingsList: DiagramSettingsListType;
  activeSettings: DiagramActiveSettingsType;
  updateCategoryList: (cat: any, key: string) => void;
};

const DiagramData: FC<DiagramDataType> = ({
  settingsList,
  activeSettings,
  updateCategoryList,
}) => {
  const [dataListByCat, setDataListByCat] = useState<any[]>([]);
  const [activeDataPeriod, setActiveDataPeriod] =
    useState<DiagramDataPeriodType>({
      startDate: 0,
      finishDate: 99999999999999,
    });

  // data
  const [dataList, setDataList] = useState<DiagramDataItemType[]>([]);
  const [editDataItem, setEditDataItem] = useState<DiagramDataEditItemType>();
  const [showedDataList, setShowedDataList] = useState<DiagramDataItemType[]>(
    []
  );
  const [defDataItem] = useState<DiagramDataEditItemType>({
    value: 0,
    desc: '',
    date: +new Date(),
    chapterId: activeSettings.chapter.id,
    categoryId: activeSettings.category.id,
  });
  const [dataItem, setDataItem] = useState(defDataItem);

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

    let firstLine = '';
    let secondLine = '';
    let thirdLine = '';

    switch (activeDataPeriod.id) {
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
        <div className={s.diagramPeriodTitleWrap}>
          <button onClick={() => changePeriod('prev')} className="btnPrev">
            {arrowDownIcon}
          </button>
          <h3 className={s.diagramPeriodTitle}>{thirdLine}</h3>
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
    dataItem: DiagramDataEditItemType | DiagramDataItemType
  ) => {
    const data = await api.diagram.editDataItem(dataItem);
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

  const getDataList = async () => {
    const data = await api.diagram.getDataList();
    if (data) {
      setDataList([...data]);
    } else {
      console.log('Не удалось загрузить данные');
    }
  };

  const delDataItem = async (id: string) => {
    if (id) {
      const data = await api.diagram.delDataItem(id);
      if (data) {
        setDataList((prev) => [...prev.filter((item) => item.id !== id)]);
        setEditDataItem(undefined);
      } else {
        console.log('Не удалось удалить');
      }
    }
  };

  useEffect(() => {
    if (!dataList.length) return;
    // filter by chapter
    const filtredList = dataList.filter(
      (dataItem) => dataItem.chapterId === activeSettings.chapter.id
    );
    // filter by category
    const filtredByCategory =
      activeSettings.chapter.id === '1'
        ? filtredList
        : filtredList.filter(
            (trans) => trans.categoryId === activeSettings.category.id
          );
    // filter by date
    const filtredByDateList = filtredByCategory.filter(
      (trans) =>
        trans.date <= activeDataPeriod.finishDate &&
        trans.date >= +activeDataPeriod.startDate
    );
    // sorted by date
    const sortedByDateList = filtredByDateList.sort((a, b) => a.date - b.date);
    // transformation by category
    const transformList: any[] = [];
    // for (let item of sortedByDateList) {
    //   const categoryIndex = transformList.findIndex(
    //     (transformItem) => transformItem.category === item.category.name
    //   );
    //   if (categoryIndex < 0) {
    //     transformList.push({ category: item.category.name, data: [item] });
    //   } else {
    //     const newItem = {
    //       ...transformList[categoryIndex],
    //       data: [...transformList[categoryIndex].data, item],
    //     };
    //     transformList.splice(categoryIndex, 1, newItem);
    //   }
    // }
    setShowedDataList([...sortedByDateList]);
    setDataListByCat([...transformList]);
    if (sortedByDateList.length) {
      const maxNumTrans = _.maxBy(sortedByDateList, 'num');
      if (!maxNumTrans) return;
      // setDataItem((prev) => ({ ...prev, num: maxNumTrans.num + 1 }));
    } else {
      // setDataItem((prev) => ({ ...prev, num: 1 }));
    }
  }, [
    dataList,
    activeDataPeriod,
    activeSettings.chapter,
    activeSettings.category,
  ]);

  useEffect(() => {
    if (activeSettings.category.id) {
      getDataList();
    }
  }, [activeSettings.category]);

  return (
    <div className={s.main}>
      <div className={s.diagramDataListWrap}>
        <div className={s.diagramDataList}>
          <DiagramDataList
            dataList={showedDataList}
            setEditDataItem={setEditDataItem}
          />
          <Button
            text="Добавить запись"
            className={s.btnAddDataItem}
            handleClick={() => setEditDataItem(defDataItem)}
          />
        </div>
      </div>
      <div className={s.diagram}>
        <div className={s.diagramDataPeriod}>{getDataPeriodTitle()}</div>
        <DiagramPieChart
          finData={dataListByCat}
          activeViewType={activeSettings.view}
        />
      </div>
      {editDataItem && (
        <DiagramPopupData
          del={delDataItem}
          save={saveDataItem}
          dataItem={dataItem}
          settingsList={settingsList}
          activeSettings={activeSettings}
          updateCategoryList={updateCategoryList}
          close={() => setEditDataItem(undefined)}
        />
      )}
    </div>
  );
};

export default DiagramData;
