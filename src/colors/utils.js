import { base } from 'grommet';

const valueExp = new RegExp('^#|^rgb');

export const getColor = (theme, name, mode, dereference) => {
  let color;
  if (theme.global.colors[name] !== undefined) {
    if (mode) {
      if (theme.global.colors[name][mode] !== undefined) {
        color = theme.global.colors[name][mode];
      }
    }
    if (!color) {
      color = theme.global.colors[name];
    }
  }
  if (!color && base.global.colors[name] !== undefined) {
    if (mode) {
      if (base.global.colors[name][mode] !== undefined) {
        color = base.global.colors[name][mode];
      } else {
        color = base.global.colors[name];
      }
    } else {
      color = base.global.colors[name];
    }
  }
  if (dereference && color && typeof color === 'string'
    && !valueExp.test(color)) {
    color = getColor(theme, color, mode);
  }
  return color;
};
