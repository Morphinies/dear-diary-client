import s from './Header.module.scss';
import Button from '../button/Button';
import { NavLink } from 'react-router-dom';
import homeIcon from '../../assets/icons/homeIcon';
import settingsIcon from '../../assets/icons/settingsIcon';
// import menuIcon from '../../assets/icons/menuIcon';
// import closeIcon from '../../assets/icons/closeIcon';
// import settingsOnIcon from '../../assets/icons/settingsOnIcon';

const Header = ({ title }: { title?: string }) => {
  // const headerMenuRef = useRef<null | HTMLDivElement>(null);
  // const [menuOpened, setMenuOpened] = useState<boolean>(false);

  // useEffect(() => {
  //   const onClick = (e: any) => {
  //     if (headerMenuRef.current) {
  //       if (!headerMenuRef.current.contains(e.target)) {
  //         setMenuOpened(false);
  //       }
  //     }
  //   };
  //   document.addEventListener('click', (e) => onClick(e));
  //   return () => document.removeEventListener('click', (e) => onClick(e));
  // }, []);

  // useEffect(() => {
  //   if (menuOpened) {
  //     listAnimation({
  //       open: true,
  //       padding: 8,
  //       id: 'header_menu',
  //       isHorizontal: true,
  //     });
  //   } else {
  //     listAnimation({
  //       padding: 0,
  //       open: false,
  //       id: 'header_menu',
  //       isHorizontal: true,
  //     });
  //   }
  // }, [menuOpened]);

  return (
    <div className={s.header}>
      <div className={s.leftBtns}>
        <NavLink
          to={'/'}
          className={({ isActive }) => (isActive ? s.btnHomeWrapActive : '')}
        >
          <Button icon={homeIcon} className={s.btnHome} />
        </NavLink>
        {/* <div className={s.headerMenuWrap} ref={headerMenuRef}>
          <Button
            className={s.btnMenu + ' ' + (menuOpened ? s.opened : s.closed)}
            icon={menuOpened ? closeIcon : menuIcon}
            handleClick={() => setMenuOpened((prev) => !prev)}
          />
          <div
            id="header_menu"
            className={s.headerMenu + ' ' + (menuOpened ? s.opened : '')}
          >
            {headerLinks.map((headLink) => (
              <NavLink
                key={headLink.name}
                to={headLink.route}
                onClick={() => setMenuOpened(false)}
                className={({ isActive }) => (isActive ? s.active : '')}
              >
                {headLink.name}
              </NavLink>
            ))}
          </div>
        </div> */}
      </div>

      {title && <h1 className={'text-center'}>{title}</h1>}

      <NavLink
        to={'/settings'}
        className={({ isActive }) => (isActive ? s.btnSettingsWrapActive : '')}
      >
        <Button icon={settingsIcon} className={s.btnSettings} />
      </NavLink>
    </div>
  );
};

export default Header;
