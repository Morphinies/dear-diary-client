import s from './ListA.module.scss';
import { AItemType } from '../../types/types';
import delIcon from '../../assets/icons/delIcon';
import editIcon from '../../assets/icons/editIcon';
import Button from '../button/Button';
import dotsHIcon from '../../assets/icons/dotsHIcon';
import checkIcon from '../../assets/icons/checkIcon';
import returnIcon from '../../assets/icons/returnIcon';
import { FC, useEffect, useRef, useState } from 'react';
import { remainingTime } from '../../utils/remainingTime';
import ButtonDraggable from '../button/ButtonDraggable';
import { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';

export type ListAItemType = {
  item: AItemType;
  del: (id: string) => void;
  edit: (id: string) => void;
  provided: DraggableProvided;
  complete?: (id: string) => void;
  snapshot: DraggableStateSnapshot;
};

const ListAItem: FC<ListAItemType> = ({
  del,
  item,
  edit,
  snapshot,
  provided,
  complete,
}) => {
  const itemMenuRef = useRef<null | HTMLDivElement>(null);
  const [itemMenuOpened, setitemMenuOpened] = useState(false);
  useEffect(() => {
    const onClick = (e: any) => {
      if (itemMenuRef.current) {
        if (!itemMenuRef.current.contains(e.target)) {
          setitemMenuOpened(false);
        }
      }
    };
    document.addEventListener('click', (e) => onClick(e));
    return () => document.removeEventListener('click', (e) => onClick(e));
  }, []);

  return (
    <li
      className={s.item}
      data-color-id={item.priority}
      style={{
        boxShadow: snapshot.isDragging
          ? 'rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em,rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em,rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset'
          : 'none',
      }}
    >
      <ButtonDraggable provided={provided} className={s.btnDraggable} />
      <p className={s.text}>{item.text}</p>
      <p
        title="Оставшееся время"
        className={
          s.time +
          ' ' +
          (item.isCompleted
            ? s.completed
            : remainingTime(item.deadline).startsWith('-')
            ? s.expired
            : '')
        }
      >
        {item.isCompleted ? 'Выполнено' : remainingTime(item.deadline)}
      </p>
      <div className={'row ' + s.itemMenu__wrap} ref={itemMenuRef}>
        <div className={s.itemMenu + ' ' + (itemMenuOpened ? s.opened : '')}>
          <Button
            icon={editIcon}
            title="Редактировать"
            className={s.btnEdit}
            handleClick={() => edit(item.id)}
          />
          {complete && (
            <Button
              title={item.isCompleted ? 'Вернуть из архива' : 'В архив'}
              handleClick={() => complete(item.id)}
              className={
                s.btnChecked + ' ' + (item.isCompleted ? s.isCompleted : '')
              }
              icon={item.isCompleted ? returnIcon : checkIcon}
            />
          )}
          <Button
            title="Удалить"
            icon={delIcon}
            className={s.btnDel}
            handleClick={() => del(item.id)}
          />
        </div>
        <Button
          icon={dotsHIcon}
          className={s.btnMenu}
          handleClick={() => setitemMenuOpened((prev) => !prev)}
        ></Button>
      </div>
    </li>
  );
};

export default ListAItem;
