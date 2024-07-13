import { useState } from 'react';
import s from './List.module.scss';
import Popup from '../../components/popup/Popup';
import Input from '../../components/Input/Input';
import Select from '../../components/select/Select';
import { ListItemEditType } from '../../types/types';
import Textarea from '../../components/Input/Textarea';
import Checkbox from '../../components/checkbox/Checkbox';

type ItemEditPopupType = {
  save: () => void;
  close: () => void;
  formMessage: string;
  item: ListItemEditType;
  delItem: (id: string) => void;
  changeItem: (key: string, val: string | number | boolean) => void;
};

const ListItemEditPopup = ({
  save,
  item,
  close,
  delItem,
  changeItem,
  formMessage,
}: ItemEditPopupType) => {
  const [priorityList] = useState([
    {
      id: 1,
      text: 'Высокий приоритет',
    },
    {
      id: 2,
      text: 'Средний приоритет',
    },
    {
      id: 3,
      text: 'Низкий приоритет',
    },
  ]);

  const selectedPriority = () => {
    return priorityList.find((priority) => priority.id === item.priority);
  };

  return (
    <Popup
      ok={save}
      close={close}
      message={formMessage}
      windowClass={s.popupWindow}
      del={item.id ? () => item.id && delItem(item.id) : undefined}
      title={item.id ? 'Редактировать запись' : 'Добавить запись'}
    >
      <div className={s.inputList}>
        <Textarea
          name={'item'}
          value={item.text}
          className={s.inputWrap}
          id={`edited_item_text`}
          placeholder="Текст записи"
          clearInput={() => changeItem('', 'text')}
          handleChange={(val) => changeItem('text', String(val))}
        />
        <Input
          id="itemDateInput"
          type="datetime-local"
          handleChange={(val: any) => changeItem('deadline', val)}
          value={item.deadline || +new Date() + 7 * 24 * 3600 * 1000}
        />

        <Select
          topLabel={''}
          list={priorityList}
          listId={'itemPriorityInput'}
          selectedItem={selectedPriority()}
          handleSelect={(val: any) => changeItem('priority', val.id)}
        />
        <Checkbox
          title="Выполнено"
          val={item.isCompleted || false}
          setVal={(val) => changeItem('isCompleted', val)}
        />
      </div>
    </Popup>
  );
};

export default ListItemEditPopup;
