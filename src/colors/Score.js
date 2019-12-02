import React from 'react';
import { Text } from 'grommet';
import { colorIsDark } from 'grommet/utils';
import { hex, score } from 'wcag-contrast';
import { getColor } from './utils';

const scoreable = /^#[A-Za-z0-9]{3,8}$/;

export default ({ theme, mode, background, color }) => {
  const backgroundValue = getColor(theme, background, mode, true);
  if (backgroundValue === undefined) return '?'
  const colorValue = getColor(
    theme, color, colorIsDark(backgroundValue) ? 'dark' : 'light', true,
  )
  if (colorValue === undefined) return '?'
  let content;
  if (scoreable.test(backgroundValue) && scoreable.test(colorValue)) {
    content = score(hex(backgroundValue, colorValue))
      || (Math.round(hex(backgroundValue, colorValue) * 100) / 100) || 'F';
  }
  return (
    <Text color={color} truncate>{content || '?'}</Text>
  )
}
