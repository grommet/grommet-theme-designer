import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Box,
  Button,
  DropButton,
  Grommet,
  Heading,
  Text,
  TextArea,
  TextInput,
} from 'grommet';
import { Add, Checkmark, Close, Trash } from 'grommet-icons';

const NameBox = props => (
  <Box
    direction="row"
    align="center"
    justify="end"
    width="small"
    flex={false}
    pad={{ left: 'medium', vertical: 'xsmall' }}
    {...props}
  />
);

const NameHeading = props => <Heading level={3} margin="none" {...props} />;

const ColorBox = ({
  dark,
  placeholder,
  suggestions,
  value,
  onChange,
  ...rest
}) => (
  <Box
    direction="row"
    width="small"
    flex={false}
    pad={{ horizontal: 'medium', vertical: 'xsmall' }}
    background={{ color: 'background', dark }}
    {...rest}
  >
    <Box direction="row" border={!!onChange} round="xsmall" overflow="hidden">
      {onChange && (
        <TextInput
          plain
          placeholder={placeholder}
          value={value}
          suggestions={suggestions}
          onChange={event => onChange(event.target.value)}
          onSelect={event => onChange(event.suggestion)}
        />
      )}
      <Box pad="small" background={value} />
    </Box>
  </Box>
);

const ColorRow = props => <Box direction="row" justify="end" {...props} />;

const Color = ({ prefix, theme, setTheme }) => {
  const [open, setOpen] = useState();

  const setValue = (color, mode, value) => {
    const nextTheme = JSON.parse(JSON.stringify(theme));
    const colors = nextTheme.global.colors;
    if (typeof colors[color] === 'object') {
      if (value || mode === 'light') {
        colors[color][mode] = value;
      } else {
        colors[color] = colors[color].light;
      }
    } else {
      if (mode === 'light') {
        colors[color] = value;
      } else {
        colors[color] = { light: colors[color], dark: value };
      }
    }
    setTheme(nextTheme);
  };

  const colors = Object.keys(theme.global.colors).filter(color =>
    color.startsWith(prefix),
  );
  const suggestions = Object.keys(theme.global.colors)
    .filter(c => c !== prefix)
    .sort();

  return (
    <DropButton
      plain
      hoverIndicator
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      dropAlign={{ right: 'left' }}
      dropContent={
        <Box>
          {colors.length > 1 && (
            <ColorRow>
              <NameBox>
                <Heading level={2} size="small" margin={{ top: 'none' }}>
                  {prefix}
                </Heading>
              </NameBox>
              <ColorBox />
              <ColorBox dark />
            </ColorRow>
          )}

          {colors.map(color => {
            const colorValue = theme.global.colors[color];
            let lightValue;
            let darkValue;
            if (typeof colorValue === 'object') {
              ({ light: lightValue, dark: darkValue } = colorValue);
            } else {
              lightValue = colorValue;
              darkValue = '';
            }
            const colorSuffix = color.split('-')[1];
            return (
              <ColorRow key={color}>
                <NameBox>
                  {color !== prefix && <NameHeading>{colorSuffix}</NameHeading>}
                  {colors.length === 1 && <NameHeading>{color}</NameHeading>}
                </NameBox>
                <ColorBox
                  value={lightValue}
                  suggestions={suggestions}
                  onChange={value => setValue(color, 'light', value)}
                />
                <ColorBox
                  dark
                  value={darkValue}
                  suggestions={suggestions}
                  onChange={value => setValue(color, 'dark', value)}
                />
              </ColorRow>
            );
          })}

          {colors.length > 1 && (
            <ColorRow>
              <NameBox />
              <ColorBox />
              <ColorBox dark />
            </ColorRow>
          )}
        </Box>
      }
    >
      <Box
        direction="row"
        align="center"
        justify="between"
        gap="small"
        pad={{ vertical: 'small', horizontal: 'medium' }}
        background={open ? 'selected-background' : undefined}
      >
        <Text>{prefix}</Text>
        <Grommet theme={theme} themeMode="dark">
          <Box direction="row">
            {colors.map(color => (
              <Box key={color} pad="small" background={color} />
            ))}
          </Box>
        </Grommet>
      </Box>
    </DropButton>
  );
};

const Palette = ({ color, theme, setTheme }) => {
  const [open, setOpen] = useState();
  const { light, dark } = theme.global.colors[color];
  const fierce = theme.global.colors[`${color}!`];
  return (
    <DropButton
      plain
      hoverIndicator
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      dropAlign={{ right: 'left' }}
      dropContent={
        <ColorRow>
          <NameBox justify="between" pad={undefined}>
            <Button
              icon={<Trash />}
              hoverIndicator
              onClick={() => {
                const nextTheme = JSON.parse(JSON.stringify(theme));
                delete nextTheme.global.colors[`${color}!`];
                delete nextTheme.global.colors[color];
                setTheme(nextTheme);
              }}
            />
            <NameHeading>{color}</NameHeading>
          </NameBox>
          <ColorBox
            placeholder="primary"
            value={fierce}
            onChange={value => {
              const nextTheme = JSON.parse(JSON.stringify(theme));
              nextTheme.global.colors[`${color}!`] = value;
              setTheme(nextTheme);
            }}
          />
          <ColorBox
            placeholder="light"
            value={light}
            onChange={value => {
              const nextTheme = JSON.parse(JSON.stringify(theme));
              nextTheme.global.colors[color].light = value;
              setTheme(nextTheme);
            }}
          />
          <ColorBox
            dark
            placeholder="dark"
            value={dark}
            onChange={value => {
              const nextTheme = JSON.parse(JSON.stringify(theme));
              nextTheme.global.colors[color].dark = value;
              setTheme(nextTheme);
            }}
          />
        </ColorRow>
      }
    >
      <Box
        direction="row"
        align="center"
        justify="between"
        gap="small"
        pad={{ vertical: 'small', horizontal: 'medium' }}
        background={open ? 'selected-background' : undefined}
      >
        <Text>{color}</Text>
        <Box direction="row">
          <Box key={color} pad="small" background={`${color}!`} />
          <Grommet theme={theme} themeMode="light">
            <Box key={color} pad="small" background={color} />
          </Grommet>
          <Grommet theme={theme} themeMode="dark">
            <Box key={color} pad="small" background={color} />
          </Grommet>
        </Box>
      </Box>
    </DropButton>
  );
};

const Graph = ({ theme, setTheme }) => {
  const colors = (theme.global.graph || {}).colors || { light: [], dark: [] };
  const [light, setLight] = useState(colors.light.join('\n'));
  const [dark, setDark] = useState(colors.dark.join('\n'));

  return (
    <DropButton
      plain
      hoverIndicator
      dropAlign={{ right: 'left', bottom: 'bottom' }}
      dropContent={
        <ColorRow>
          <NameBox margin={{ right: 'medium' }}>
            <NameHeading>graph</NameHeading>
          </NameBox>
          <Box pad="small" background="background">
            <TextArea
              rows={6}
              value={light}
              onChange={event => {
                const value = event.target.value;
                setLight(value);
                const nextTheme = JSON.parse(JSON.stringify(theme));
                if (!nextTheme.global.graph) nextTheme.global.graph = {};
                if (!nextTheme.global.graph.colors)
                  nextTheme.global.graph.colors = { light: [], dark: [] };
                nextTheme.global.graph.colors.light = value.match(/\S+/g) || [];
                setTheme(nextTheme);
              }}
            />
          </Box>
          <Box pad="small" background={{ color: 'background', dark: true }}>
            <TextArea
              rows={6}
              value={dark}
              onChange={event => {
                const value = event.target.value;
                setDark(value);
                const nextTheme = JSON.parse(JSON.stringify(theme));
                if (!nextTheme.global.graph) nextTheme.global.graph = {};
                if (!nextTheme.global.graph.colors)
                  nextTheme.global.graph.colors = { light: [], dark: [] };
                nextTheme.global.graph.colors.dark = value.match(/\S+/g) || [];
                setTheme(nextTheme);
              }}
            />
          </Box>
        </ColorRow>
      }
    >
      <Box
        direction="row"
        align="center"
        justify="between"
        gap="small"
        pad={{ vertical: 'small', horizontal: 'medium' }}
      >
        <Text>graph</Text>
        <Grommet theme={theme}>
          <Box direction="row">
            {colors.dark.map(color => (
              <Box key={color} pad="small" background={color} />
            ))}
          </Box>
        </Grommet>
      </Box>
    </DropButton>
  );
};

const prefixes = [
  'background',
  'text',
  'border',
  'control',
  'active',
  'selected',
  'status',
];

export default ({ theme, setTheme }) => {
  const [adding, setAdding] = useState();
  const ref = useRef();
  const palette = useMemo(
    () =>
      Object.keys(theme.global.colors)
        .filter(color => color.endsWith('!'))
        .map(color => color.split('!')[0]),
    [theme],
  );

  useEffect(() => {
    if (adding !== undefined) ref.current.focus();
  }, [adding]);

  return (
    <Box>
      <Box
        pad={{ left: 'medium' }}
        direction="row"
        align="center"
        justify="between"
        gap="medium"
      >
        <Heading level={3} size="small" margin="none">
          Colors
        </Heading>
        {adding === undefined ? (
          <Button icon={<Add />} hoverIndicator onClick={() => setAdding('')} />
        ) : (
          <Box direction="row" align="center">
            <TextInput
              ref={ref}
              placeholder="new color name"
              value={adding}
              onChange={event => setAdding(event.target.value)}
            />
            <Button
              icon={<Checkmark />}
              hoverIndicator
              onClick={() => {
                if (!theme.global.colors[adding]) {
                  const nextTheme = JSON.parse(JSON.stringify(theme));
                  nextTheme.global.colors[adding] = { dark: '', light: '' };
                  nextTheme.global.colors[`${adding}!`] = '';
                  setTheme(nextTheme);
                  setAdding(undefined);
                }
              }}
            />
            <Button
              icon={<Close />}
              hoverIndicator
              onClick={() => setAdding(undefined)}
            />
          </Box>
        )}
      </Box>
      {palette.map(color => (
        <Palette key={color} color={color} theme={theme} setTheme={setTheme} />
      ))}
      {prefixes.map(prefix => (
        <Color key={prefix} prefix={prefix} theme={theme} setTheme={setTheme} />
      ))}
      <Graph theme={theme} setTheme={setTheme} />
    </Box>
  );
};
