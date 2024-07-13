import api from '../../api';
import s from './Menu.module.scss';
import { useEffect, useState } from 'react';
import plusIcon from '../../assets/icons/plusIcon';
import listIcon from '../../assets/icons/listIcon';
import editIcon from '../../assets/icons/editIcon';
import EditMenuItemPopup from './EditMenuItemPopup';
import { NavLink, useNavigate } from 'react-router-dom';
import financeIcon from '../../assets/icons/financeIcon';
import calendarIcon from '../../assets/icons/calendarIcon';
import { MenuItemEditType, MenuItemType } from '../../types/types';

type serviceType = {
  id: number;
  name: string;
  route: string;
  icon: JSX.Element;
  iconClass?: string;
};

const Menu = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [menuList, setMenuList] = useState<MenuItemType[]>([]);
  // const [listsList, setListsList] = useState<ListPageType[]>([]);
  const [editingMenu, setEditingMenu] = useState<MenuItemEditType>();
  const [defaultMenu] = useState<MenuItemEditType>({
    id: null,
    sort: 0,
    name: '',
    icon: '',
    typeId: null,
  });

  const [serviceList] = useState<serviceType[]>([
    {
      id: 2,
      name: 'Финансы',
      icon: financeIcon,
      route: '/finance',
      iconClass: s.financeIcon,
    },
    {
      id: 3,
      name: 'Календарь',
      icon: calendarIcon,
      route: '/calendar',
      iconClass: s.calendarIcon,
    },
  ]); //setServices

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
        return `/schedule/${menuItem.id}`;
      default:
        return '';
    }
  };

  return (
    <div className={s.menu}>
      <div className={s.menuChapter}>
        {!loading && (
          <div className={s.serviceList}>
            {serviceList.map((service, i) => (
              <NavLink className={s.service} to={service.route} key={i}>
                <div className={s.iconWrap + ' ' + (service.iconClass ?? '')}>
                  {service.icon}
                </div>
                <p className={s.name}>{service.name}</p>
              </NavLink>
            ))}
            {/* {listsList.map((list, i) => (
              <button
                className={s.service}
                onClick={() => navigate(`/list/${list.id}`)}
                key={i}
              >
                <div className={s.iconWrap}>
                  {list.icon ? (
                    <img
                      src={process.env.REACT_APP_API_URI + list.icon}
                      alt=""
                    />
                  ) : (
                    listIcon
                  )}
                </div>
                <p className={s.name}>{list.name}</p>
                <span
                  className={s.btnEdit}
                  onClick={(e) => {
                    e.stopPropagation();
                    // setEditingMenu(list);
                  }}
                >
                  {editIcon}
                </span>
              </button>
            ))} */}
            {menuList.map((item, i) => (
              <button
                className={s.service}
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
              onClick={() => setEditingMenu(defaultMenu)}
              className={s.service + ' ' + s.add}
              // onClick={() => setListToUpdate(true)}
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
  );
};

export default Menu;
