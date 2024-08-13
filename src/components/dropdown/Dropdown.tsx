import { ReactNode } from 'react';
import s from './Dropdown.module.scss';

type DropdownType = {
  text: string;
  children: ReactNode;
};

const Dropdown = ({ children, text }: DropdownType) => {
  const toggleState = (btn: HTMLButtonElement) => {
    const isOpened = btn.classList.contains(s.active);
    const hiddenBlock = btn.nextElementSibling;
    if (isOpened) {
      btn.classList.remove(s.active);
      if (hiddenBlock) {
        hiddenBlock.setAttribute('style', 'height: 0');
      }
    } else {
      btn.classList.add(s.active);
      if (hiddenBlock) {
        console.log(hiddenBlock.scrollHeight);
        hiddenBlock.setAttribute(
          'style',
          `height: ${hiddenBlock.scrollHeight + 'px'}`
        );
      }
    }
  };

  return (
    <div className={s.dropdown}>
      <button
        className={s.dropdownBtn}
        onClick={(e) => toggleState(e.target as HTMLButtonElement)}
      >
        {text}
      </button>
      <div className={s.dropdownContent}>{children}</div>
    </div>
  );
};

export default Dropdown;
