import React from 'react';
import { Text } from 'grommet';
import { colorIsDark } from 'grommet/utils';
import { hex } from 'wcag-contrast';
import { getColor } from './utils';

const scoreable = /^#[A-Za-z0-9]{3,8}$/;
// allow for alpha: #RGB, #RGBA, #RRGGBB, or #RRGGBBAA
const hexExp = /^#[A-Za-z0-9]{3,4}$|^#[A-Za-z0-9]{6,8}$/;
const rgbExp = /rgba?\(\s?([0-9]*)\s?,\s?([0-9]*)\s?,\s?([0-9]*)\s?\)/;
const rgbaExp = /rgba?\(\s?([0-9]*)\s?,\s?([0-9]*)\s?,\s?([0-9]*)\s?,\s?([.0-9]*)\s?\)/;

const parseHexToRGB = color =>
  color.length < 7 // 7 is what's needed for '#RRGGBB'
    ? color.match(/[A-Za-z0-9]{1}/g).map(v => parseInt(`${v}${v}`, 16))
    : // https://stackoverflow.com/a/42429333
      color.match(/[A-Za-z0-9]{2}/g).map(v => parseInt(v, 16));

const getRGBArray = color => {
  if (hexExp.test(color)) {
    const [red, green, blue, alpha] = parseHexToRGB(color);
    return [red, green, blue, alpha !== undefined ? alpha / 255.0 : undefined];
  }
  let match = color.match(rgbExp);
  if (match) {
    return match.splice(1).map(v => parseInt(v, 10));
  }
  match = color.match(rgbaExp);
  if (match) {
    return match.splice(1).map(v => parseFloat(v, 10));
  }
  return color;
};

// blend above color+alpha with below, single color
const blend = (above, below, alpha) => {
  // https://stackoverflow.com/a/746937
  const num = alpha * above + (1 - alpha) * below;
  const str = Math.round(num).toString(16);
  return str.length === 1 ? `0${str}` : str;
};

// blend above color+alpha with below, three color
const blendColors = (above, below) => {
  const [r1, g1, b1, a] = getRGBArray(above);
  const [r2, g2, b2] = getRGBArray(below);
  return `#${blend(r1, r2, a)}${blend(g1, g2, a)}${blend(b1, b2, a)}`;
};

export default ({ theme, mode, background, color }) => {
  let backgroundValue = getColor(theme, background, mode, true);
  if (backgroundValue === undefined) return '?';
  const alpha = getRGBArray(backgroundValue)[3];
  if (alpha !== undefined && alpha < 1) {
    // blend colors to determine actual background color
    const underBackground = theme.global.colors.background[mode];
    backgroundValue = blendColors(backgroundValue, underBackground);
  }
  const isDark = colorIsDark(backgroundValue);
  let adjustedMode;
  if (isDark === undefined) adjustedMode = mode;
  else adjustedMode = isDark ? 'dark' : 'light';
  const colorValue = getColor(theme, color, adjustedMode, true);
  if (colorValue === undefined) return '?';
  let content = '?';
  if (scoreable.test(backgroundValue) && scoreable.test(colorValue)) {
    content = Math.round(hex(backgroundValue, colorValue) * 100) / 100;
    if (content >= 4.5) content = '';
  }
  return (
    <Text color={color} size="small" truncate>
      {content}
    </Text>
  );
};
