import {
  MenuItemType,
  GraphSettingsListType,
  GraphActiveSettingsType,
} from '../../types/types';
import api from '../../api';
import s from './Graph.module.scss';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/header/Header';
import GraphData from './GraphComponents/GraphData';
import GraphSettings from './GraphComponents/GraphSettings';
import lineChartIcon from '../../assets/icons/lineChartIcon';
import GraphPopupChapter from './GraphComponents/GraphPopupChapter';

const Graph = () => {
  const { menuId } = useParams();
  const [loading, setLoading] = useState(true);
  const [menu, setMenu] = useState<MenuItemType>();
  const [editChapter, setEditChapter] = useState<any>();
  const [settingsList, setSettingsList] = useState<GraphSettingsListType>({
    chapters: [],
    periods: [
      { id: 3, name: 'Год' },
      { id: 2, name: 'Месяц' },
      { id: 1, name: 'Неделя' },
    ],
    views: [{ id: 1, icon: lineChartIcon, title: 'Линейный график "A"' }],
  });
  const [activeSettings, setActiveSettingsList] =
    useState<GraphActiveSettingsType>({
      view: settingsList.views[0] || {},
      period: settingsList.periods[0] || {},
      chapter: settingsList.chapters[0] || {},
    });

  const changeActiveSettings = (key: string, val: any) => {
    setActiveSettingsList((prev: any) => ({ ...prev, [key]: val }));
  };

  const changeSettingsList = (key: string, val: any[]) => {
    setSettingsList((prev: any) => ({ ...prev, [key]: val }));
  };

  const updateChapterList = (chapter: any, key: string) => {
    const editedItemIndex =
      typeof chapter === 'string'
        ? settingsList.chapters.findIndex((c: any) => c?.id === chapter)
        : settingsList.chapters.findIndex((c: any) => c?.id === chapter.id);
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
    if (menu) {
      return menu.name;
    } else {
      return 'График';
    }
  };

  const getDefData = async (menuId: string) => {
    setLoading(true);
    const menu = await api.menu.getItem(menuId);
    const chapters = await api.graph.getChapterList(menuId);
    if (menu) {
      setMenu(menu);
    }
    if (chapters && chapters.length >= 0) {
      changeSettingsList('chapters', [...chapters]);
      changeActiveSettings('chapter', chapters[0] || {});
    }
    setLoading(false);
  };

  useEffect(() => {
    if (menuId) {
      getDefData(menuId);
    } else {
      console.log('menuId not found');
    }
    // eslint-disable-next-line
  }, [menuId]);

  return (
    <>
      <Header title={getTitle()} />
      {!loading && (
        <div className={s.graphWrap}>
          <GraphSettings
            settingsList={settingsList}
            activeSettings={activeSettings}
            changeActiveSettings={changeActiveSettings}
            editChapter={(val) =>
              val ? setEditChapter(val) : setEditChapter({})
            }
          />
          {activeSettings.chapter.id ? (
            <GraphData
              settingsList={settingsList}
              activeSettings={activeSettings}
              changeActiveSettings={changeActiveSettings}
            />
          ) : (
            <div></div>
          )}
          {editChapter && menuId && (
            <GraphPopupChapter
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

export default Graph;
