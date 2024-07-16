import s from '../Diagram.module.scss';
import { FC, useEffect, useRef } from 'react';
import dateFromNumb from '../../../utils/dateFromNumb';
import { DiagramDataItemType } from '../../../types/types';

type DiagramDataListPropsType = {
  dataList: DiagramDataItemType[];
  getCategoryName: (id: string) => string;
  setEditDataItem: (v: DiagramDataItemType) => void;
};
// DiagramDataList
const DiagramDataList: FC<DiagramDataListPropsType> = ({
  dataList,
  getCategoryName,
  setEditDataItem,
}) => {
  const dataListRef = useRef<HTMLUListElement>(null);
  useEffect(() => {
    if (dataListRef.current) {
      dataListRef.current.scrollTop = dataListRef.current.scrollHeight;
    }
  }, [dataList]);

  return (
    <ul className={s.dataList} ref={dataListRef}>
      {!!dataList.length ? (
        dataList.map((item, i) => (
          <li
            key={i}
            className={s.dataItem}
            onClick={() => setEditDataItem(item)}
          >
            <div className={s.dataItemLeft}>
              <p>{getCategoryName(item.categoryId)}</p>
              <p className={s.secondary}>{item.desc}</p>
            </div>
            <div className={s.dataItemRight}>
              <p>
                {item.value}
                {/* {item.unit} */}
              </p>
              <p className={s.secondary}>{dateFromNumb(item.date, 'DM')}</p>
            </div>
          </li>
        ))
      ) : (
        <div className={s.emptyList}>
          <p>Пусто</p>
        </div>
      )}
    </ul>
  );
};

export default DiagramDataList;
