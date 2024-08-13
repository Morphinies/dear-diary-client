import {
  GraphSettingsListType,
  GraphActiveSettingsType,
} from '../../../types/types';
import { FC } from 'react';
import s from '../Graph.module.scss';
import Select from '../../../components/select/Select';
import SelectBlock from '../../../components/select/SelectBlock';
import DiagramThemeSelect from '../../../components/diagrams/DiagramThemeSelect';

type GraphSettingsPropsType = {
  editChapter: (val?: any) => void;
  settingsList: GraphSettingsListType;
  activeSettings: GraphActiveSettingsType;
  changeActiveSettings: (key: string, val: any) => void;
};

const GraphSettings: FC<GraphSettingsPropsType> = ({
  editChapter,
  settingsList,
  activeSettings,
  changeActiveSettings,
}) => {
  return (
    <div className={s.graphSettings}>
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
            listClassName={s.graphSelectSortList}
            handleSelect={(val) => changeActiveSettings('view', val)}
          />
          <DiagramThemeSelect />
        </div>
      )}
    </div>
  );
};

export default GraphSettings;
