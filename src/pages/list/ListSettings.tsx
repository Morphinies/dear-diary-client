import { FC } from 'react';
import s from './List.module.scss';
import { sortType } from '../../types/types';
import plusIcon from '../../assets/icons/plusIcon';
import Button from '../../components/button/Button';
import Select from '../../components/select/Select';

type listSettingsType = {
  sortList: sortType[];
  addItem: () => void;
  selectedSort?: sortType;
  selectSort: (val: sortType) => void;
  // options
  isArchive?: boolean;
  setIsArchive?: (val: boolean) => void;
};

const ListSettings: FC<listSettingsType> = ({
  sortList,
  addItem,
  selectSort,
  selectedSort,
  // options
  isArchive,
  setIsArchive,
}) => {
  return (
    <div className={s.listSettings}>
      <Select
        isSorting
        list={sortList}
        listId={'selectSortList'}
        selectedItem={selectedSort}
        listClassName={s.selectSortList}
        handleSelect={(val) => selectSort(val)}
      />
      {typeof isArchive === 'boolean' && setIsArchive && (
        <Button
          className={s.btnAddTask}
          text={isArchive ? 'Архив' : 'Актуальное'}
          handleClick={() => setIsArchive(!isArchive)}
          title={isArchive ? 'Перейти в "Актуальное"' : 'Перейти к "Архив"'}
        />
      )}
      <Button icon={plusIcon} handleClick={addItem} title="Добавить задачу" />
    </div>
  );
};

export default ListSettings;
