import s from './Settings.module.scss';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import Select from '../../components/select/Select';
import Button from '../../components/button/Button';
import { logout } from '../../store/auth/actionCreators';
import Header from '../../components/header/Header';

const Settings = () => {
  const dispatch = useDispatch();

  const [themeList] = useState<string[]>([
    //, setThemeList
    // 'light',
    'dark',
    // 'blue',
  ]);
  const [bgPatternList] = useState<string[]>([
    '-',
    'skull',
    'diamond',
    'i-like-food',
    'tic-tac-toe',
    'floating-cogs',
    'circuit-board',
  ]);

  const [selectedTheme, setSelectedTheme] = useState<string>('dark');
  const [selectedBgPattern, setSelectedBgPattern] =
    useState<string>('floating-cogs');

  useEffect(() => {
    const LSTheme = localStorage.getItem('theme');
    const LSBgPattern = localStorage.getItem('bgPattern');
    if (LSTheme) {
      setSelectedTheme(LSTheme);
    }
    if (LSBgPattern) {
      selectBgPattern(LSBgPattern);
    }
  }, []);

  const selectTheme = (theme: string) => {
    setSelectedTheme(theme);
    localStorage.setItem('theme', theme);
    const body = document.querySelector('body');
    if (body) body.setAttribute('theme', theme);
  };

  const selectBgPattern = (pattern: string) => {
    setSelectedBgPattern(pattern);
    localStorage.setItem('bgPattern', pattern);
    const body = document.querySelector('body');
    if (body) body.setAttribute('bgPattern', pattern);
  };

  const output = () => {
    dispatch(logout());
  };

  return (
    <>
      <Header title="Настройки" />
      <div className={s.settings}>
        <Select
          listId="theme"
          label={'Тема'}
          list={themeList}
          handleSelect={selectTheme}
          selectedItem={selectedTheme}
        />
        <Select
          listId="bgPattern"
          list={bgPatternList}
          label={'Фоновый паттерн'}
          handleSelect={selectBgPattern}
          selectedItem={selectedBgPattern}
        />
        <Button text="Выйти" handleClick={output} />
      </div>
    </>
  );
};

export default Settings;
