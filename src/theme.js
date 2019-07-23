
export const apiUrl = 'https://us-central1-grommet-designer.cloudfunctions.net/themes';

export const starter = {
  name: 'my theme',
  rounding: 4,
  spacing: 24,
  global: {
    colors: {},
    font: {
      family: 'Helvetica',
    },
  }
}

export const upgradeTheme = (theme) => {
  return theme; // nothing to upgrade yet.
}
