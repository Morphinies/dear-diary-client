import api from '../../api';
import { isTokenExpired } from '../../utils/jwt';
import { userSet, userDelete, userLoading } from './userSlice';
import { loginDataType, regDataType, resendDataType } from '../../types/types';
import { regClear, regFailure, regLoading, regSuccess } from './regSlice';
import { loginFailure, loginLoading, loginSuccess } from './loginSlice';

export const login = (loginData: loginDataType) => async (dispatch: any) => {
  dispatch(loginLoading());
  const res = await api.auth.login(loginData);
  if (res.data?.user) {
    if (res.data.user.isActivated) {
      localStorage.setItem('accessToken', res.data.accessToken);
      dispatch(userSet(res.data.user));
      dispatch(loginSuccess());
    } else {
      // dispatch(userSet(res.data.user));
      dispatch(loginFailure('not activated'));
    }
  } else {
    dispatch(loginFailure(res.error));
  }
};

export const logout = () => async (dispatch: any) => {
  const res = await api.auth.logout();
  if (res) {
    localStorage.removeItem('accessToken');
    dispatch(userDelete());
    dispatch(regClear());
  }
};

export const registration = (regData: regDataType) => async (dispatch: any) => {
  dispatch(regLoading());
  const res = await api.auth.registration(regData);
  if (res.data) {
    dispatch(regSuccess());
  } else {
    dispatch(regFailure(res.error));
  }
};

export const resendLink =
  (resendData: resendDataType) => async (dispatch: any) => {
    dispatch(regLoading());
    const res = await api.auth.resendLink(resendData);
    if (res.data) {
      dispatch(regSuccess());
    } else {
      dispatch(regFailure(res.error));
    }
  };

export const checkAuth = () => async (dispatch: any) => {
  dispatch(userLoading());
  const userData = await api.auth.checkAuth();
  if (userData) {
    dispatch(userSet(userData));
  } else {
    console.log('Пользователь не авторизован');
    dispatch(userDelete());
  }
};

let refreshTokenRequest: any;
export const getAccessToken =
  () =>
  async (dispatch: any): Promise<string> => {
    try {
      let accessToken = localStorage.getItem('accessToken');
      if (accessToken && isTokenExpired(accessToken) && !refreshTokenRequest) {
        refreshTokenRequest = await api.auth.refreshToken();
        if (refreshTokenRequest.data) {
          // dispatch(userSet(refreshTokenRequest.data.user));
          dispatch(loginSuccess());
          const jwt = refreshTokenRequest.data.accessToken;
          refreshTokenRequest = undefined;
          accessToken = jwt;
          localStorage.setItem('accessToken', jwt);
        } else {
          throw new Error();
        }
      }
      if (accessToken) {
        return accessToken;
      } else {
        throw new Error();
      }
    } catch (err) {
      // console.error(err);
      logout();
      return '';
    }
  };
