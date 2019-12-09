export const apiUrl =
  'https://us-central1-grommet-designer.cloudfunctions.net/themes';

export const starter = {
  name: 'my theme',
  rounding: 4,
  spacing: 24,
  defaultMode: 'light',
  global: {
    colors: {
      brand: {
        dark: '#7700cc',
        light: '#6600cc',
      },
      background: { dark: '#111111', light: '#FFFFFFF' },
      'background-back': { dark: '#111111', light: '#EEEEEE' },
      'background-front': { dark: '#222222', light: '#FFFFFF' },
      'background-contrast': { dark: '#FFFFFF11', light: '#11111111' },
      text: {
        dark: '#EEEEEE',
        light: '#333333',
      },
      'text-strong': {
        dark: '#FFFFFF',
        light: '#000000',
      },
      'text-weak': {
        dark: '#CCCCCC',
        light: '#444444',
      },
      'text-xweak': {
        dark: '#999999',
        light: '#666666',
      },
      border: {
        dark: '#444444',
        light: '#CCCCCC',
      },
      control: 'brand',
      'active-background': 'background-contrast',
      'active-text': 'text-strong',
      'selected-background': 'brand',
      'selected-text': 'text-strong',
      'status-critical': '#FF4040',
      'status-warning': '#FFAA15',
      'status-ok': '#00C781',
      'status-unknown': '#CCCCCC',
      'status-disabled': '#CCCCCC',
    },
    font: {
      family: 'Helvetica',
    },
    graph: {
      colors: {
        dark: ['brand'],
        light: ['brand'],
      },
    },
    active: {
      background: 'active-background',
      color: 'active-text',
    },
    hover: {
      background: 'active-background',
      color: 'active-text',
    },
    selected: {
      background: 'selected-background',
      color: 'selected-text',
    },
  },
  chart: { color: undefined },
  diagram: { line: { color: undefined } },
  meter: { color: undefined },
};

// prepares theme for publishing
export const normalizeTheme = theme => {
  if (!theme.global.active)
    theme.global.active = {
      background: 'active-background',
      color: 'active-text',
    };
  if (!theme.global.hover)
    theme.global.hover = {
      background: 'active-background',
      color: 'active-text',
    };
  if (!theme.global.selected)
    theme.global.selected = {
      background: 'selected-background',
      color: 'selected-text',
    };
  if (!theme.layer) theme.layer = {};
  if (!theme.layer.background)
    theme.layer.background = { ...theme.global.colors.background };
  // remove base compatible fields
  theme.chart = { color: undefined };
  theme.meter = { color: undefined };
  theme.diagram = { line: { color: undefined } };
};

export const upgradeTheme = theme => {
  return normalizeTheme(theme); // nothing to upgrade yet.
};
