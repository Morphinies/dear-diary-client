import s from '../Graph.module.scss';
import { FC, useEffect, useRef } from 'react';
import dateFromNumb from '../../../utils/dateFromNumb';
import { GraphDataItemType } from '../../../types/types';

type DiagramDataListPropsType = {
  dataList: GraphDataItemType[];
  setEditDataItem: (v: GraphDataItemType) => void;
};

const GraphDataList: FC<DiagramDataListPropsType> = ({
  dataList,
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
              {/* <p>{(item.categoryId)}</p> */}
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

export default GraphDataList;
