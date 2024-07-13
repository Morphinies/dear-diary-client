import Endpoints from '../endpoints';
import { axiosInstance } from '../instance';
import { SListItemEditType, SListItemType } from '../../types/types';

async function getList(menuId: string): Promise<SListItemType[] | undefined> {
  try {
    const res: any = await axiosInstance.get(Endpoints.S_LIST.GET_LIST, {
      params: { menuId },
    });
    if (res && res.data) {
      return res.data;
    } else {
      throw new Error('error');
    }
  } catch (e) {
    console.log(e);
  }
}

async function update(
  data: SListItemEditType
): Promise<SListItemType | undefined> {
  try {
    const res: any = await axiosInstance.post(
      Endpoints.S_LIST.UPDATE_ITEM,
      data
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

async function updateSort(
  item: SListItemType
): Promise<SListItemType[] | undefined> {
  try {
    const res: any = await axiosInstance.post(
      Endpoints.LIST.UPDATE_ITEM_SORT,
      item
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

async function del(item_id: string): Promise<string | undefined> {
  try {
    const res: any = await axiosInstance.delete(Endpoints.S_LIST.DELETE_ITEM, {
      params: { item_id },
    });
    if (res && res.data) {
      return res.data;
    } else {
      throw new Error('error');
    }
  } catch (e) {
    console.log(e);
  }
}

const sList = {
  del,
  update,
  getList,
  updateSort,
};

export default sList;
