import s from './Loader.module.scss';
import loaderIcon from '../../assets/icons/loaderIcon';
import { FC } from 'react';

export type loaderType = {
  className?: string;
};

const Loader: FC<loaderType> = ({ className = '' }) => {
  return (
    <div className={s.loader + ' ' + className}>
      <div className={s.loaderIconWrap}>{loaderIcon}</div>
    </div>
  );
};

export default Loader;
