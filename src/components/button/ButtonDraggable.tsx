import { FC } from 'react';
import s from './Button.module.scss';
import { DraggableProvided } from 'react-beautiful-dnd';
import dotsDragIcon from '../../assets/icons/dotsDragIcon';

export type ButtonDraggableProps = {
  provided: DraggableProvided;
  className?: string;
};

const ButtonDraggable: FC<ButtonDraggableProps> = ({
  provided,
  className = '',
}) => {
  return (
    <button
      className={s.btnDraggable + ' ' + className}
      {...provided.dragHandleProps}
    >
      {dotsDragIcon}
    </button>
  );
};

export default ButtonDraggable;
