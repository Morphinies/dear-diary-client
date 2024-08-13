import Endpoints from '../endpoints';
import { axiosInstance } from '../instance';
import { ListItemType, ListItemEditType } from '../../types/types';

async function getList(menuId: string): Promise<ListItemType[] | undefined> {
  try {
    const res: any = await axiosInstance.get(Endpoints.LIST.GET_LIST, {
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
  data: ListItemEditType
): Promise<ListItemType | undefined> {
  try {
    const res: any = await axiosInstance.post(Endpoints.LIST.UPDATE_ITEM, data);
    if (res && res.data) {
      return res.data;
    } else {
      throw new Error('error');
    }
  } catch (e) {
    console.log(e);
  }
}

async function complete(id: string): Promise<string | undefined> {
  try {
    const res: any = await axiosInstance.post(Endpoints.LIST.COMPLETE_ITEM, {
      id,
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

async function updateSort(
  item: ListItemType
): Promise<ListItemType[] | undefined> {
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
    const res: any = await axiosInstance.delete(Endpoints.LIST.DELETE_ITEM, {
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

const list = {
  del,
  update,
  getList,
  complete,
  updateSort,
};

export default list;
