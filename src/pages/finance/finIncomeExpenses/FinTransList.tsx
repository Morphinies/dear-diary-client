import s from '../Finance.module.scss';
import { FC, useEffect, useRef } from 'react';
import { finTransType } from '../../../types/types';
import dateFromNumb from '../../../utils/dateFromNumb';

type FinTransListType = {
  transList: finTransType[];
  setTransEditable: (v: finTransType) => void;
};

const FinTransList: FC<FinTransListType> = ({
  transList,
  setTransEditable,
}) => {
  const finTransList = useRef<HTMLUListElement>(null);
  useEffect(() => {
    if (finTransList.current) {
      finTransList.current.scrollTop = finTransList.current.scrollHeight;
    }
  }, [transList]);

  return (
    <ul className={s.transList} ref={finTransList}>
      {!!transList.length ? (
        transList.map((item, i) => (
          <li
            key={i}
            className={s.transItem}
            onClick={() => setTransEditable(item)}
          >
            <div className={s.transItemLeft}>
              <p>{item.category.name}</p>
              <p className={s.secondary}>{item.desc}</p>
            </div>
            <div className={s.transItemRight}>
              <p>{item.sum} ₽</p>
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

export default FinTransList;
