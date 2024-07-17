import { useEffect } from 'react';
import s from './Main.module.scss';
import { useDispatch } from 'react-redux';
import { getThemes } from '../../utils/getThemes';
import { useAppSelector } from '../../hooks/hooks';
import Header from '../../components/header/Header';
import { Outlet, useNavigate } from 'react-router-dom';
import { checkAuth } from '../../store/auth/actionCreators';

const Main = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isActivated, loading } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (!isActivated && !loading) {
      navigate('/auth');
    }
    // eslint-disable-next-line
  }, [isActivated, loading]);

  useEffect(() => {
    !isActivated && dispatch(checkAuth());
    getThemes();
    // eslint-disable-next-line
  }, []);

  return <div className={s.main}>{isActivated && <Outlet />}</div>;
};

export default Main;
