import Endpoints from '../endpoints';
// import { AxiosResponse } from 'axios';
import { axiosInstance } from '../instance';
import { loginDataType, regDataType, resendDataType } from '../../types/types';
// import { AuthResponse } from '../../models/AuthResponse';

async function getUsers() {
  try {
    const res: any = await axiosInstance.get(Endpoints.AUTH.GET_USERS);
    if (res?.data) {
      return res.data;
    } else {
      throw new Error('error');
    }
  } catch (e) {
    console.error(e);
  }
}
// : Promise<AxiosResponse<AuthResponse>>
async function login(loginData: loginDataType) {
  try {
    const res = await axiosInstance.post(Endpoints.AUTH.LOGIN, loginData);
    if (res?.data) {
      return res.data;
    } else {
      return { error: 'Error' };
    }
  } catch (err: any) {
    console.log(err);
    return { error: err?.response?.data?.message || 'Непредвиденная ошибка' };
  }
}

async function logout() {
  try {
    const res: any = await axiosInstance.post(Endpoints.AUTH.LOGOUT);
    if (res?.data) {
      return res.data;
    } else {
      return { error: 'Error' };
    }
  } catch (err: any) {
    // console.log(err);
    return { error: err?.response?.data?.message || 'Непредвиденная ошибка' };
  }
}

async function registration(regData: regDataType) {
  try {
    const res: any = await axiosInstance.post(Endpoints.AUTH.REGISTR, regData);
    if (res?.data) {
      return res.data;
    } else {
      return { error: 'Error' };
    }
  } catch (err: any) {
    return { error: err?.response?.data?.message || 'Непредвиденная ошибка' };
  }
}

async function resendLink(resendData: resendDataType) {
  try {
    const res: any = await axiosInstance.post(
      Endpoints.AUTH.RESEND_LINK,
      resendData
    );
    if (res?.data) {
      return res.data;
    } else {
      return { error: 'Error' };
    }
  } catch (err: any) {
    return { error: err?.response?.data?.message || 'Непредвиденная ошибка' };
  }
}

async function checkAuth() {
  try {
    const userData = await axiosInstance.get(Endpoints.AUTH.CHECK_AUTH);
    if (userData.data) {
      return userData.data;
    } else {
      throw new Error('check auth fail');
    }
  } catch (err: any) {
    // console.error(err);
    return { message: err.message };
  }
}

async function refreshToken() {
  return await axiosInstance.get(Endpoints.AUTH.REFRESH);
}

const auth = {
  login,
  logout,
  getUsers,
  checkAuth,
  resendLink,
  refreshToken,
  registration,
};

export default auth;
