import { dayNotesType, editedNoteType, noteType } from '../../types/types';
import Endpoints from '../endpoints';
import { axiosInstance } from '../instance';

type updateNotesPropsType = {
  notes: string[];
  date: number;
};

async function getDayNotes(date: number): Promise<string[] | undefined> {
  try {
    const res: any = await axiosInstance.get(
      Endpoints.NOTES.GET_DAY_NOTES + '?date=' + date
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

async function getMonthNotes(
  date: number
): Promise<dayNotesType[] | undefined> {
  try {
    const res: any = await axiosInstance.get(
      Endpoints.NOTES.GET_MONTH_NOTES + '?date=' + date
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

async function updateCalendarNotes(
  params: updateNotesPropsType
): Promise<any[] | undefined> {
  try {
    const res: any = await axiosInstance.post(
      Endpoints.NOTES.EDIT_DAY_NOTES,
      params
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

async function getNoteList(): Promise<noteType[] | undefined> {
  try {
    const res: any = await axiosInstance.get(Endpoints.NOTES.GET_NOTE_LIST);
    if (res && res.data) {
      return res.data;
    } else {
      throw new Error('error');
    }
  } catch (e) {
    console.log(e);
  }
}

async function updateNote(note: editedNoteType): Promise<noteType | undefined> {
  try {
    const res: any = await axiosInstance.post(
      Endpoints.NOTES.UPDATE_NOTE,
      note
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

async function delNote(dataId: { id: string }): Promise<any | undefined> {
  try {
    const res: any = await axiosInstance.post(Endpoints.NOTES.DEL_NOTE, dataId);
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
  getNoteList,
  updateNote,
  delNote,
  //
  getDayNotes,
  getMonthNotes,
  updateCalendarNotes,
};

export default notes;
