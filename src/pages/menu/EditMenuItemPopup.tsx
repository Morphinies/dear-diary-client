import api from '../../api';
import s from './Menu.module.scss';
import { useEffect, useState } from 'react';
import jsonEqual from '../../utils/jsonEqual';
import Popup from '../../components/popup/Popup';
import Input from '../../components/Input/Input';
import notesIcon from '../../assets/icons/notesIcon';
import tasksIcon from '../../assets/icons/tasksIcon';
import formValidator from '../../utils/formValidator';
import InputImg from '../../components/Input/InputImg';
import calendarIcon from '../../assets/icons/calendarIcon';
import { MenuItemEditType, MenuItemType } from '../../types/types';
import pieChartIcon from '../../assets/icons/diagrams/pieChartIcon';
import chartLineIcon from '../../assets/icons/diagrams/chartLineIcon';

type EditMenuItemPopupType = {
  closePopup: () => void;
  menuItem: MenuItemEditType;
  updateMenuList: (menuItem: MenuItemType | string) => void;
};

type menuTypeType = {
  id: number;
  name: string;
  icon: JSX.Element;
  iconStyle: string;
};

const EditMenuItemPopup = ({
  menuItem,
  closePopup,
  updateMenuList,
}: EditMenuItemPopupType) => {
  const [menuTypes] = useState<menuTypeType[]>([
    {
      id: 1,
      icon: tasksIcon,
      iconStyle: s.iconFill,
      name: 'Список типа "Задачи"',
    },
    {
      id: 2,
      icon: notesIcon,
      iconStyle: s.iconStroke,
      name: 'Список типа "Заметки"',
    },
    {
      id: 3,
      icon: pieChartIcon,
      iconStyle: s.iconFill,
      name: 'Диаграмма "Круговая"',
    },
    {
      id: 4,
      name: 'График',
      icon: chartLineIcon,
      iconStyle: s.iconStroke,
    },
    {
      id: 5,
      name: 'Календарь',
      icon: calendarIcon,
      iconStyle: s.iconStroke,
    },
  ]);
  const [errors, setErrors] = useState<any>({
    name: '',
  });
  const [formMessage, setFormMessage] = useState('');
  const [activeMenuType, setActiveMenuType] = useState<
    menuTypeType | undefined
  >(menuTypes.find((menu) => menu.id === menuItem.typeId));
  const [menuData, setMenuData] = useState<MenuItemEditType>(menuItem);

  useEffect(() => {
    if (formMessage) {
      setTimeout(() => {
        setFormMessage('');
      }, 2500);
    }
  }, [formMessage]);

  useEffect(() => {
    if (!jsonEqual(menuItem, menuData)) {
      setMenuData(menuItem);
    }
  }, [menuItem, menuData]);

  // new ver

  const handleSave = async () => {
    if (!activeMenuType?.id) return;
    const errors = formValidator(menuData, { name: ['required'] });
    if (errors) return setErrors(errors);

    let menuTypeName;
    if ([1, 2].includes(activeMenuType.id)) {
      menuTypeName = 'Список ' + menuData.name;
    } else if (activeMenuType.id === 3) {
      menuTypeName = 'Диаграмма ' + menuData.name;
    } else if (activeMenuType.id === 4) {
      menuTypeName = 'График ' + menuData.name;
    } else if (activeMenuType.id === 5) {
      menuTypeName = 'Календарь ' + menuData.name;
    }

    if (jsonEqual(menuItem, menuData)) {
      return setFormMessage(menuTypeName + ' - обновлено');
    }
    const updatedMenu = await api.menu.update(menuData, menuItem?.icon);
    if (updatedMenu) {
      if (menuData.id) {
        setFormMessage(menuTypeName + ' - обновлено');
      } else {
        setFormMessage(menuTypeName + ' - добавлено');
      }
      updateMenuList(updatedMenu);
    } else {
      if (menuData.id) {
        setFormMessage('Ошибка при обновлении');
      } else {
        setFormMessage('Ошибка при добавлении');
      }
    }
  };

  const handleDelete = async (itemId: string) => {
    if (!activeMenuType?.id) return;
    let menuTypeName;
    if ([1, 2].includes(activeMenuType.id)) {
      menuTypeName = 'Список ' + menuData.name;
    } else if (activeMenuType.id === 3) {
      menuTypeName = 'Диаграмма ' + menuData.name;
    } else if (activeMenuType.id === 4) {
      menuTypeName = 'График ' + menuData.name;
    } else if (activeMenuType.id === 5) {
      menuTypeName = 'Календарь ' + menuData.name;
    }
    const deletedItemId = await api.menu.del(itemId);
    if (deletedItemId) {
      updateMenuList(deletedItemId);
      setFormMessage(menuTypeName + ' - удалено');
    } else {
      setFormMessage('Ошибка при удалении');
    }
  };

  const changeMenuData = (key: string, val: any) => {
    if (errors[key]) {
      setErrors({ ...errors, [key]: '' });
    }
    setMenuData((prev: any) => ({ ...prev, [key]: val }));
  };

  return (
    <Popup
      close={closePopup}
      message={formMessage}
      windowClass={s.editMenuItemPopup}
      ok={!activeMenuType ? undefined : () => handleSave()}
      title={
        !activeMenuType
          ? 'Что добавим?'
          : activeMenuType.name + (menuItem.name ? ' - ' + menuItem.name : '')
      }
      back={
        !activeMenuType || menuData.id
          ? undefined
          : () => setActiveMenuType(undefined)
      }
      del={
        !menuData.id
          ? undefined
          : () => menuData.id && handleDelete(menuData.id)
      }
    >
      {!activeMenuType && (
        <div className={s.formChooseMenuType}>
          {menuTypes.map((menuType, i) => (
            <button
              key={i}
              className={s.menuTypeBtn}
              onClick={() =>
                setTimeout(() => {
                  setActiveMenuType(menuType);
                  changeMenuData('typeId', menuType.id);
                })
              }
            >
              <div className={s.menuTypeIconWrap + ' ' + menuType.iconStyle}>
                {menuType.icon}
              </div>
              <p>{menuType.name}</p>
            </button>
          ))}
        </div>
      )}
      {activeMenuType?.id && (
        <div className={s.formEditMenu}>
          <Input
            name="list"
            label="Название"
            error={errors.name}
            value={menuData.name}
            id={`editedMenuName`}
            className={s.inputWrap}
            placeholder="Введите название"
            clearInput={() => changeMenuData('name', '')}
            handleChange={(val) => changeMenuData('name', String(val))}
          />
          <InputImg
            type="icon"
            img={menuData.icon}
            label="Иконка меню (формат .svg или .png)"
            setImg={(val) => changeMenuData('icon', val)}
          />
        </div>
      )}
    </Popup>
  );
};

export default EditMenuItemPopup;
