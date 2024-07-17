import {
  sortType,
  ListItemType,
  MenuItemType,
  ListItemEditType,
} from '../../types/types';
import api from '../../api';
import s from './List.module.scss';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import jsonEqual from '../../utils/jsonEqual';
import ListPageSettings from './ListSettings';
import ListA from '../../components/listA/ListA';
import ListPageItemEditPopup from './ListEditPopup';
import Header from '../../components/header/Header';

const List = () => {
  const { menuId } = useParams();
  const [menu, setMenu] = useState<MenuItemType>();
  const [formMessage, setFormMessage] = useState<string>('');
  const [newItem] = useState<ListItemEditType>({
    sort: 1,
    text: '',
    priority: 1,
    deadline: null,
    menuId: menuId,
    isCompleted: false,
  });
  const [isArchive, setIsArchive] = useState(false);
  const [list, setList] = useState<ListItemType[]>([]);
  const [listSorted, setListSorted] = useState<ListItemType[]>([]);
  const [listActive, setListActive] = useState<ListItemType[]>([]);
  const [listArchive, setListArchive] = useState<ListItemType[]>([]);
  const [editedItem, setEditedItem] = useState<ListItemEditType | null>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [reorderLoading, setReorderLoading] = useState<boolean>(false);
  const [selectedSort, setSelectedSort] = useState<sortType | undefined>();
  const [sortList] = useState<sortType[]>([
    { id: 1, name: 'Ручная' },
    { id: 2, name: 'С новых' },
    { id: 3, name: 'Со старых' },
    { id: 4, name: 'С max приоритета' },
    { id: 5, name: 'С min приоритета' },
    { id: 6, name: 'С min остатком времени' },
    { id: 7, name: 'С max остатком времени' },
  ]);

  useEffect(() => {
    if (formMessage) {
      setTimeout(() => {
        setFormMessage('');
      }, 2500);
    }
  }, [formMessage]);

  useEffect(() => {
    setListActive([...list.filter((item) => !item.isCompleted)]);
    setListArchive([...list.filter((item) => item.isCompleted)]);
  }, [list]);

  const sortingList = (
    arr: ListItemType[],
    selectedSort: sortType
  ): ListItemType[] => {
    switch (selectedSort.id) {
      // ручная
      case 1:
        return arr.sort((a, b) => a.sort - b.sort);
      // с новых
      case 2:
        return arr.sort((a, b) => b.updatedAt - a.updatedAt);
      // со старых
      case 3:
        return arr.sort((a, b) => a.updatedAt - b.updatedAt);
      // с min приоритета
      case 4:
        return arr.sort((a, b) => (a.priority || 0) - (b.priority || 0));
      // с max приоритета
      case 5:
        return arr.sort((a, b) => (b.priority || 0) - (a.priority || 0));
      // с min остатком времени
      case 6:
        return arr.sort((a, b) => (a.deadline || 0) - (b.deadline || 0));
      // с max остатком времени
      case 7:
        return arr.sort((a, b) => (b.deadline || 0) - (a.deadline || 0));
      default:
        return arr;
    }
  };

  useEffect(() => {
    if (!selectedSort) {
      return;
    }
    const items = isArchive
      ? sortingList(listArchive, selectedSort)
      : sortingList(listActive, selectedSort);
    if (!jsonEqual(items, listSorted) && !reorderLoading) {
      setListSorted([...items]);
    }
    reorderLoading && setReorderLoading(false);
    // eslint-disable-next-line
  }, [isArchive, selectedSort, list, listActive, listArchive]);

  const getList = async () => {
    setLoading(true);
    if (!menuId) {
      setLoading(false);
      return;
    }
    const menu = await api.menu.getItem(menuId);
    const data = await api.list.getList(menuId);
    if (menu) {
      setMenu(menu);
    } else {
      alert('Не удалось загрузить данные списка');
    }
    if (data) {
      setList([...data]);
    } else {
      alert('Не удалось загрузить список');
    }
    setLoading(false);
  };

  useEffect(() => {
    getList();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const selectedSortLS = localStorage.getItem('item-sort');
    if (selectedSortLS) {
      setSelectedSort(JSON.parse(selectedSortLS));
    } else {
      setSelectedSort(sortList[0]);
    }
  }, [sortList]);

  // item handlers
  const handleEdit = (id: string) => {
    const listItemIndex = list.findIndex((item) => item.id === id);
    if (listItemIndex >= 0) {
      setEditedItem({ ...list[listItemIndex] });
    }
  };

  const handleDelete = async (id: string) => {
    const res = await api.list.del(id);
    if (res) {
      const listItemIndex = list.findIndex((item) => item.id === id);
      setList((prev) => [
        ...prev.slice(0, listItemIndex),
        ...prev.slice(listItemIndex + 1),
      ]);
      if (editedItem) {
        setEditedItem(newItem);
      }
      setFormMessage('Запись успешно удалена');
    } else {
      setFormMessage('Не удалось удалить запись');
    }
  };

  const save = async () => {
    if (editedItem) {
      const updatedItem = await api.list.update(editedItem);
      if (updatedItem) {
        const updatedItemIndex = list.findIndex(
          (item) => item.id === editedItem.id
        );
        if (updatedItemIndex >= 0) {
          setList((prev) => [
            ...prev.slice(0, updatedItemIndex),
            updatedItem,
            ...prev.slice(updatedItemIndex + 1),
          ]);
        } else {
          setList((prev) => [...prev, updatedItem]);
        }
        if (editedItem.id) {
          setFormMessage('Запись успешно обновлена');
        } else {
          setFormMessage('Запись успешно добавлена');
        }
      } else {
        if (editedItem.id) {
          setFormMessage('Не удалось обновить запись');
        } else {
          setFormMessage('Не удалось добавить запись');
        }
      }
    } else {
      closePopup();
    }
  };

  // DnD handlers
  const reorder = (list: any[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  async function onDragEnd(result: any) {
    if (!result.destination) {
      return;
    }
    if (result.destination.index === result.source.index) {
      return;
    }
    if (!selectedSort) {
      return;
    }

    setReorderLoading(true);

    const sortedList = reorder(
      listSorted,
      result.source.index,
      result.destination.index
    );

    const newSortVal =
      sortingList(list, selectedSort).findIndex(
        (item) => item.id === listSorted[result.destination.index].id
      ) + 1;

    const sortingItem = {
      ...listSorted[result.source.index],
      sort: newSortVal,
    };

    setListSorted([...sortedList]);
    const updatedItems = await api.list.updateSort(sortingItem);
    if (updatedItems) {
      setList([...updatedItems]);
    } else {
      setReorderLoading(false);
    }
  }

  const closePopup = () => {
    setEditedItem(null);
  };

  const selectSort = (val: sortType) => {
    setSelectedSort(val);
    localStorage.setItem('item-sort', JSON.stringify(val));
  };

  const changeItem = (key: string, val: string | number | boolean) => {
    if (editedItem) {
      setEditedItem({ ...editedItem, [key]: val });
    }
  };

  const addItem = () => {
    setEditedItem({ ...newItem, sort: list.length + 1 });
  };

  const handleComplete = async (id: string) => {
    const itemId = isArchive
      ? listArchive.findIndex((item) => item.id === id)
      : listActive.findIndex((item) => item.id === id);
    const item = isArchive
      ? {
          ...listArchive[itemId],
          isCompleted: !listArchive[itemId].isCompleted,
        }
      : {
          ...listActive[itemId],
          isCompleted: !listActive[itemId].isCompleted,
        };
    const updatedItem = await api.list.update(item);
    if (updatedItem) {
      if (isArchive) {
        setListArchive((prev) => [
          ...prev.slice(0, itemId),
          ...prev.slice(itemId + 1),
        ]);
        setListActive((prev) => [...prev, updatedItem]);
      } else {
        setListActive((prev) => [
          ...prev.slice(0, itemId),
          ...prev.slice(itemId + 1),
        ]);
        setListArchive((prev) => [...prev, updatedItem]);
      }
    } else {
      alert('Не удалось обновить задачу');
    }
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
      <div className={s.listWrap}>
        <ListPageSettings
          addItem={addItem}
          sortList={sortList}
          isArchive={isArchive}
          selectSort={selectSort}
          selectedSort={selectedSort}
          setIsArchive={setIsArchive}
        />
        <ListA
          loading={loading}
          list={listSorted}
          className={s.list}
          onDragEnd={onDragEnd}
          handleEditItem={handleEdit}
          reorderLoading={reorderLoading}
          handleEditDelete={handleDelete}
          handleCompleteItem={handleComplete}
          withHandleSort={selectedSort?.id === 1}
        />
      </div>
      {editedItem && (
        <ListPageItemEditPopup
          save={save}
          item={editedItem}
          close={closePopup}
          delItem={handleDelete}
          changeItem={changeItem}
          formMessage={formMessage}
        />
      )}
    </>
  );
};

export default List;
