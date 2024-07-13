import s from './Auth.module.scss';
import { useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Popup from '../../components/popup/Popup';
import Input from '../../components/Input/Input';
import { getThemes } from '../../utils/getThemes';
import { useAppSelector } from '../../hooks/hooks';
import Button from '../../components/button/Button';
import verification from '../../utils/verification';
import Switcher from '../../components/switcher/Switcher';
import {
  login,
  checkAuth,
  registration,
  resendLink,
} from '../../store/auth/actionCreators';

const Auth = () => {
  const checkerTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const regSlice = useAppSelector((state) => state.reg);
  const userSlice = useAppSelector((state) => state.user);
  const loginSlice = useAppSelector((state) => state.login);
  const [chapters] = useState(['Вход', 'Регистрация']);
  const [activeChapter, setActiveChapter] = useState<'Вход' | 'Регистрация'>(
    'Вход'
  );
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [regData, setRegData] = useState({
    email: '',
    password: '',
  });
  const [loginErrors, setLoginErrors] = useState({
    email: '',
    password: '',
    req: '',
  });
  const [regErrors, setRegErrors] = useState({
    email: '',
    password: '',
    req: '',
  });

  useEffect(() => {
    if (loginSlice.error) {
      if (loginSlice.error === 'not activated') {
        dispatch(resendLink({ email: loginData.email }));
        // setActiveChapter('Регистрация');
      }
      setLoginErrors((prev) => ({ ...prev, req: loginSlice.error }));
    }
    // eslint-disable-next-line
  }, [loginSlice]);

  useEffect(() => {
    if (userSlice.isActivated) {
      checkerTimer.current && clearTimeout(checkerTimer.current);
      navigate('/');
    }
    // eslint-disable-next-line
  }, [userSlice]);

  const checkConfirm = () => {
    dispatch(checkAuth());
    checkerTimer.current = setTimeout(() => {
      checkConfirm();
    }, 5000);
  };

  useEffect(() => {
    if (regSlice.error) {
      setRegErrors((prev) => ({ ...prev, req: regSlice.error }));
    }
    if (regSlice.waitingConfirm) {
      checkConfirm();
    }
    // eslint-disable-next-line
  }, [regSlice]);

  useEffect(() => {
    getThemes();
    dispatch(checkAuth());
    // eslint-disable-next-line
  }, []);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let errorsCount = 0;
    const emailErr = verification(loginData.email, ['length4']);
    const passwordErr = verification(loginData.password, ['length4']);
    if (emailErr || passwordErr) {
      setLoginErrors((prev) => ({
        ...prev,
        email: emailErr,
        password: passwordErr,
      }));
      errorsCount += 1;
    }
    if (errorsCount === 0) {
      dispatch(login(loginData));
    }
  };

  const handleRegistration = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRegErrors((prev) => ({
      ...prev,
      req: '',
    }));
    let errorsCount = 0;
    const emailErr = verification(regData.email, ['length4']);
    const passwordErr = verification(regData.password, ['length4']);
    if (emailErr || passwordErr) {
      setRegErrors((prev) => ({
        ...prev,
        email: emailErr,
        password: passwordErr,
      }));
      errorsCount += 1;
    }
    if (errorsCount === 0) {
      console.log('regData', regData);
      dispatch(registration(regData));
    }
  };

  const handleChangeLoginData = (key: string, val: string) => {
    setLoginErrors((prev) => ({ ...prev, [key]: '', req: '' }));
    setLoginData((prev) => ({ ...prev, [key]: val }));
  };

  const handleChangeRegData = (key: string, val: string) => {
    setRegErrors((prev) => ({ ...prev, [key]: '', req: '' }));
    setRegData((prev) => ({ ...prev, [key]: val }));
  };

  return (
    <div className={s.auth}>
      <Popup
        windowClass={s.popupWindow}
        title={regSlice.waitingConfirm ? 'Подтверждение почты' : ''}
      >
        {!regSlice.waitingConfirm ? (
          <>
            <Switcher
              list={chapters}
              activeItem={activeChapter}
              handleActive={(chapt) => setActiveChapter(chapt)}
            />
            {activeChapter === 'Вход' && (
              <form className={s.form} onSubmit={handleLogin}>
                <Input
                  id="loginemail"
                  value={loginData.email}
                  error={loginErrors.email}
                  placeholder="Почта"
                  handleChange={(val) =>
                    handleChangeLoginData('email', String(val))
                  }
                />
                <Input
                  id="loginPassword"
                  placeholder="Пароль"
                  value={loginData.password}
                  error={loginErrors.password}
                  handleChange={(val) =>
                    handleChangeLoginData('password', String(val))
                  }
                />
                <div className={s.btnSubmitWrap}>
                  <span className={s.error}>{loginErrors.req}</span>
                  <Button text="Войти" className={s.btnSubmit} />
                </div>
              </form>
            )}
            {activeChapter === 'Регистрация' && (
              //
              <form className={s.form} onSubmit={handleRegistration}>
                <Input
                  id="regemail"
                  value={regData.email}
                  error={regErrors.email}
                  placeholder="Почта"
                  handleChange={(val) =>
                    handleChangeRegData('email', String(val))
                  }
                />
                <Input
                  id="regPassword"
                  placeholder="Пароль"
                  value={regData.password}
                  error={regErrors.password}
                  handleChange={(val) =>
                    handleChangeRegData('password', String(val))
                  }
                />
                <div className={s.btnSubmitWrap}>
                  <span className={s.error}>{regErrors.req}</span>
                  <Button text="Зарегистрироваться" className={s.btnSubmit} />
                </div>
              </form>
            )}
          </>
        ) : (
          <p className={s.confirmMes}>
            На почту {regData.email || loginData.email} отправлена ссылка для
            активации аккаунта.
            <br /> Перейдите по ссылке чтобы активировать аккаунт.
          </p>
        )}
      </Popup>
    </div>
  );
};

export default Auth;
