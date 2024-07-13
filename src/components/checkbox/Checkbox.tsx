import checkboxOffIcon from '../../assets/icons/checkboxOffIcon';
import checkboxOnIcon from '../../assets/icons/checkboxOnIcon';
import s from './Checkbox.module.scss';

type CheckboxType = {
  val: boolean;
  title: string;
  setVal: (val: boolean) => void;
};

const Checkbox = ({ val, setVal, title }: CheckboxType) => {
  return (
    <div className={s.checkboxWrap} onClick={() => setVal(!val)}>
      <div className={s.checkbox}>{val ? checkboxOnIcon : checkboxOffIcon}</div>
      {title && <p className={s.title}>{title}</p>}
    </div>
  );
};

export default Checkbox;
