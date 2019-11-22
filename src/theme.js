
export const apiUrl = 'https://us-central1-grommet-designer.cloudfunctions.net/themes';

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
      background: {
        dark: '#222222',
        light: '#FFFFFF',
      },
      "background-strong": {
        dark: '#000000',
        light: '#FFFFFF',
      },
      "background-weak": {
        dark: '#444444a0',
        light: '#E8E8E880',
      },
      "background-xweak": {
        dark: '#66666699',
        light: '#CCCCCC90',
      },
      text: {
        dark: '#EEEEEE',
        light: '#333333',
      },
      "text-strong": {
        dark: '#FFFFFF',
        light: '#000000',
      },
      "text-weak": {
        dark: '#CCCCCC',
        light: '#444444',
      },
      "text-xweak": {
        dark: '#999999',
        light: '#666666',
      },
      border: 'background-xweak',
      control: 'brand',
      "active-background": 'background-weak',
      "active-text": 'text-strong',
      "selected-background": 'background-strong',
      "selected-text": 'text-strong',
      "status-critical": '#FF4040',
      "status-warning": '#FFAA15',
      "status-ok": '#00C781',
      "status-unknown": '#CCCCCC',
      "status-disabled": '#CCCCCC',
    },
    font: {
      family: 'Helvetica',
    },
    graph: {
      colors: {
        dark: ['brand'],
        light: ['brand'],
      },
    }
  }
}

// prepares theme for publishing
export const normalizeTheme = (theme) => {
  theme.global.active = {
    background: 'active-background', color: 'active-text',
  }
  theme.global.hover = {
    background: 'active-background', color: 'active-text',
  }
  theme.global.selected = {
    background: 'selected-background', color: 'selected-text',
  }
}

export const upgradeTheme = (theme) => {
  return theme; // nothing to upgrade yet.
}
