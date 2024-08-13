type listAnimationType = {
  id: string;
  open: boolean;
  minRow?: number;
  padding: number;
  extraPx?: number;
  isHorizontal?: boolean;
};

const listAnimation = ({
  id,
  open,
  minRow = 0,
  padding = 10,
  extraPx = 0,
  isHorizontal = false,
}: listAnimationType) => {
  const list = document.getElementById(id);
  if (!list) return;
  if (open) {
    list.classList.add('opened');
    if (isHorizontal) {
      list.style.paddingLeft = +padding + 'px';
      list.style.paddingRight = +padding + 'px';
      list.style.width = list.scrollWidth + extraPx + +padding * 2 + 'px';
    } else {
      list.style.paddingTop = +padding + 'px';
      list.style.paddingBottom = +padding + 'px';
      list.style.height = list.scrollHeight + extraPx + +padding * 2 + 'px';
    }
  } else {
    let closeVar = 0;
    if (minRow) {
      const listEl = list.querySelector('li');
      if (!list.firstElementChild || !listEl) return;
      const listStyles = window.getComputedStyle(list.firstElementChild);
      closeVar =
        (minRow - 1) * parseInt(listStyles.gap) +
        listEl.offsetHeight * minRow +
        1;
    }
    list.classList.remove('opened');
    if (isHorizontal) {
      list.style.paddingLeft = +padding + 'px';
      list.style.paddingRight = +padding + 'px';
      list.style.width = +closeVar + +padding + 'px';
    } else {
      list.style.paddingBottom = +padding + 'px';
      list.style.paddingTop = +padding + 'px';
      list.style.height = +closeVar + +padding + 'px';
    }
  }
};

export default listAnimation;
