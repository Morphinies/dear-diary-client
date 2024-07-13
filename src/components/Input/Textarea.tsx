import { FC, useState } from 'react';
import s from './Input.module.scss';
import clearIcon from '../../assets/icons/closeIcon';

type TextareaProps = {
  id: string;
  name?: string;
  type?: string;
  value: string;
  label?: string;
  error?: string;
  className?: string;
  placeholder?: string;
  clearInput?: () => void;
  handleChange: (v: string) => void;
};

const Textarea: FC<TextareaProps> = ({
  id,
  name,
  error,
  value,
  label,
  clearInput,
  placeholder,
  handleChange,
  className = '',
}) => {
  const [onFocus, setOnFocus] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleChange(e.target.value);
  };

  return (
    <div className={s.textarea + ' ' + className}>
      {label && <label className={s.label}>{label}</label>}
      <div
        className={
          s.textareaWrap +
          (!!clearInput ? ' ' + s.withClear : '') +
          (onFocus ? ' ' + s.focus : '')
        }
      >
        <textarea
          id={id}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e)}
          onFocus={() => setOnFocus(true)}
          onBlur={() => setOnFocus(false)}
        ></textarea>
        {error && (
          <div className={s.errorWrap}>
            <span className={s.error}>{error}</span>
          </div>
        )}
        {!!clearInput && (
          <button
            type="button"
            className={s.btnClear}
            onClick={(e) => {
              e.stopPropagation();
              clearInput();
            }}
          >
            {clearIcon}
          </button>
        )}
      </div>
    </div>
  );
};

export default Textarea;
