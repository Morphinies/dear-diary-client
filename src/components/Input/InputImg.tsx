import { useEffect, useState } from 'react';
import s from './Input.module.scss';
import plusIcon from '../../assets/icons/plusIcon';
import delIcon from '../../assets/icons/delIcon';

type InputImgType = {
  label?: string;
  disabled?: boolean;
  type?: 'img' | 'icon';
  img: string | null | File;
  setImg: (val: any) => void;
};

const InputImg = ({
  img,
  label,
  setImg,
  type = 'img',
  disabled = false,
}: InputImgType) => {
  const [src, setSrc] = useState<string>();

  useEffect(() => {
    if (img) {
      if (typeof img === 'string') {
        setSrc(process.env.REACT_APP_API_URI + img);
      } else {
        let url = window.URL.createObjectURL(img);
        setSrc(url);
      }
    } else {
      setSrc(undefined);
    }
  }, [img]);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!e.target.files) return;
    const file = e?.target?.files[0];
    if (file) {
      setImg(file);
    } else {
      console.log('Не удалось загрузить изображение');
    }
    e.target.value = '';
  };

  const delImg = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setImg(null);
  };

  return (
    <div className={s.inputImgWrap + ' ' + (!src ? s.empty : '')}>
      {label && <span className={s.title}>{label}</span>}
      <label title={src ? 'Сменить изображение' : 'Загрузить изображение'}>
        <input
          name="img"
          type="file"
          disabled={disabled}
          onChange={handleChange}
          accept={type === 'icon' ? '.svg, .png' : 'image/*'}
        />
        {!src ? plusIcon : <img alt="Изображение" src={src} />}
        {src && (
          <button onClick={delImg} className={s.btnDel}>
            {delIcon}
          </button>
        )}
      </label>
    </div>
  );
};

export default InputImg;
