import api from '../../../api';
import s from '../Graph.module.scss';
import { FC, useState } from 'react';
import Input from '../../../components/Input/Input';
import Popup from '../../../components/popup/Popup';
import Button from '../../../components/button/Button';

type GraphPopupChapterType = {
  menuId: string;
  editChapter: any;
  close: () => void;
  updateChapterList: (val: any, key: string) => void;
};

const GraphPopupChapter: FC<GraphPopupChapterType> = ({
  close,
  menuId,
  editChapter = {},
  updateChapterList,
}) => {
  const [value, setValue] = useState(editChapter.name || '');

  const save = async () => {
    if (value) {
      const data = await api.graph.editChapter({
        name: value,
        menuId: menuId,
        id: editChapter.id,
      });
      if (data) {
        setValue('');
        updateChapterList(data, 'add');
      }
    }
  };

  const del = async () => {
    if (value) {
      const data = await api.graph.delChapter(editChapter.id);
      if (data) {
        setValue('');
        updateChapterList(data, 'del');
      }
    }
  };

  return (
    <Popup
      close={close}
      windowClass={s.popupAddCategory}
      del={editChapter.id ? del : undefined}
      contentClass={s.popupAddCategoryContent}
      title={editChapter.id ? 'Раздел: ' + editChapter.name : 'Новый раздел'}
    >
      <Input
        autofocus
        value={value}
        id="chapterNameInput"
        className={s.chapterNameInput}
        placeholder={`Название раздела`}
        handleChange={(val) => setValue(String(val))}
      />
      <Button
        handleClick={save}
        text={editChapter.id ? 'Сохранить' : 'Добавить'}
        title={editChapter.id ? 'Редактировать раздел' : 'Добавить раздел'}
      />
    </Popup>
  );
};

export default GraphPopupChapter;
