import React, { useState } from 'react';
import { Box, MaskedInput, RangeInput, Text } from 'grommet';
import Field from './components/Field';

const setSpacing = theme => {
  const { spacing = 24, scale = 1 } = theme;
  const baseFontSize = spacing * 0.75; // 18
  const fontScale = (spacing / 6) * scale; // 4

  const fontSizing = factor => ({
    size: `${(baseFontSize + factor * fontScale).toFixed()}px`,
    height: `${(spacing + factor * fontScale).toFixed()}px`,
    // maxWidth chosen to be ~50 characters wide
    // see: https://ux.stackexchange.com/a/34125
    maxWidth: `${(spacing * (baseFontSize + factor * fontScale)).toFixed()}px`,
  });

  const borderWidth = 2;

  theme.global.borderSize = {
    xsmall: '1px',
    small: '2px',
    medium: `${(spacing / 6).toFixed()}px`,
    large: `${(spacing / 2).toFixed()}px`,
    xlarge: `${spacing}px`,
  };

  theme.global.breakpoints = {
    small: {
      value: spacing * 32,
      borderSize: {
        xsmall: '1px',
        small: '2px',
        medium: `${(spacing / 6).toFixed()}px`,
        large: `${(spacing / 4).toFixed()}px`,
        xlarge: `${(spacing / 2).toFixed()}px`,
      },
      edgeSize: {
        none: '0px',
        hair: '1px',
        xxsmall: '2px',
        xsmall: `${(spacing / 8).toFixed()}px`,
        small: `${(spacing / 4).toFixed()}px`,
        medium: `${(spacing / 2).toFixed()}px`,
        large: `${spacing}px`,
        xlarge: `${spacing * 2}px`,
      },
      size: {
        xxsmall: `${spacing}px`,
        xsmall: `${spacing * 2}px`,
        small: `${spacing * 4}px`,
        medium: `${spacing * 8}px`,
        large: `${spacing * 16}px`,
        xlarge: `${spacing * 32}px`,
        full: '100%',
      },
    },
    medium: {
      value: spacing * 64,
    },
    large: {}, // anything above 'medium'
  };

  theme.global.edgeSize = {
    none: '0px',
    hair: '1px',
    xxsmall: `${(spacing / 8).toFixed()}px`,
    xsmall: `${(spacing / 4).toFixed()}px`,
    small: `${(spacing / 2).toFixed()}px`,
    medium: `${spacing}px`,
    large: `${spacing * 2}px`,
    xlarge: `${spacing * 4}px`,
    responsiveBreakpoint: 'small',
  };

  theme.global.font = { ...theme.global.font, ...fontSizing(0) };

  theme.global.input = {
    padding: `${(spacing / 2).toFixed()}px`,
    weight: 600,
  };

  theme.global.spacing = `${spacing}px`;

  theme.global.size = {
    xxsmall: `${spacing * 2}px`,
    xsmall: `${spacing * 4}px`,
    small: `${spacing * 8}px`,
    medium: `${spacing * 16}px`,
    large: `${spacing * 32}px`,
    xlarge: `${spacing * 48}px`,
    xxlarge: `${spacing * 64}px`,
    full: '100%',
  };

  if (!theme.button) theme.button = {};
  theme.button.border = {
    width: `${borderWidth}px`,
    radius: `${spacing * 0.75}px`,
  };
  theme.button.padding = {
    vertical: `${(spacing / 4 - borderWidth).toFixed()}px`,
    horizontal: `${spacing - borderWidth}px`,
  };

  theme.calendar = {
    // daySize must align with global.size
    small: {
      fontSize: `${baseFontSize - fontScale}px`,
      lineHeight: 1.375,
      daySize: `${((spacing * 8) / 7).toFixed(2)}px`,
    },
    medium: {
      fontSize: `${baseFontSize}px`,
      lineHeight: 1.45,
      daySize: `${((spacing * 16) / 7).toFixed(2)}px`,
    },
    large: {
      fontSize: `${baseFontSize + 3 * fontScale}px`,
      lineHeight: 1.11,
      daySize: `${((spacing * 32) / 7).toFixed(2)}px`,
    },
  };

  if (!theme.checkBox) theme.checkBox = {};
  theme.checkBox.size = `${spacing}px`;
  if (!theme.checkBox.toggle) theme.checkBox.toggle = {};
  theme.checkBox.toggle.radius = `${spacing}px`;
  theme.checkBox.toggle.size = `${spacing * 2}px`;

  theme.clock = {
    analog: {
      hour: {
        width: `${(spacing / 3).toFixed()}px`,
        size: `${spacing}px`,
      },
      minute: {
        width: `${(spacing / 6).toFixed()}px`,
        size: `${Math.round(spacing / 2)}px`,
      },
      second: {
        width: `${(spacing / 8).toFixed()}px`,
        size: `${Math.round(spacing / 2.666)}px`,
      },
      size: {
        small: `${spacing * 3}px`,
        medium: `${spacing * 4}px`,
        large: `${spacing * 6}px`,
        xlarge: `${spacing * 9}px`,
        huge: `${spacing * 12}px`,
      },
    },
    digital: {
      text: {
        xsmall: { size: `${baseFontSize - 2 * fontScale}px`, height: 1.5 },
        small: { size: `${baseFontSize - fontScale}px`, height: 1.43 },
        medium: { size: `${baseFontSize}px`, height: 1.375 },
        large: { size: `${baseFontSize + fontScale}px`, height: 1.167 },
        xlarge: { size: `${baseFontSize + 2 * fontScale}px`, height: 1.1875 },
        xxlarge: { size: `${baseFontSize + 4 * fontScale}px`, height: 1.125 },
      },
    },
  };

  theme.heading = {
    level: {
      1: {
        small: { ...fontSizing(4) },
        medium: { ...fontSizing(8) },
        large: { ...fontSizing(16) },
        xlarge: { ...fontSizing(24) },
      },
      2: {
        small: { ...fontSizing(2) },
        medium: { ...fontSizing(4) },
        large: { ...fontSizing(8) },
        xlarge: { ...fontSizing(12) },
      },
      3: {
        small: { ...fontSizing(1) },
        medium: { ...fontSizing(2) },
        large: { ...fontSizing(4) },
        xlarge: { ...fontSizing(6) },
      },
      4: {
        small: { ...fontSizing(0) },
        medium: { ...fontSizing(0) },
        large: { ...fontSizing(0) },
        xlarge: { ...fontSizing(0) },
      },
      5: {
        small: { ...fontSizing(-0.5) },
        medium: { ...fontSizing(-0.5) },
        large: { ...fontSizing(-0.5) },
        xlarge: { ...fontSizing(-0.5) },
      },
      6: {
        small: { ...fontSizing(-1) },
        medium: { ...fontSizing(-1) },
        large: { ...fontSizing(-1) },
        xlarge: { ...fontSizing(-1) },
      },
    },
  };

  theme.paragraph = {
    small: { ...fontSizing(-1) },
    medium: { ...fontSizing(0) },
    large: { ...fontSizing(1) },
    xlarge: { ...fontSizing(2) },
    xxlarge: { ...fontSizing(4) },
  };

  theme.radioButton = {
    size: `${spacing}px`,
  };

  theme.text = {
    xsmall: { ...fontSizing(-1.5) },
    small: { ...fontSizing(-1) },
    medium: { ...fontSizing(0) },
    large: { ...fontSizing(1) },
    xlarge: { ...fontSizing(2) },
    xxlarge: { ...fontSizing(4) },
  };
};

export default ({ theme, setTheme }) => {
  const [scale, setScale] = useState(theme.scale || 1.0);

  const onChangeSpacing = event => {
    const nextTheme = JSON.parse(JSON.stringify(theme));
    const spacing = parseInt(event.target.value, 10);
    nextTheme.spacing = spacing;
    setSpacing(nextTheme);
    setTheme(nextTheme);
  };

  const onChangeScale = event => {
    const nextTheme = JSON.parse(JSON.stringify(theme));
    const nextScale = event.target.value;
    setScale(nextScale);
    nextTheme.scale = parseFloat(nextScale, 10);
    setSpacing(nextTheme);
    setTheme(nextTheme);
  };

  return (
    <>
      <Field htmlFor="spacing" label="spacing">
        <Box direction="row" align="center">
          <RangeInput
            id="spacing"
            name="spacing"
            max={36}
            min={12}
            step={4}
            value={theme.spacing !== undefined ? theme.spacing : 24}
            onChange={onChangeSpacing}
            style={{ textAlign: 'end' }}
          />
          <Box
            flex={false}
            margin={{ left: 'small' }}
            direction="row"
            align="center"
          >
            <MaskedInput
              plain
              mask={[{ length: [1, 2], regexp: /^[0-9]+$/ }]}
              style={{ textAlign: 'right', width: '48px' }}
              value={theme.spacing}
              onChange={onChangeSpacing}
            />
            <Text>px</Text>
          </Box>
        </Box>
      </Field>
      <Field htmlFor="scale" label="font scale">
        <Box direction="row" align="center">
          <RangeInput
            id="scale"
            name="scale"
            max={4}
            min={0.2}
            step={0.2}
            value={scale}
            onChange={onChangeScale}
            style={{ textAlign: 'end' }}
          />
          <Box
            flex={false}
            margin={{ left: 'small' }}
            direction="row"
            align="center"
          >
            <MaskedInput
              plain
              mask={[{ length: [1, 3], regexp: /^[.0-9]+$/ }]}
              style={{ textAlign: 'right', width: '48px' }}
              value={scale}
              onChange={onChangeScale}
            />
          </Box>
        </Box>
      </Field>
    </>
  );
};
