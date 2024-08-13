import s from './Popup.module.scss';
import Button from '../button/Button';
import okIcon from '../../assets/icons/okIcon';
import delIcon from '../../assets/icons/delIcon';
import backIcon from '../../assets/icons/backIcon';
import closeIcon from '../../assets/icons/closeIcon';
import { FC, ReactNode, useEffect, useRef } from 'react';
import Loader from '../loader/Loader';

type PopupProps = {
  title?: string;
  ok?: () => void;
  message?: string;
  del?: () => void;
  back?: () => void;
  loading?: boolean;
  close?: () => void;
  children: ReactNode;
  windowClass?: string;
  contentClass?: string;
};

const Popup: FC<PopupProps> = ({
  ok,
  del,
  back,
  close,
  message,
  loading,
  children,
  title = '',
  windowClass = '',
  contentClass = '',
}) => {
  const popupRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    const html = document.querySelector('html');
    if (!html) return;
    html.style.overflowY = 'hidden';
    return () => {
      // body.style.maxHeight = 'none';
      html.style.overflowY = 'scroll';
    };
  }, []);

  useEffect(() => {
    if (!close) return;
    const onClick = (e: any) => {
      if (popupRef.current) {
        if (!popupRef.current.contains(e.target)) {
          close();
        }
      }
    };
    setTimeout(() => {
      document.addEventListener('click', onClick);
    }, 100);
    return () => document.removeEventListener('click', onClick);
  }, [close]);

  return (
    <div className={s.popup + ' popup ' + (loading ? s.loading : '')}>
      <div
        ref={popupRef}
        className={
          s.window + ' ' + windowClass + ' ' + (message ? s.withMes : '')
        }
      >
        <div className={s.header}>
          <h2>{title}</h2>
          <div className={s.btns}>
            {del && (
              <Button icon={delIcon} handleClick={del} className={s.delBtn} />
            )}
            {back && (
              <Button
                icon={backIcon}
                handleClick={back}
                className={s.backBtn}
              />
            )}
            {ok && <Button icon={okIcon} handleClick={ok} />}
            {close && <Button icon={closeIcon} handleClick={close} />}
          </div>
        </div>
        <div className={s.content + ' ' + contentClass}>{children}</div>
        {message && (
          <div className={s.messageWrap}>
            <p>{message}</p>
          </div>
        )}
        {loading && <Loader />}
      </div>
    </div>
  );
};

export default Popup;
