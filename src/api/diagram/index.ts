import {
  DiagramDataItemType,
  DiagramDataEditItemType,
} from '../../types/types';
import Endpoints from '../endpoints';
import { axiosInstance } from '../instance';

// categories
async function getCategoryList(chapterId: string): Promise<any[] | undefined> {
  try {
    const res: any = await axiosInstance.get(
      Endpoints.DIAGRAM.GET_CATEGORY_LIST,
      {
        params: {
          chapterId: chapterId,
        },
      }
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

async function editCategory(category: {
  name: string;
  chapterId: string;
  id: string | undefined;
}): Promise<any | undefined> {
  try {
    const res: any = await axiosInstance.post(
      Endpoints.DIAGRAM.EDIT_CATEGORY,
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

async function delCategory(id: string): Promise<any | undefined> {
  try {
    const res: any = await axiosInstance.delete(
      Endpoints.DIAGRAM.DEL_CATEGORY,
      { params: { id } }
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

// chapters

async function getChapterList(menuId: string): Promise<any[] | undefined> {
  try {
    const res: any = await axiosInstance.get(
      Endpoints.DIAGRAM.GET_CHAPTER_LIST,
      { params: { menuId } }
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

async function editChapter(chapter: {
  name: string;
  menuId: string;
  id: string | undefined;
}): Promise<any | undefined> {
  try {
    const res: any = await axiosInstance.post(
      Endpoints.DIAGRAM.EDIT_CHAPTER,
      chapter
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

async function delChapter(id: string): Promise<any | undefined> {
  try {
    const res: any = await axiosInstance.delete(Endpoints.DIAGRAM.DEL_CHAPTER, {
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

// data

async function getDataList(
  chapterId: string,
  categoryId: string
): Promise<DiagramDataItemType[] | undefined> {
  try {
    const res: any = await axiosInstance.get(Endpoints.DIAGRAM.GET_DATA_LIST, {
      params: {
        categoryId,
        chapterId,
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

async function editDataItem(
  dataItem: DiagramDataEditItemType
): Promise<DiagramDataItemType | undefined> {
  try {
    const res: any = await axiosInstance.post(
      Endpoints.DIAGRAM.EDIT_DATA_ITEM,
      dataItem
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

async function delDataItem(id: string): Promise<any | undefined> {
  try {
    const res: any = await axiosInstance.delete(
      Endpoints.DIAGRAM.DEL_DATA_ITEM,
      {
        params: {
          id,
        },
      }
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

const diagram = {
  getCategoryList,
  editCategory,
  delCategory,

  editDataItem,
  delDataItem,
  getDataList,

  delChapter,
  editChapter,
  getChapterList,
};

export default diagram;
