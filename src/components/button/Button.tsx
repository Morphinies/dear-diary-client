import React, { FC } from 'react';
import s from './Button.module.scss';

type buttonType = {
  id?: string;
  btnRef?: any;
  text?: string;
  title?: string;
  icon?: JSX.Element;
  disabled?: boolean;
  className?: string;
  type?: 'light' | 'dark';
  handleClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

const Button: FC<buttonType> = ({
  id,
  icon,
  text,
  title,
  btnRef,
  className,
  handleClick,
  type = 'light',
  disabled = false,
}) => {
  const classBtnDark = () => {
    return type === 'dark' ? ' ' + s.dark : '';
  };

  const classBtnWithIcon = () => {
    return icon ? ' ' + s.withIcon : '';
  };

  return (
    <button
      id={id}
      ref={btnRef}
      title={title ?? ''}
      disabled={disabled}
      onClick={(e) => {
        handleClick && e.stopPropagation();
        handleClick && handleClick(e);
      }}
      className={s.btn + classBtnWithIcon() + classBtnDark() + ' ' + className}
    >
      {icon ?? ''}
      {text ?? ''}
    </button>
  );
};

export default Button;
