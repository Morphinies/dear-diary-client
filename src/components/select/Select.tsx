import s from './Select.module.scss';
import listAnimation from '../../utils/listAnimation';
import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import arrowDownIcon from '../../assets/icons/arrowDownIcon';
import plusIcon from '../../assets/icons/plusIcon';
import editIcon from '../../assets/icons/editIcon';

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
  notEditList?: number[];
  handleEdit?: (val: any) => void;
  handleSelect: (val: any) => void;
};

const Select: FC<SelectProps> = ({
  list,
  label,
  listId,
  topLabel,
  handleAdd,
  handleEdit,
  notEditList,
  isSorting,
  selectIcon,
  handleSelect,
  addLabel = '',
  className = '',
  selectedItem = '',
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

  const getSelectedName = (): ReactNode => {
    if (!label) {
      if (typeof selectedItem === 'object') {
        if (selectedItem.name) {
          return selectedItem.name;
        }
        if (selectedItem.value) {
          return selectedItem.value;
        }
      } else {
        return selectedItem;
      }
    } else {
      if (typeof selectedItem === 'object') {
        if (selectedItem.name) {
          return label + ': ' + selectedItem.name;
        }
        if (selectedItem.value) {
          return label + ': ' + selectedItem.value;
        } else {
          return label;
        }
      } else {
        if (selectedItem) {
          return label + ': ' + selectedItem;
        } else {
          return label;
        }
      }
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
        {!isSorting && !selectIcon && <p>{getSelectedName()}</p>}
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
              <span>
                {typeof item === 'object' ? item.name || item.text : item}
              </span>
              {handleEdit && !notEditList?.includes(index) && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(item);
                  }}
                  className={s.btnEdit}
                >
                  {editIcon}
                </button>
              )}
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
