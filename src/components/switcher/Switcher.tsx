import { FC } from 'react';
import s from './Switcher.module.scss';

type SwitcherType = {
  list: any[];
  activeItem: any;
  type?: 'std' | 'mini';
  handleActive: (val: any) => void;
};

const Switcher: FC<SwitcherType> = ({
  list,
  activeItem,
  handleActive,
  type = 'std',
}) => {
  const activeClass = (item: any) => {
    if (
      (item.id && activeItem.id === item.id) ||
      (item._id && activeItem._id === item._id) ||
      ((!item._id || !item.id) && activeItem === item)
    ) {
      return ' ' + s.active;
    } else return '';
  };

  return (
    <div className={s.switcher + ' ' + s[type]}>
      {list.map((item, i) => (
        <button
          key={i}
          onClick={() => handleActive(item)}
          className={s.item + activeClass(item)}
        >
          {item.id || item._id ? item.name ?? ' ' : item}
        </button>
      ))}
    </div>
  );
};

export default Switcher;
