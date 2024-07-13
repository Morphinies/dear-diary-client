import Select from '../select/Select';
import { useEffect, useState } from 'react';
import s from '../select/Select.module.scss';
import paletteIcon from '../../assets/icons/paletteIcon';

const DiagramThemeSelect = () => {
  const [diagramThemeList] = useState([
    {
      id: 1,
      text: 'A',
      color:
        'linear-gradient(90deg, #003f5c 33%, #665191 33%, #665191 66%, #f95d6a 66% )',
    },
    {
      id: 2,
      text: 'B',
      color:
        'linear-gradient(90deg, #a7414a 33%, #282726 33%, #282726 66%, #6a8a82 66% )',
    },
    {
      id: 3,
      text: 'C',
      color:
        'linear-gradient(90deg, #5c0000 33%, #8b5398 33%, #8b5398 66%, #00dbff 66% )',
    },
    {
      id: 4,
      text: 'D',
      color:
        'linear-gradient(90deg, #695c47 33%, #8d7d60 33%, #8d7d60 66%, #b29f7a 66% )',
    },
  ]);
  const [selectedDiagramTheme, setSelectedDiagramTheme] = useState(
    diagramThemeList[0]
  );

  useEffect(() => {
    const diagramThemeLS = localStorage.getItem('diagram-theme');
    if (diagramThemeLS) {
      const diagramTheme = diagramThemeList.find(
        (theme) => theme.text === JSON.parse(diagramThemeLS)
      );
      diagramTheme && setSelectedDiagramTheme(diagramTheme);
    }
  }, [diagramThemeList]);

  const handleSelect = (theme: any) => {
    setSelectedDiagramTheme(theme);
    localStorage.setItem('diagram-theme', JSON.stringify(theme.text));
    const body = document.querySelector('body');
    if (body) body.setAttribute('diagram-theme', theme.text);
  };

  return (
    <Select
      list={diagramThemeList}
      selectIcon={paletteIcon}
      className={s.paletteSelect}
      iconClassName={s.paletteIcon}
      listId={'selectDiagramTheme'}
      listClassName={s.selectSortList}
      selectedItem={selectedDiagramTheme}
      handleSelect={(theme) => handleSelect(theme)}
    />
  );
};

export default DiagramThemeSelect;
