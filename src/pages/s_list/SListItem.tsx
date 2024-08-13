import { FC } from 'react';
import s from './SList.module.scss';
import { SListItemType } from '../../types/types';

export type notesItemType = {
  note: SListItemType;
  setEditedNote: (note: SListItemType) => void;
};

const NotesItem: FC<notesItemType> = ({ setEditedNote, note }) => {
  return (
    <li onClick={() => setEditedNote(note)} className={s.noteItem}>
      <h2 className={s.title}>{note.text}</h2>
      <p className={s.text}>{note.desc}</p>
    </li>
  );
};

export default NotesItem;
