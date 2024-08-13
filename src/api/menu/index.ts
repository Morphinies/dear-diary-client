import api from '..';
import Endpoints from '../endpoints';
import { axiosInstance } from '../instance';
import { MenuItemEditType, MenuItemType } from '../../types/types';

async function getList(typeId?: number): Promise<MenuItemType[] | undefined> {
  try {
    const res: any = await axiosInstance.get(Endpoints.MENU.GET_LIST, {
      params: {
        typeId,
      },
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

async function getItem(id: string): Promise<MenuItemType | undefined> {
  try {
    const res: any = await axiosInstance.get(Endpoints.MENU.GET_ITEM, {
      params: {
        id,
      },
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
  data: MenuItemEditType,
  oldIconName?: string | null
): Promise<any> {
  try {
    if (
      (!data.icon || (data.icon && typeof data.icon === 'object')) &&
      oldIconName
    ) {
      const imgIsDeleted = await api.files.deleteFile(oldIconName.slice(15));
      if (!imgIsDeleted) {
        throw new Error('error deleting icon');
      }
    }
    if (data.icon && typeof data.icon === 'object') {
      const updatedImgUrl = await api.files.updateFile(data.icon);
      if (updatedImgUrl) {
        data.icon = updatedImgUrl;
      } else {
        throw new Error('error updating icon');
      }
    }
    const res: any = await axiosInstance.post(Endpoints.MENU.UPDATE, data);
    if (res && res.data) {
      return res.data;
    } else {
      throw new Error('error');
    }
  } catch (e) {
    console.log(e);
  }
}

async function del(id: string): Promise<any> {
  try {
    const res: any = await axiosInstance.delete(Endpoints.MENU.UPDATE, {
      params: {
        id: id,
      },
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

const menu = {
  getList,
  getItem,
  update,
  del,
};

export default menu;
