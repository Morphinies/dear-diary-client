import Endpoints from '../endpoints';
import { axiosInstance } from '../instance';

async function updateFile(file: File): Promise<string | undefined> {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const res: any = await axiosInstance.post(
      Endpoints.FILES.UPDATE_FILE,
      formData
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

async function deleteFile(file_name: string): Promise<any | undefined> {
  try {
    const res: any = await axiosInstance.delete(Endpoints.FILES.DELETE_FILE, {
      params: { file_name },
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

const files = {
  updateFile,
  deleteFile,
};

export default files;
