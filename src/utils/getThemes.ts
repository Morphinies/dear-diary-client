export function getThemes() {
  const LSTheme = localStorage.getItem('theme');
  const LSBgPattern = localStorage.getItem('bgPattern');
  const LSDiagramTheme = localStorage.getItem('diagram-theme');
  const body = document.querySelector('body');
  if (!body) return;
  if (LSBgPattern) {
    body.setAttribute('bgPattern', LSBgPattern);
  } else {
    body.setAttribute('bgPattern', 'floating-cogs');
  }
  if (LSTheme) {
    body.setAttribute('theme', LSTheme);
  } else {
    body.setAttribute('theme', 'dark');
  }
  if (LSDiagramTheme) {
    body.setAttribute('diagram-theme', JSON.parse(LSDiagramTheme));
  } else {
    body.setAttribute('diagram-theme', 'A');
  }
}
