import {
  CalendarTaskType,
  CalendarEditTaskType,
  ErrorType,
} from '../../types/types';
import Endpoints from '../endpoints';
import { axiosInstance } from '../instance';

async function getData(menuId: string): Promise<any | undefined> {
  try {
    const res: any = await axiosInstance.get(Endpoints.CALENDAR.GET_DATA, {
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

async function update(data: any): Promise<any | undefined> {
  try {
    const res: any = await axiosInstance.post(Endpoints.CALENDAR.UPDATE, data);
    if (res && res.data) {
      return res.data;
    } else {
      throw new Error('error');
    }
  } catch (e) {
    return { error: (e as Error).message };
  }
}

async function del(id: string): Promise<string | ErrorType> {
  try {
    const res: any = await axiosInstance.delete(Endpoints.CALENDAR.DEL, {
      params: { id },
    });
    if (res && res.data) {
      return res.data;
    } else {
      throw new Error('error');
    }
  } catch (e) {
    console.log(e);
    return { error: (e as Error).message };
  }
}

async function updateDay(data: any): Promise<any | undefined> {
  try {
    const res: any = await axiosInstance.post(
      Endpoints.CALENDAR.UPDATE_DAY,
      data
    );
    if (res && res.data) {
      return res.data;
    } else {
      throw new Error('error');
    }
  } catch (e) {
    return { error: (e as Error).message };
  }
}

async function updateDayTask(
  data: CalendarEditTaskType
): Promise<CalendarTaskType | ErrorType> {
  try {
    const res: any = await axiosInstance.post(
      Endpoints.CALENDAR.UPDATE_DAY_TASK,
      data
    );
    if (res && res.data) {
      return res.data;
    } else {
      throw new Error('error');
    }
  } catch (e) {
    return { error: (e as Error).message };
  }
}

async function deleteDayTask(id: string): Promise<string | ErrorType> {
  try {
    const res: any = await axiosInstance.delete(
      Endpoints.CALENDAR.UPDATE_DAY_TASK,
      { params: { id } }
    );
    if (res && res.data) {
      return res.data;
    } else {
      throw new Error('error');
    }
  } catch (e) {
    return { error: (e as Error).message };
  }
}

const calendar = {
  del,
  update,
  getData,
  updateDay,
  updateDayTask,
  deleteDayTask,
};

export default calendar;
