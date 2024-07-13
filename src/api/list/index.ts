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
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ old

// async function getListsList(): Promise<ListPageType[] | undefined> {
//   try {
//     const res: any = await axiosInstance.get(Endpoints.LIST.GET_LISTS_LIST);
//     if (res && res.data) {
//       return res.data;
//     } else {
//       throw new Error('error');
//     }
//   } catch (e) {
//     console.log(e);
//   }
// }

// async function updateList(
//   data: dataUpdateListPageType,
//   oldIconName?: string | null
// ): Promise<ListPageType | undefined> {
//   try {
//     if (
//       (!data.icon || (data.icon && typeof data.icon === 'object')) &&
//       oldIconName
//     ) {
//       const imgIsDeleted = await api.files.deleteFile(oldIconName.slice(15));
//       if (!imgIsDeleted) {
//         throw new Error('error deleting icon');
//       }
//     }
//     if (data.icon && typeof data.icon === 'object') {
//       const updatedImgUrl = await api.files.updateFile(data.icon);
//       if (updatedImgUrl) {
//         data.icon = updatedImgUrl;
//       } else {
//         throw new Error('error updating icon');
//       }
//     }
//     const res: any = await axiosInstance.post(
//       Endpoints.LIST.UPDATE_LIST,
//       data
//     );
//     if (res && res.data) {
//       return res.data;
//     } else {
//       throw new Error('error');
//     }
//   } catch (e) {
//     console.log(e);
//   }
// }

// async function deleteList(list_id: string): Promise<string | undefined> {
//   try {
//     const res: any = await axiosInstance.delete(Endpoints.LIST.DELETE_LIST, {
//       params: { list_id },
//     });
//     if (res && res.data) {
//       return res.data;
//     } else {
//       throw new Error('error');
//     }
//   } catch (e) {
//     console.log(e);
//   }
// }

// async function getItems(list_id: string) {
//   try {
//     const res: any = await axiosInstance.get(Endpoints.LIST.GET_ITEMS_LIST, {
//       params: { list_id },
//     });
//     if (res && res.data) {
//       return res.data;
//     } else {
//       throw new Error('error');
//     }
//   } catch (e) {
//     console.log(e);
//   }
// }

const list = {
  del,
  update,
  getList,
  updateSort,
  // old
  // getItems,
  // deleteList,
  // updateList,
  // getListsList,
};

export default list;
