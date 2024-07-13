import {
  finTransType,
  finTransDataType,
  // finTransTypeType,
  finTransCategoryType,
} from '../../types/types';
import Endpoints from '../endpoints';
import { axiosInstance } from '../instance';

async function getCategoryList(): Promise<finTransCategoryType[] | undefined> {
  try {
    const res: any = await axiosInstance.get(
      Endpoints.FINANCE.GET_CATEGORY_LIST
    );
    if (res && res.data) {
      return res.data;
    } else {
      throw new Error('error');
    }
  } catch (e) {
    console.log(e);
  }
}

async function addCategory(category: {
  name: string;
  type: number;
}): Promise<finTransCategoryType | undefined> {
  try {
    const res: any = await axiosInstance.post(
      Endpoints.FINANCE.ADD_CATEGORY,
      category
    );
    if (res && res.data) {
      return res.data;
    } else {
      throw new Error('error');
    }
  } catch (e) {
    console.log(e);
  }
}

async function delCategory(dataId: { id: string }): Promise<any | undefined> {
  try {
    const res: any = await axiosInstance.post(
      Endpoints.FINANCE.DEL_CATEGORY,
      dataId
    );
    if (res && res.data) {
      return res.data;
    } else {
      throw new Error('error');
    }
  } catch (e) {
    console.log(e);
  }
}

async function getFinTransactionList(): Promise<finTransType[] | undefined> {
  try {
    const res: any = await axiosInstance.get(
      Endpoints.FINANCE.GET_TRANSACTION_LIST
    );
    if (res && res.data) {
      return res.data;
    } else {
      throw new Error('error');
    }
  } catch (e) {
    console.log(e);
  }
}

async function addFinTransaction(
  operation: finTransDataType | finTransType
): Promise<finTransType | undefined> {
  try {
    const res: any = await axiosInstance.post(
      Endpoints.FINANCE.ADD_TRANSACTION,
      operation
    );
    if (res && res.data) {
      return res.data;
    } else {
      throw new Error('error');
    }
  } catch (e) {
    console.log(e);
  }
}

async function delFinTransaction(dataId: {
  id: string;
}): Promise<any | undefined> {
  try {
    const res: any = await axiosInstance.post(
      Endpoints.FINANCE.DEL_TRANSACTION,
      dataId
    );
    if (res && res.data) {
      return res.data;
    } else {
      throw new Error('error');
    }
  } catch (e) {
    console.log(e);
  }
}

const notes = {
  addCategory,
  delCategory,
  getCategoryList,
  addFinTransaction,
  delFinTransaction,
  getFinTransactionList,
};

export default notes;
