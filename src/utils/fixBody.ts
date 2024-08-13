const fixBody = (fix = false) => {
  const body = document.querySelector('body');
  if (!body) return;
  if (fix) {
    body.style.maxHeight = '100vh';
    body.style.overflowY = 'hidden';
  } else {
    body.style.maxHeight = 'auto';
    body.style.overflowY = 'auto';
  }
};

export default fixBody;
