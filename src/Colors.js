import React, { Fragment } from 'react';
import {
  Anchor,
  Box,
  Button,
  Chart,
  Grommet,
  Heading,
  Layer,
  Menu,
  Select,
  Text,
  TextArea,
  TextInput,
  base,
} from 'grommet';
import { colorIsDark } from 'grommet/utils';
import { Add, Alert, Close, Edit, Trash } from 'grommet-icons';
import { hex, score } from 'wcag-contrast';
import ActionButton from './components/ActionButton';

const backgroundColors =
  ['background', 'background-strong', 'background-weak', 'background-xweak'];

const textColors = ['text', 'text-strong', 'text-weak', 'text-xweak'];

const statusColors = [
  'status-critical', 'status-warning', 'status-ok', 'status-disabled',
  'status-unknown',
];

const valueExp = new RegExp('^#|^rgb');

const getColor = (theme, name, mode, dereference) => {
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

const scoreable = /^#[A-Za-z0-9]{3,8}$/;

const Score = ({ theme, mode, background, color }) => {
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

const ControlsContents = ({ theme, background, mode }) => (
  <Box
    flex
    background={{ color: background, dark: (mode === 'dark') }}
    pad="medium"
  >
    <Select options={['one', 'two', 'three']} value="one" />
    <Box border>
      <Box
        pad={{ vertical: 'xsmall', horizontal: 'small' }}
        background="selected-background"
      >
        <Score
          theme={theme}
          background="selected-background"
          mode={mode}
          color="selected-text"
        />
      </Box>
      <Box
        pad={{ vertical: 'xsmall', horizontal: 'small' }}
        background="active-background"
      >
        <Score
          theme={theme}
          background="active-background"
          mode={mode}
          color="active-text"
        />
      </Box>
      <Box pad={{ vertical: 'xsmall', horizontal: 'small' }}>
        <Score
          theme={theme}
          background="background"
          mode={mode}
          color="text"
        />
      </Box>
    </Box>
  </Box>
)

const sections = [
  {
    name: 'brand',
    colors: ['brand'],
    example: () => (
      <Box fill direction="row" overflow="hidden">
        <Box
          flex
          direction="row"
          background={{ color: 'background', dark: false }}
          pad="small"
          gap="medium"
          justify="end"
        >
          <Menu label="Menu" />
          <Button primary color="brand" label="OK" />
        </Box>
        <Box
          flex
          direction="row"
          background={{ color: 'background', dark: true }}
          pad="small"
          gap="medium"
        >
          <Button primary color="brand" label="OK" />
          <Menu label="Menu" />
        </Box>
      </Box>
    )
  },
  {
    name: 'palette',
    colors: [],
    palette: true,
  },
  {
    name: 'background',
    colors: backgroundColors,
    example: () => (
      <Box fill direction="row">
        <Box
          flex
          direction="row"
          background={{ color: 'background', dark: false }}
          pad="medium"
          gap="medium"
        >
          {backgroundColors.filter(color => color !== 'background')
          .map(color => (
            <Box key={color} flex background={color} pad="small" justify="end">
              <Text truncate>{color.split('-')[1]}</Text>
            </Box>
          ))}
        </Box>
        <Box
          flex
          direction="row"
          background={{ color: 'background', dark: true }}
          pad="medium"
          gap="medium"
        >
          {backgroundColors.slice(0).reverse()
          .filter(color => color !== 'background').map(color => (
            <Box key={color} flex background={color} pad="small" justify="end">
              <Text truncate>{color.split('-')[1]}</Text>
            </Box>
          ))}
        </Box>
      </Box>
    ),
  },
  {
    name: 'text',
    colors: textColors,
    example: (theme) => (
      <Box fill direction="row">
        <Box
          flex
          direction="row"
          background={{ color: 'background', dark: false }}
        >
          {backgroundColors.map(backgroundColor => (
            <Box
              key={backgroundColor}
              flex
              background={backgroundColor}
              pad="small"
              gap="small"
              justify="between"
            >
              {textColors.map(textColor => (
                <Score
                  key={textColor}
                  theme={theme}
                  background={backgroundColor}
                  color={textColor}
                  mode='light'
                />
              ))}
            </Box>
          ))}
        </Box>
        <Box
          flex
          direction="row"
          background={{ color: 'background', dark: true }}
        >
          {backgroundColors.slice(0).reverse().map(backgroundColor => (
            <Box
              key={backgroundColor} 
              flex
              background={backgroundColor}
              pad="small"
              gap="small"
              justify="between"
            >
              {textColors.map(textColor => (
                <Score
                  key={textColor}
                  theme={theme}
                  background={backgroundColor}
                  color={textColor}
                  mode='dark'
                />
              ))}
            </Box>
          ))}
        </Box>
      </Box>
    ),
  },
  {
    name: 'controls',
    colors: [
      'control', 'border', 'focus', 'active-background', 'active-text',
      'selected-background', 'selected-text',
    ],
    example: (theme) => (
      <Box fill direction="row">
        {backgroundColors.filter(color => color !== 'background-strong')
        .map(color => (
          <ControlsContents
            key={color}
            theme={theme}
            mode="light"
            background={color}
          />
        ))}
        {backgroundColors.filter(color => color !== 'background-strong')
        .reverse().map(color => (
          <ControlsContents
            key={color}
            theme={theme}
            mode="dark"
            background={color}
          />
        ))}
      </Box>
    ),
  },
  {
    name: 'status',
    colors: statusColors,
    example: (theme) => (
      <Box fill>
        {statusColors.map(color => (
          <Box key={color} flex direction="row" gap="medium">
            <Box
              flex
              direction="row"
              background={{ color: 'background', dark: false }}
              gap="small"
              pad="small"
            >
              <Alert color={color} />
              <Score
                theme={theme}
                background="background"
                mode="light"
                color={color}
              />
            </Box>
            <Box
              flex
              direction="row"
              background={{ color: 'background', dark: true }}
              gap="small"
              pad="small"
            >
              <Alert color={color} />
              <Score
                theme={theme}
                background="background"
                mode="dark"
                color={color}
              />
            </Box>
            <Box flex background={color} pad="small" justify="end">
              <Score theme={theme} background={color} color="text" />
            </Box>
          </Box>
        ))}
      </Box>
    ),
  },
];

const CustomExample = ({ theme, color }) => (
  <Grommet theme={theme} style={{ height: '100%' }}>
    <Box fill direction="row">
      {backgroundColors.filter(color => color !== 'background-strong')
      .map(background => (
        <Box
          key={background}
          flex
          background={{ color: background, dark: false }}
          pad="small"
          justify="center"
        >
          <Box background={color} pad="small">
            <Score theme={theme} background={color} color="text" />
          </Box>
        </Box>
      ))}
      {backgroundColors.filter(color => color !== 'background-strong')
      .reverse().map(background => (
        <Box
          key={background}
          flex
          background={{ color: background, dark: true }}
          pad="small"
          justify="center"
        >
          <Box background={color} pad="small">
            <Score theme={theme} background={color} color="text" />
          </Box>
        </Box>
      ))}
    </Box>
  </Grommet>
)

const ColorInput = ({ theme, name, mode, setTheme }) => {
  const value = getColor(theme, name, mode);
  const single = typeof theme.global.colors[name] !== "object";

  const set = React.useCallback((nextValue) => {
    const nextTheme = JSON.parse(JSON.stringify(theme));
    const unset = nextValue === 'same as light' || !nextValue;
    if (!single && !unset) {
      nextTheme.global.colors[name][mode] = nextValue;
    } else if (single && mode === 'light') {
      nextTheme.global.colors[name] = nextValue;
    } else if (single && mode === 'dark' && !unset) {
      const lightValue = nextTheme.global.colors[name];
      nextTheme.global.colors[name] = {
        light: lightValue, dark: nextValue,
      };
    } else if (!single && mode === 'dark' && unset) {
      nextTheme.global.colors[name] = nextTheme.global.colors[name].light;
    }
    setTheme(nextTheme);
  }, [mode, name, theme, single, setTheme]);

  const suggestions = Object.keys(theme.global.colors)
    .filter(n => ((single && mode === 'dark')
      || n.startsWith(value))).sort()
  if (mode === 'dark') suggestions.unshift('same as light');

  return (
    <Box basis="small" flex={false}>
      <TextInput
        name={mode ? `${name}-${mode}` : name}
        style={mode === 'light' ? { textAlign: 'right' } : undefined}
        suggestions={suggestions}
        value={(single && mode === 'dark') ? '' : value}
        onChange={(event) => set(event.target.value)}
        onSelect={(event) => set(event.suggestion)}
      />
    </Box>
  );
};

const Header = ({ name, help }) => (
  <Box direction="row" align="center" justify="between">
    <Box width="large" direction="row" justify="between" align="center">
      <Heading level={2} margin={{ top: 'none' }}>{name}</Heading>
      <Box flex={false} direction="row" gap="small">
        <Box width="small" pad="small">
          <Text color="text-xweak" textAlign="end">
            light mode
          </Text>
        </Box>
        <Box width="small" pad="small">
          <Text color="text-xweak">dark mode</Text>
        </Box>
      </Box>
    </Box>
    {help}
  </Box>
);

export default ({ theme, setTheme }) => {
  const [editColors, setEditColors] = React.useState();
  const [newName, setNewName] = React.useState('');
  const paletteColors = React.useMemo(() =>
    Object.keys(theme.global.colors)
    .filter(name => !sections.some(({ colors }) => colors.some(n => n === name)))
    .sort()
    , [theme.global.colors]);

  return (
    <Fragment>
      <ActionButton hoverIndicator onClick={() => setEditColors(!editColors)}>
        <Box
          direction="row"
          align="center"
          justify="between"
          pad={{ vertical: 'small', horizontal: 'medium' }}
          border="bottom"
        >
          <Text>colors</Text>
          <Edit color="control" />
        </Box>
      </ActionButton>
      {editColors && (
        <Layer
          full
          modal
          margin="medium"
          onEsc={() => setEditColors(false)}
        >
          <Box fill overflow="auto">
            <Box flex={false}>
              <Box flex={false} direction="row" align="center" justify="between">
                <ActionButton
                  title='close'
                  icon={<Close />}
                  hoverIndicator
                  onClick={() => setEditColors(false)}
                />
                <Heading
                  level={2}
                  size="small"
                  margin={{ vertical: 'none', horizontal: 'medium' }}
                >
                  colors
                </Heading>
              </Box>

              {sections.map(({ name, colors, example, help, palette }) => (
                <Box key={name} border="top" pad="large">
                  <Header name={name} help={help} />
                  {palette ? (
                    <Box>
                      {paletteColors.map((color) => (
                        <Box key={color} direction="row" gap="large">
                          <Box
                            width="large"
                            direction="row"
                            gap="medium"
                            align="center"
                            justify="between"
                          >
                            <Text>{color}</Text>
                            <Box
                              direction="row"
                              justify="end"
                              gap="small"
                              margin={{ vertical: 'xsmall' }}
                            >
                              <Button
                                icon={<Trash />}
                                hoverIndicator
                                onClick={() => {
                                  const nextTheme = JSON.parse(JSON.stringify(theme));
                                  delete nextTheme.global.colors[color];
                                  setTheme(nextTheme);
                                }}
                              />
                              <ColorInput
                                theme={theme}
                                name={color}
                                mode="light"
                                setTheme={setTheme}
                              />
                              <ColorInput
                                theme={theme}
                                name={color}
                                mode="dark"
                                setTheme={setTheme}
                              />
                            </Box>
                          </Box>
                          <Box flex pad={{ horizontal: 'xsmall' }}>
                            <CustomExample theme={theme} color={color} />
                          </Box>
                        </Box>
                      ))}
                      <Box
                        direction="row"
                        justify="between"
                        align="center"
                        pad={{ top: 'medium' }}
                      >
                        <Box flex={false} direction="row" align="center" gap="small">
                          <TextInput
                            placeholder="new color name"
                            value={newName}
                            onChange={event => setNewName(event.target.value)}
                          />
                          <Button
                            icon={<Add />}
                            hoverIndicator
                            onClick={() => {
                              if (newName) {
                                const nextTheme = JSON.parse(JSON.stringify(theme));
                                nextTheme.global.colors[newName] = '';
                                setTheme(nextTheme);
                                setNewName('');
                              }
                            }}
                          />
                        </Box>
                      </Box>
                    </Box>
                  ) : (
                    <Box direction="row" gap="large">
                      <Box width="large">
                        {colors.map((color) => (
                          <Box
                            key={color}
                            direction="row"
                            gap="medium"
                            align="center"
                            justify="between"
                          >
                            <Text>{color}</Text>
                            <Box
                              direction="row"
                              justify="end"
                              gap="small"
                              margin={{ vertical: 'xsmall' }}
                            >
                              <ColorInput
                                theme={theme}
                                name={color}
                                mode="light"
                                setTheme={setTheme}
                              />
                              <ColorInput
                                theme={theme}
                                name={color}
                                mode="dark"
                                setTheme={setTheme}
                              />
                            </Box>
                          </Box>
                        ))}
                      </Box>
                      <Box flex pad='xsmall'>
                        {example && (
                          <Grommet theme={theme} style={{ height: '100%' }}>
                            {example(theme)}
                          </Grommet>
                        )}
                      </Box>
                    </Box>
                  )}
                </Box>
              ))}

              <Box border="top" pad="large">
                <Header name="graphics" />
                <Box direction="row" gap="large">
                  <Box width="large">
                    <Box
                      direction="row"
                      gap="medium"
                      align="center"
                      justify="between"
                    >
                      <Text>graph</Text>
                      <Box
                        direction="row"
                        justify="end"
                        gap="small"
                        margin={{ vertical: 'xsmall' }}
                      >
                        <Box basis="small" flex={false}>
                          <TextArea
                            rows="4"
                            value={((theme.global.graph || { colors: {} })
                              .colors.light || []).join('\n')}
                            onChange={(event) => {
                              const nextTheme = JSON.parse(JSON.stringify(theme));
                              if (!nextTheme.global.graph) {
                                nextTheme.global.graph = { colors: {} };
                              }
                              nextTheme.global.graph.colors.light =
                                event.target.value.split(' ');
                              setTheme(nextTheme);
                            }}
                            style={{ textAlign: 'right' }}
                          />
                        </Box>
                        <Box basis="small" flex={false}>
                          <TextArea
                            rows="4"
                            value={((theme.global.graph || { colors: {} })
                              .colors.dark || []).join('\n')}
                            onChange={(event) => {
                              const nextTheme = JSON.parse(JSON.stringify(theme));
                              if (!nextTheme.global.graph) {
                                nextTheme.global.graph = { colors: {} };
                              }
                              nextTheme.global.graph.colors.dark =
                                event.target.value.split(' ');
                              setTheme(nextTheme);
                            }}
                          />
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  <Box flex pad='xsmall'>
                    <Grommet theme={theme} style={{ height: '100%' }}>
                      <Box fill direction="row" overflow="hidden">
                        <Box
                          flex
                          background={{ color: 'background', dark: false }}
                          pad="small"
                          gap="medium"
                          justify="end"
                        >
                          <Chart
                            type="line"
                            round
                            bounds={[[0, 4], [0, 100]]}
                            values={[10, 20, 75, 40, 80]}
                          />
                        </Box>
                        <Box
                          flex
                          background={{ color: 'background', dark: true }}
                          pad="small"
                          gap="medium"
                        >
                          <Chart
                            type="line"
                            round
                            bounds={[[0, 4], [0, 100]]}
                            values={[10, 20, 75, 40, 80]}
                          />
                        </Box>
                      </Box>
                    </Grommet>
                  </Box>
                </Box>
              </Box>

              <Box
                direction="row"
                border="top"
                justify="end"
                align="center"
                pad={{ vertical: 'small', horizontal: 'large' }}
              >
                <Anchor
                  href="https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html"
                >
                  WCAG accessibility score
                </Anchor>
              </Box>
            </Box>
          </Box>
        </Layer>
      )}
    </Fragment>
  )
}
