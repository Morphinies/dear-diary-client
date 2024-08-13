import s from './SList.module.scss';
import Popup from '../../components/popup/Popup';
import Input from '../../components/Input/Input';
import { SListItemEditType } from '../../types/types';
import Textarea from '../../components/Input/Textarea';

type notesEditPopupType = {
  save: () => void;
  delNote: () => void;
  closePopup: () => void;
  editedNote: SListItemEditType;
  changeNote: (val: string, key: string) => void;
};

const NotesEditPopup = ({
  save,
  delNote,
  closePopup,
  editedNote,
  changeNote,
}: notesEditPopupType) => {
  console.log(editedNote);
  return (
    <Popup
      ok={save}
      close={closePopup}
      windowClass={s.popupWindow}
      contentClass={s.popupWindowContent}
      del={editedNote.id ? delNote : undefined}
      title={editedNote.id ? 'Редактирование' : 'Редактирование'}
    >
      <div className={s.notesPopupContent}>
        <Input
          className={s.inputWrap}
          placeholder="Заголовок"
          value={editedNote.text}
          id={`edited_note_title`}
          clearInput={() => changeNote('', 'text')}
          handleChange={(val) => changeNote(String(val), 'text')}
        />
        <Textarea
          className={s.inputWrap}
          value={editedNote.desc}
          id={`edited_note_text`}
          placeholder="Текст заметки"
          clearInput={() => changeNote('', 'desc')}
          handleChange={(val) => changeNote(val, 'desc')}
        />
      </div>
    </Popup>
  );
};

export default NotesEditPopup;
