import s from './Input.module.scss';
import { useEffect, useState } from 'react';
import clearIcon from '../../assets/icons/closeIcon';
import dateFromNumb from '../../utils/dateFromNumb';
import datetimeFromNumb from '../../utils/datetimeFromNumb';

type inputType = 'number' | 'text' | 'date' | 'datetime-local';

type InputProps = {
  id: string;
  name?: string;
  unit?: string;
  label?: string;
  type?: inputType;
  className?: string;
  autofocus?: boolean;
  placeholder?: string;
  error?: string | null;
  clearInput?: () => void;
  value: string | number;
  handleChange: (v: string | number) => void;
};

const Input = ({
  id,
  unit,
  name,
  value,
  label,
  error,
  autofocus,
  clearInput,
  placeholder,
  handleChange,
  type = 'text',
  className = '',
}: InputProps) => {
  const [onFocus, setOnFocus] = useState(false);
  const [val, setVal] = useState(value);

  useEffect(() => {
    if (value !== val) {
      setVal(value);
    }
    // eslint-disable-next-line
  }, [value]);

  useEffect(() => {
    if (type === 'date') {
      setVal(dateFromNumb(+value));
    } else if (type === 'datetime-local') {
      setVal(datetimeFromNumb(+value));
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (['date', 'datetime-local'].includes(type)) {
      handleChange(+new Date(val));
    } else if (['number'].includes(type)) {
      handleChange(+val);
    } else {
      handleChange(val);
    }
    // eslint-disable-next-line
  }, [val, type]);

  const getValue = (value: string | number) => {
    // type === 'date' && console.log(type, value, dateFromNumb(+value));
    if (type === 'date' && typeof value === 'number') {
      return dateFromNumb(value);
    } else if (type === 'datetime-local' && typeof value === 'number') {
      return datetimeFromNumb(value);
    } else {
      return value;
    }
  };

  return (
    <div className={s.input + ' ' + className}>
      {label && <label className={s.label}>{label}</label>}
      <div
        className={
          s.inputWrap +
          (!!clearInput ? ' ' + s.withClear : '') +
          (unit ? ' ' + s.withUnit : '') +
          (onFocus ? ' ' + s.focus : '')
        }
      >
        <input
          id={id}
          name={name}
          type={type}
          value={getValue(val)}
          autoFocus={autofocus}
          placeholder={placeholder}
          onBlur={() => setOnFocus(false)}
          onFocus={() => setOnFocus(true)}
          onChange={(e) => setVal(e.target.value)}
        />
        {unit && <p className={s.unit}>{unit}</p>}
        {!!clearInput && (
          <button
            type="button"
            className={s.btnClear}
            onClick={(e) => {
              e.stopPropagation();
              clearInput();
              setVal('');
            }}
          >
            {clearIcon}
          </button>
        )}
      </div>
      {error && (
        <div className={s.errorWrap}>
          <span className={s.error}>{error}</span>
        </div>
      )}
    </div>
  );
};

export default Input;
