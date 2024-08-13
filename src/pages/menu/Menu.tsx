import api from '../../api';
import s from './Menu.module.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import plusIcon from '../../assets/icons/plusIcon';
import listIcon from '../../assets/icons/listIcon';
import editIcon from '../../assets/icons/editIcon';
import EditMenuItemPopup from './EditMenuItemPopup';
import Header from '../../components/header/Header';
import { MenuItemEditType, MenuItemType } from '../../types/types';

const Menu = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [menuList, setMenuList] = useState<MenuItemType[]>([]);
  const [editingMenu, setEditingMenu] = useState<MenuItemEditType>();
  const [defaultMenu] = useState<MenuItemEditType>({
    id: null,
    sort: 0,
    name: '',
    icon: '',
    typeId: null,
  });

  const getMenuList = async () => {
    setLoading(true);
    const menuList = await api.menu.getList();
    if (menuList) {
      setMenuList([...menuList]);
    }
    setLoading(false);
  };

  useEffect(() => {
    getMenuList();
  }, []);

  const updateMenuList = (menu: MenuItemType | string) => {
    if (typeof menu === 'string') {
      const deletedMenuIndex = menuList.findIndex((item) => item.id === menu);
      setMenuList((prev) => [
        ...prev.slice(0, deletedMenuIndex),
        ...prev.slice(deletedMenuIndex + 1),
      ]);
      setEditingMenu(defaultMenu);
      return;
    }
    const updatedMenuIndex = menuList.findIndex((item) => item.id === menu.id);
    if (updatedMenuIndex < 0) {
      setMenuList((prev) => [...prev, menu]);
    } else {
      setMenuList((prev) => [
        ...prev.slice(0, updatedMenuIndex),
        menu,
        ...prev.slice(updatedMenuIndex + 1),
      ]);
    }
    setEditingMenu(menu);
  };

  const getMenuLink = (menuItem: MenuItemType) => {
    switch (menuItem.typeId) {
      case 1:
        return `/list/${menuItem.id}`;
      case 2:
        return `/s_list/${menuItem.id}`;
      case 3:
        return `/diagram/${menuItem.id}`;
      case 4:
        return `/graph/${menuItem.id}`;
      case 5:
        return `/calendar/${menuItem.id}`;
      default:
        return '';
    }
  };

  return (
    <>
      <Header title="Дорогой дневник" />
      <div className={s.menuWrap}>
        <div className={s.menuChapter}>
          {!loading && (
            <div className={s.menuList}>
              {menuList.map((item, i) => (
                <button
                  className={s.menuItem}
                  onClick={() => navigate(getMenuLink(item))}
                  key={i}
                >
                  <div className={s.iconWrap}>
                    {item.icon ? (
                      <img
                        src={process.env.REACT_APP_API_URI + item.icon}
                        alt=""
                      />
                    ) : (
                      listIcon
                    )}
                  </div>
                  <p className={s.name}>{item.name}</p>
                  <span
                    className={s.btnEdit}
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingMenu(item);
                    }}
                  >
                    {editIcon}
                  </span>
                </button>
              ))}
              <button
                className={s.menuItem + ' ' + s.add}
                onClick={() => setEditingMenu(defaultMenu)}
              >
                <div className={s.iconWrap}>{plusIcon}</div>
              </button>
            </div>
          )}
        </div>

        {editingMenu && (
          <EditMenuItemPopup
            menuItem={editingMenu}
            updateMenuList={updateMenuList}
            closePopup={() => setEditingMenu(undefined)}
          />
        )}
      </div>
    </>
  );
};

export default Menu;
