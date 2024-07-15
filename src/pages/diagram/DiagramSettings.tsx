import {
  DiagramSettingsListType,
  DiagramActiveSettingsType,
} from '../../types/types';
import { FC } from 'react';
import s from './Diagram.module.scss';
import Select from '../../components/select/Select';
import SelectBlock from '../../components/select/SelectBlock';
import DiagramThemeSelect from '../../components/diagrams/DiagramThemeSelect';

type DiagramSettingsPropsType = {
  editChapter: (val?: any) => void;
  editCategory: (val?: any) => void;
  settingsList: DiagramSettingsListType;
  activeSettings: DiagramActiveSettingsType;
  changeActiveSettings: (key: string, val: any) => void;
};

const DiagramSettings: FC<DiagramSettingsPropsType> = ({
  editChapter,
  editCategory,
  settingsList,
  activeSettings,
  changeActiveSettings,
}) => {
  return (
    <div className={s.diagramSettings}>
      <div className={s.left}>
        <Select
          handleAdd={editChapter}
          handleEdit={editChapter}
          addLabel="Добавить раздел"
          list={settingsList.chapters}
          listId="activeChapterSelect"
          listClassName={s.settingsSelectList}
          selectedItem={activeSettings.chapter}
          label={activeSettings.chapter.id ? '' : 'Раздел'}
          handleSelect={(val) => changeActiveSettings('chapter', val)}
        />
        <Select
          notEditList={[0]}
          handleAdd={editCategory}
          handleEdit={editCategory}
          addLabel="Добавить категорию"
          list={settingsList.categories}
          listId={'activeCategorySelect'}
          listClassName={s.settingsSelectList}
          selectedItem={activeSettings.category}
          label={activeSettings.category.id ? '' : 'Категория'}
          handleSelect={(val) => changeActiveSettings('category', val)}
        />
        {activeSettings.chapter.id && (
          <Select
            list={settingsList.periods}
            listId="activePeriodsSelect"
            selectedItem={activeSettings.period}
            listClassName={s.settingsSelectList}
            handleSelect={(val) => changeActiveSettings('period', val)}
          />
        )}
      </div>

      {activeSettings.chapter.id && (
        <div className={s.right}>
          <SelectBlock
            title="Тип отображения"
            list={settingsList.views}
            listId={'activeViewSelect'}
            selectedItem={activeSettings.view}
            listClassName={s.diagramSelectSortList}
            handleSelect={(val) => changeActiveSettings('view', val)}
          />
          <DiagramThemeSelect />
        </div>
      )}
    </div>
  );
};

export default DiagramSettings;
