import api from '../../api';
import { isArray } from 'lodash';
import NotesItem from './SListItem';
import s from './SList.module.scss';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NotesEditPopup from './SListEditPopup';
import plusIcon from '../../assets/icons/plusIcon';
import Loader from '../../components/loader/Loader';
import {
  SListItemType,
  SListItemEditType,
  MenuItemType,
} from '../../types/types';
import Header from '../../components/header/Header';

const SList = () => {
  const { menuId } = useParams();
  const [loading, setLoading] = useState(false);
  const [menu, setMenu] = useState<MenuItemType>();
  const [list, setList] = useState<SListItemType[]>([]);
  const [editedNote, setEditedNote] = useState<SListItemEditType>();
  const [sortedNotes, setSortedNotes] = useState<SListItemType[]>([]);

  useEffect(() => {
    setSortedNotes([...list.sort((a, b) => b.updatedAt - a.updatedAt)]);
  }, [list]);

  const getNotes = async () => {
    if (!menuId) return;
    setLoading(true);
    const data = await api.sList.getList(menuId);
    const menu = await api.menu.getItem(menuId);
    if (menu) {
      setMenu(menu);
    }
    if (isArray(data)) {
      setList([...data]);
    } else {
      console.log('Не удалось загрузить список заметок');
    }
    setLoading(false);
  };

  useEffect(() => {
    getNotes();
  }, []);

  const save = async () => {
    if (editedNote) {
      if (!editedNote.desc && !editedNote.text) return;
      console.log('editedNote', editedNote);
      const updatedNote = await api.sList.update(editedNote);
      console.log(updatedNote);
      if (updatedNote) {
        const updatedNoteIndex = list.findIndex(
          (note) => note.id === updatedNote.id
        );
        if (updatedNoteIndex >= 0) {
          setList((prev) => [
            ...prev.slice(0, updatedNoteIndex),
            updatedNote,
            ...prev.slice(updatedNoteIndex + 1),
          ]);
        } else {
          setList((prev) => [...prev, updatedNote]);
        }
        closePopup();
        //
      } else {
        alert('Не удалось добавить/обновить заметку');
      }
    } else {
      closePopup();
    }
  };

  const delNote = async () => {
    if (editedNote?.id) {
      const deletedItemId = await api.sList.del(editedNote.id);
      if (deletedItemId) {
        setList((prev) => [...prev.filter((i) => i.id !== deletedItemId)]);
        closePopup();
      } else {
        console.log('Не удалось удалить запись');
      }
    }
  };

  const changeNote = (val: string | number, key: string) => {
    if (editedNote) {
      setEditedNote({ ...editedNote, [key]: String(val) });
    }
  };

  const addItem = async () => {
    if (menuId) {
      setEditedNote({
        desc: '',
        text: '',
        menuId: menuId,
        sort: list.length + 1,
      });
    }
  };

  const closePopup = () => {
    setEditedNote(undefined);
  };

  const getTitle = () => {
    if (loading) {
      return '';
    }
    if (menu) {
      return menu.name;
    } else {
      return 'Список';
    }
  };

  return (
    <>
      <Header title={getTitle()} />
      <div className={s.list}>
        <div className={s.notesMain}>
          {loading ? (
            <Loader className={s.notesListLoader} />
          ) : (
            <ul className={s.notesList}>
              <button
                onClick={() => addItem()}
                className={s.noteItem + ' ' + s.btnAdd}
              >
                {plusIcon}
              </button>
              {sortedNotes.map((note, i) => (
                <NotesItem key={i} setEditedNote={setEditedNote} note={note} />
              ))}
              {editedNote && (
                <NotesEditPopup
                  save={save}
                  delNote={delNote}
                  closePopup={closePopup}
                  editedNote={editedNote}
                  changeNote={changeNote}
                />
              )}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default SList;
