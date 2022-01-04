import React, {
  Fragment,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Box,
  Button,
  DropButton,
  Form,
  Grommet,
  Header,
  Heading,
  Text,
  TextInput,
} from 'grommet';
import { Add, Checkmark, Close, Previous, Trash } from 'grommet-icons';
import AppContext from '../AppContext';

const help = {
  background: `The underlying background color for Grommet.`,
  'background-back': `A background color to use "behind everything",
    for instance when showing depth with tiles.`,
  'background-front': `A background color to use for containers on top of
    background-back.`,
  'background-contrast': `A slight luminance shift over the current background.
    It should have a low opacity value.`,
  text: 'The default text color.',
  'text-strong': 'The text color for text that should stand out a bit more.',
  'text-weak': 'The text color for text that should stand out a bit less.',
  'text-xweak': 'The text color for text that should stand out a lot less.',
};

const NameBox = (props) => (
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

const NameHeading = ({ prefix, name }) => (
  <Text color="text-xweak" margin={{ top: 'small' }}>
    {prefix}
    {prefix && '-'}
    <Text weight="bold" color="text-strong">
      {name}
    </Text>
  </Text>
);

const ColorBox = ({
  dark,
  placeholder,
  theme,
  suggestions,
  value,
  sharedValue,
  onChange,
  ...rest
}) => {
  const [searchExp, setSearchExp] = useState();
  return (
    <Box
      direction="row"
      align="start"
      width="small"
      flex={false}
      pad={{ horizontal: 'medium', vertical: 'xsmall' }}
      // background={{ color: 'background', dark }}
      {...rest}
    >
      <Box
        direction="row"
        border={(placeholder === '!' && 'horizontal') || !!onChange}
        round="xsmall"
        overflow="hidden"
      >
        {placeholder === '!' && (
          <Text alignSelf="center" size="large">
            !
          </Text>
        )}
        {onChange && (
          <>
            <TextInput
              plain
              placeholder={placeholder}
              value={value}
              suggestions={
                !searchExp
                  ? suggestions
                  : suggestions.filter((s) => searchExp.test(s))
              }
              onChange={(event) => {
                const nextValue = event.target.value;
                if (suggestions) setSearchExp(new RegExp(nextValue, 'i'));
                onChange(nextValue);
              }}
              onSelect={
                suggestions
                  ? (event) => {
                      const nextValue = event.suggestion;
                      setSearchExp(new RegExp(nextValue, 'i'));
                      onChange(event.suggestion);
                    }
                  : undefined
              }
            />
            {(value || sharedValue) && (
              <Grommet theme={theme} themeMode={dark ? 'dark' : 'light'}>
                <Box
                  fill="vertical"
                  pad="small"
                  background={value || sharedValue}
                />
              </Grommet>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

const ColorRow = (props) => <Box direction="row" justify="end" {...props} />;

const setValue = ({ color, mode, value, theme, setTheme, removeable }) => {
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
      if (removeable && !value) delete colors[color];
      else colors[color] = value;
    } else {
      colors[color] = { light: colors[color], dark: value };
    }
  }
  setTheme(nextTheme);
};

const Color = ({ prefix, theme, setTheme }) => {
  const [open, setOpen] = useState();

  const colors = Object.keys(theme.global.colors).filter((color) =>
    color.startsWith(prefix),
  );
  if (colors.length === 0) colors.push(prefix);
  const suggestions = Object.keys(theme.global.colors)
    .filter((c) => c !== prefix)
    .sort();

  return (
    <DropButton
      plain
      hoverIndicator
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      dropAlign={{ left: 'right', top: 'top' }}
      dropContent={
        <Box>
          {colors.map((color) => {
            const colorValue = theme.global.colors[color];
            let lightValue;
            let darkValue;
            if (typeof colorValue === 'object') {
              ({ light: lightValue, dark: darkValue } = colorValue);
            } else {
              lightValue = colorValue || '';
              darkValue = '';
            }
            const colorSuffix = color.split('-')[1];
            return (
              <Fragment key={color}>
                <ColorRow>
                  <NameBox direction="column" align="end" justify="start">
                    {color !== prefix ? (
                      <NameHeading prefix={prefix} name={colorSuffix} />
                    ) : (
                      <NameHeading name={color} />
                    )}
                    {help[color] && (
                      <Text
                        size="small"
                        textAlign="end"
                        margin={{ top: 'xsmall' }}
                      >
                        {help[color]}
                      </Text>
                    )}
                  </NameBox>
                  <ColorBox
                    theme={theme}
                    value={lightValue}
                    suggestions={suggestions}
                    onChange={(value) =>
                      setValue({
                        color,
                        mode: 'light',
                        value,
                        theme,
                        setTheme,
                        removeable: color === prefix,
                      })
                    }
                  />
                  <ColorBox
                    dark
                    theme={theme}
                    value={darkValue}
                    suggestions={suggestions}
                    onChange={(value) =>
                      setValue({ color, mode: 'dark', value, theme, setTheme })
                    }
                  />
                </ColorRow>
              </Fragment>
            );
          })}

          {colors.length > 1 && (
            <ColorRow>
              <NameBox />
              <ColorBox theme={theme} />
              <ColorBox dark theme={theme} />
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
        <Box>
          <Grommet theme={theme}>
            <Box direction="row">
              {colors.map((color) => (
                <Box
                  key={color}
                  pad={{ horizontal: 'small', vertical: 'xsmall' }}
                  background={color}
                />
              ))}
            </Box>
          </Grommet>
          <Grommet theme={theme} themeMode="dark">
            <Box direction="row">
              {colors.map((color) => (
                <Box
                  key={color}
                  pad={{ horizontal: 'small', vertical: 'xsmall' }}
                  background={color}
                />
              ))}
            </Box>
          </Grommet>
        </Box>
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
      dropAlign={{ left: 'right' }}
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
            <NameHeading name={color} />
          </NameBox>
          <ColorBox
            placeholder="!"
            theme={theme}
            value={fierce}
            onChange={(value) => {
              const nextTheme = JSON.parse(JSON.stringify(theme));
              nextTheme.global.colors[`${color}!`] = value;
              setTheme(nextTheme);
            }}
          />
          <ColorBox
            placeholder="light"
            theme={theme}
            value={light}
            onChange={(value) => {
              const nextTheme = JSON.parse(JSON.stringify(theme));
              nextTheme.global.colors[color].light = value;
              setTheme(nextTheme);
            }}
          />
          <ColorBox
            dark
            placeholder="dark"
            theme={theme}
            value={dark}
            onChange={(value) => {
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
          {fierce && (
            <Grommet theme={theme} themeMode="light">
              <Box key={color} pad="small" background={`${color}!`} />
            </Grommet>
          )}
          <Box>
            <Grommet theme={theme} themeMode="light">
              <Box
                key={color}
                pad={{ horizontal: 'small', vertical: 'xsmall' }}
                background={light ? color : undefined}
              />
            </Grommet>
            <Grommet theme={theme} themeMode="dark">
              <Box
                key={color}
                pad={{ horizontal: 'small', vertical: 'xsmall' }}
                background={dark ? color : undefined}
              />
            </Grommet>
          </Box>
        </Box>
      </Box>
    </DropButton>
  );
};

const Graph = ({ theme, setTheme }) => {
  const colors = Object.keys(theme.global.colors)
    .filter((color) => color.startsWith('graph-'))
    .sort();
  const suggestions = Object.keys(theme.global.colors).sort();

  return (
    <DropButton
      plain
      hoverIndicator
      dropAlign={{ left: 'right', bottom: 'bottom' }}
      dropContent={
        <Box>
          {colors.map((color) => {
            const colorValue = theme.global.colors[color];
            const index = color.split('-')[1];
            return (
              <ColorRow key={color}>
                <NameBox justify="between" pad={undefined}>
                  <Button
                    icon={<Trash />}
                    hoverIndicator
                    onClick={() => {
                      const nextTheme = JSON.parse(JSON.stringify(theme));
                      delete nextTheme.global.colors[color];
                      for (let i = index + 1; i < colors.length; i += 1) {
                        nextTheme.global.colors[`graph-${i - 1}`] =
                          nextTheme.global.colors[`graph-${i}`];
                      }
                      setTheme(nextTheme);
                    }}
                  />
                  <NameHeading prefix="graph" name={index} />
                </NameBox>
                <ColorBox
                  placeholder="light"
                  theme={theme}
                  value={colorValue.light || colorValue || ''}
                  suggestions={suggestions}
                  onChange={(value) =>
                    setValue({ color, mode: 'light', value, theme, setTheme })
                  }
                />
                <ColorBox
                  dark
                  placeholder="dark"
                  theme={theme}
                  value={colorValue.dark || ''}
                  sharedValue={
                    typeof colorValue === 'string' ? colorValue : undefined
                  }
                  suggestions={suggestions}
                  onChange={(value) =>
                    setValue({ color, mode: 'dark', value, theme, setTheme })
                  }
                />
              </ColorRow>
            );
          })}
          <ColorRow>
            <NameBox justify="between" pad={undefined}>
              <Button
                icon={<Add />}
                hoverIndicator
                onClick={() => {
                  const nextTheme = JSON.parse(JSON.stringify(theme));
                  nextTheme.global.colors[`graph-${colors.length}`] =
                    colors.length === 0 ||
                    typeof theme.global.colors[colors[0]] === 'string'
                      ? ''
                      : { dark: '', light: '' };
                  setTheme(nextTheme);
                }}
              />
            </NameBox>
            <ColorBox theme={theme} />
            <ColorBox dark theme={theme} />
          </ColorRow>
        </Box>
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
        <Box>
          <Grommet theme={theme}>
            <Box direction="row">
              {colors.map((color) => (
                <Box
                  key={color}
                  pad={{ horizontal: 'small', vertical: 'xsmall' }}
                  background={color}
                />
              ))}
            </Box>
          </Grommet>
          <Grommet theme={theme} themeMode="dark">
            <Box direction="row">
              {colors.map((color) => (
                <Box
                  key={color}
                  pad={{ horizontal: 'small', vertical: 'xsmall' }}
                  background={color}
                />
              ))}
            </Box>
          </Grommet>
        </Box>
      </Box>
    </DropButton>
  );
};

const prefixes = [
  'brand',
  'background',
  'text',
  'border',
  'control',
  'active',
  'selected',
  'focus',
  'status',
];

const Colors = ({ setAspect }) => {
  const { theme, setTheme } = useContext(AppContext);
  const [adding, setAdding] = useState();
  const ref = useRef();

  const palette = useMemo(
    () =>
      Object.keys(theme.global.colors)
        .filter((color) => color.endsWith('!'))
        .map((color) => color.split('!')[0]),
    [theme],
  );

  useEffect(() => {
    if (adding !== undefined) ref.current.focus();
  }, [adding]);

  return (
    <Box flex={false}>
      <Header>
        <Button
          icon={<Previous />}
          hoverIndicator
          onClick={() => setAspect('Primary')}
        />
        <Heading level={3} size="small" margin="none">
          colors
        </Heading>
        <Button icon={<Add />} hoverIndicator onClick={() => setAdding('')} />
      </Header>

      {palette.map((color) => (
        <Palette key={color} color={color} theme={theme} setTheme={setTheme} />
      ))}
      {adding !== undefined && (
        <Form
          onSubmit={(event) => {
            event.preventDefault();
            if (!theme.global.colors[adding]) {
              const nextTheme = JSON.parse(JSON.stringify(theme));
              nextTheme.global.colors[adding] = { dark: '', light: '' };
              nextTheme.global.colors[`${adding}!`] = '';
              setTheme(nextTheme);
            }
            setAdding(undefined);
          }}
        >
          <Box direction="row" align="center" pad={{ start: 'small' }}>
            <TextInput
              ref={ref}
              placeholder="new color name"
              value={adding}
              onChange={(event) => setAdding(event.target.value)}
            />
            <Button type="submit" icon={<Checkmark />} hoverIndicator />
            <Button
              icon={<Close />}
              hoverIndicator
              onClick={() => setAdding(undefined)}
            />
          </Box>
        </Form>
      )}
      <Box border="horizontal" />

      {prefixes.map((prefix) => (
        <Color key={prefix} prefix={prefix} theme={theme} setTheme={setTheme} />
      ))}
      <Graph theme={theme} setTheme={setTheme} />
    </Box>
  );
};

export default Colors;
