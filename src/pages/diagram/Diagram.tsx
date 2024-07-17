import {
  DiagramSettingsListType,
  DiagramActiveSettingsType,
  MenuItemType,
} from '../../types/types';
import api from '../../api';
import s from './Diagram.module.scss';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DiagramSettings from './DiagramSettings';
import Header from '../../components/header/Header';
import DiagramData from './diagramComponents/DiagramData';
import pieChartIcon from '../../assets/icons/diagrams/pieChartIcon';
import DiagramPopupChapter from './diagramComponents/DiagramPopupChapter';
import DiagramPopupCategory from './diagramComponents/DiagramPopupCategory';
import pieChartTypeBIcon from '../../assets/icons/diagrams/pieChartTypeBIcon';

const Diagram = () => {
  const { menuId } = useParams();
  const [loading, setLoading] = useState(true);
  const [menu, setMenu] = useState<MenuItemType>();
  const [editChapter, setEditChapter] = useState<any>();
  const [editCategory, setEditCategory] = useState<any>();
  const [defCategory] = useState({ name: 'Все категории', id: '1' });

  const [settingsList, setSettingsList] = useState<DiagramSettingsListType>({
    chapters: [],
    categories: [],
    periods: [
      { id: 3, name: 'Год' },
      { id: 2, name: 'Месяц' },
      { id: 1, name: 'Неделя' },
    ],
    views: [
      { id: 1, icon: pieChartIcon, title: 'Круговая диаграмма тип "A"' },
      { id: 2, icon: pieChartTypeBIcon, title: 'Круговая диаграмма тип "B"' },
      // { id: 3, icon: barChartIcon, title: 'Гистограмма' },
    ],
  });

  const [activeSettings, setActiveSettingsList] =
    useState<DiagramActiveSettingsType>({
      view: settingsList.views[0] || {},
      period: settingsList.periods[0] || {},
      chapter: settingsList.chapters[0] || {},
      category: settingsList.categories[0] || {},
    });

  const changeSettingsList = (key: string, val: any[]) => {
    setSettingsList((prev) => ({ ...prev, [key]: val }));
  };

  const changeActiveSettings = (key: string, val: any) => {
    setActiveSettingsList((prev) => ({ ...prev, [key]: val }));
  };

  const getCategoryList = async (chapterId: string) => {
    const data = await api.diagram.getCategoryList(chapterId);
    if (data) {
      changeSettingsList('categories', [defCategory, ...data]);
      changeActiveSettings('category', defCategory || {});
    }
  };

  const getChapterList = async (menuId: string) => {
    setLoading(true);

    const data = await api.diagram.getChapterList(menuId);
    const menu = await api.menu.getItem(menuId);
    if (menu) {
      setMenu(menu);
    }

    if (data) {
      changeSettingsList('chapters', [...data]);
      changeActiveSettings('chapter', data[0] || {});
    }
    setLoading(false);
  };

  useEffect(() => {
    if (activeSettings.chapter.id) {
      getCategoryList(activeSettings.chapter.id);
    }
  }, [activeSettings.chapter]);

  useEffect(() => {
    if (menuId) {
      getChapterList(menuId);
    } else {
      console.log('menuId not found');
    }
  }, [menuId]);

  const updateCategoryList = (cat: any, key: string) => {
    const editedItemIndex =
      typeof cat === 'string'
        ? settingsList.categories.findIndex((c) => c?.id === cat)
        : settingsList.categories.findIndex((c) => c?.id === cat.id);
    if (key === 'add') {
      if (editedItemIndex < 0) {
        changeSettingsList('categories', [...settingsList.categories, cat]);
      } else {
        changeSettingsList('categories', [
          ...settingsList.categories.slice(0, editedItemIndex),
          cat,
          ...settingsList.categories.slice(editedItemIndex + 1),
        ]);
      }
    } else {
      changeSettingsList('categories', [
        ...settingsList.categories.slice(0, editedItemIndex),
        ...settingsList.categories.slice(editedItemIndex + 1),
      ]);
      if (activeSettings.category.id === cat) {
        changeActiveSettings('categories', defCategory);
      }
    }
    setEditCategory(undefined);
  };

  const updateChapterList = (chapter: any, key: string) => {
    const editedItemIndex =
      typeof chapter === 'string'
        ? settingsList.chapters.findIndex((c) => c?.id === chapter)
        : settingsList.chapters.findIndex((c) => c?.id === chapter.id);
    if (key === 'del') {
      changeSettingsList('chapters', [
        ...settingsList.chapters.slice(0, editedItemIndex),
        ...settingsList.chapters.slice(editedItemIndex + 1),
      ]);
      if (activeSettings.chapter.id === chapter) {
        changeActiveSettings('chapter', {});
      }
    } else {
      if (editedItemIndex < 0) {
        changeSettingsList('chapters', [...settingsList.chapters, chapter]);
      } else {
        changeSettingsList('chapters', [
          ...settingsList.chapters.slice(0, editedItemIndex),
          chapter,
          ...settingsList.chapters.slice(editedItemIndex + 1),
        ]);
      }
      changeActiveSettings('chapter', chapter);
    }
    setEditChapter(undefined);
  };

  const getTitle = () => {
    if (loading) {
      return '';
    }
    if (activeSettings.chapter.name) {
      return activeSettings.chapter.name;
    } else {
      return 'Диаграмма';
    }
  };

  return (
    <>
      <Header title={getTitle()} />
      {!loading && (
        <div className={s.diagramWrap}>
          <DiagramSettings
            settingsList={settingsList}
            activeSettings={activeSettings}
            changeActiveSettings={changeActiveSettings}
            editChapter={(val) =>
              val ? setEditChapter(val) : setEditChapter({})
            }
            editCategory={(val) =>
              val ? setEditCategory(val) : setEditCategory({})
            }
          />
          {activeSettings.chapter.id ? (
            <DiagramData
              settingsList={settingsList}
              activeSettings={activeSettings}
              updateCategoryList={updateCategoryList}
              changeActiveSettings={changeActiveSettings}
            />
          ) : (
            <div></div>
          )}
          {/* popups */}
          {editCategory && (
            <DiagramPopupCategory
              editCategory={editCategory}
              activeSettings={activeSettings}
              close={() => setEditCategory(undefined)}
              updateCategoryList={updateCategoryList}
            />
          )}
          {editChapter && menuId && (
            <DiagramPopupChapter
              menuId={menuId}
              editChapter={editChapter}
              updateChapterList={updateChapterList}
              close={() => setEditChapter(undefined)}
            />
          )}

          {/* <FinStatistic /> */}
        </div>
      )}
    </>
  );
};

export default Diagram;
