import s from './Select.module.scss';
import listAnimation from '../../utils/listAnimation';
import { FC, useEffect, useRef, useState } from 'react';
import arrowDownIcon from '../../assets/icons/arrowDownIcon';

type SelectProps = {
  list: any[];
  title?: string;
  listId: string;
  selectedItem: any;
  className?: string;
  listClassName?: string;
  handleSelect: (val: any) => void;
};

const SelectBlock: FC<SelectProps> = ({
  list,
  title,
  listId,
  selectedItem,
  handleSelect,
  className = '',
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
        s.selectBlock + (isOpened ? ' ' + s.opened : '') + ' ' + className
      }
      ref={selectRef}
    >
      <button
        title={title}
        className={s.selected + ' ' + s.icon}
        onClick={() => setIsOpened((prev) => !prev)}
      >
        {selectedItem.icon || ''}
        <i className={s.arrow}>{arrowDownIcon}</i>
      </button>
      <div className={s.listWrap + ' ' + listClassName} id={`list_${listId}`}>
        <ul className={s.list}>
          {list.map((item, index) => (
            <li
              key={index}
              title={item.title}
              className={s.item + ' ' + activeItemClass(item) + ' ' + s.icon}
              onClick={() => {
                handleSelect(item);
                setIsOpened(false);
              }}
            >
              {item.icon}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SelectBlock;
