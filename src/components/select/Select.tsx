import s from './Select.module.scss';
import listAnimation from '../../utils/listAnimation';
import { FC, useEffect, useRef, useState } from 'react';
import arrowDownIcon from '../../assets/icons/arrowDownIcon';
import plusIcon from '../../assets/icons/plusIcon';

type SelectProps = {
  list: any[];
  label?: string;
  listId: string;
  addLabel?: string;
  topLabel?: string;
  selectedItem: any;
  className?: string;
  isSorting?: boolean;
  handleAdd?: () => void;
  listClassName?: string;
  iconClassName?: string;
  selectIcon?: JSX.Element;
  handleSelect: (val: any) => void;
};

const Select: FC<SelectProps> = ({
  list,
  label,
  listId,
  topLabel,
  handleAdd,
  isSorting,
  selectIcon,
  selectedItem,
  handleSelect,
  addLabel = '',
  className = '',
  iconClassName = '',
  listClassName = '',
}) => {
  const selectRef = useRef<HTMLInputElement | null>(null);
  const [isOpened, setIsOpened] = useState<boolean>(false);
  // отслеживание клика вне компонента

  useEffect(() => {
    isOpened
      ? listAnimation({
          id: `list_${listId}`,
          padding: 0,
          open: true,
          extraPx: 2,
        })
      : listAnimation({ id: `list_${listId}`, padding: 0, open: false });
  }, [isOpened, listId]);

  useEffect(() => {
    const onClick = (e: any) => {
      if (selectRef.current) {
        if (!selectRef.current.contains(e.target)) {
          setIsOpened(false);
        }
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  const activeItemClass = (item: any) => {
    if (typeof selectedItem === 'object') {
      if (
        (selectedItem.id && selectedItem.id === item.id) ||
        (selectedItem._id && selectedItem._id === item._id)
      )
        return s.active;
      else return '';
    } else {
      return selectedItem === item ? s.active : '';
    }
  };

  return (
    <div
      className={
        s.select +
        (isOpened ? ' ' + s.opened : '') +
        (isSorting ? ' ' + s.sort : '') +
        ' ' +
        className
      }
      ref={selectRef}
    >
      {topLabel && <label className={s.topLabel}>{topLabel}</label>}
      <button
        className={s.selected + ' ' + (selectIcon ? s.icon : '')}
        onClick={() => setIsOpened((prev) => !prev)}
      >
        {selectIcon && (
          <div className={s.selectIcon + ' ' + iconClassName}>{selectIcon}</div>
        )}
        {isSorting && <p>Сортировка</p>}
        {!isSorting && !selectIcon && (
          <p>
            {label && <strong>{label + ': '}</strong>}
            {typeof selectedItem === 'object'
              ? selectedItem.name || selectedItem.text
              : selectedItem}
          </p>
        )}
        <i className={s.arrow}>{arrowDownIcon}</i>
      </button>
      <div className={s.listWrap + ' ' + listClassName} id={`list_${listId}`}>
        <ul className={s.list}>
          {list.map((item, index) => (
            <li
              key={index}
              style={{ background: item.color || 'transparent' }}
              className={
                s.item +
                ' ' +
                activeItemClass(item) +
                (item.color ? ' ' + s.color : '')
              }
              onClick={() => {
                handleSelect(item);
                setIsOpened(false);
              }}
            >
              {typeof item === 'object' ? item.name || item.text : item}
            </li>
          ))}
        </ul>
        {handleAdd && (
          <button onClick={handleAdd} className={s.btnAdd}>
            {addLabel && <p>{addLabel}</p>}
            {plusIcon}
          </button>
        )}
      </div>
    </div>
  );
};

export default Select;
