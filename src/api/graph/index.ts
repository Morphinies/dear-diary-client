import { GraphDataItemType, GraphDataEditItemType } from '../../types/types';
import Endpoints from '../endpoints';
import { axiosInstance } from '../instance';

// chapters

async function getChapterList(menuId: string): Promise<any[] | undefined> {
  try {
    const res: any = await axiosInstance.get(Endpoints.GRAPH.GET_CHAPTER_LIST, {
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

async function editChapter(chapter: {
  name: string;
  menuId: string;
  id: string | undefined;
}): Promise<any | undefined> {
  try {
    const res: any = await axiosInstance.post(
      Endpoints.GRAPH.EDIT_CHAPTER,
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
    const res: any = await axiosInstance.delete(Endpoints.GRAPH.DEL_CHAPTER, {
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
  chapterId: string
): Promise<GraphDataItemType[] | undefined> {
  try {
    const res: any = await axiosInstance.get(Endpoints.GRAPH.GET_DATA_LIST, {
      params: {
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
  dataItem: GraphDataEditItemType
): Promise<GraphDataItemType | undefined> {
  try {
    const res: any = await axiosInstance.post(
      Endpoints.GRAPH.EDIT_DATA_ITEM,
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
    const res: any = await axiosInstance.delete(Endpoints.GRAPH.DEL_DATA_ITEM, {
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

const graph = {
  editDataItem,
  delDataItem,
  getDataList,

  delChapter,
  editChapter,
  getChapterList,
};

export default graph;
