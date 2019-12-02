import React from 'react';
import { Box, Button, Grommet, TextInput } from 'grommet';
import { Add, Trash } from 'grommet-icons';
import sections from './sections';
import ColorControls from './ColorControls';
import Score from './Score';

const backgroundColors =
  ['background', 'background-strong', 'background-weak', 'background-xweak'];

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

export default ({ theme, setTheme }) => {
  const [newName, setNewName] = React.useState('');
  const paletteColors = React.useMemo(() =>
    Object.keys(theme.global.colors)
    .filter(name => !sections.some(({ colors }) => colors.some(n => n === name)))
    .sort()
    , [theme.global.colors]);

  return (
    <Box>
      {paletteColors.map((color) => (
        <Box key={color} direction="row" gap="large">
          <ColorControls
            color={color}
            controls={(
              <Button
                icon={<Trash />}
                hoverIndicator
                onClick={() => {
                  const nextTheme = JSON.parse(JSON.stringify(theme));
                  delete nextTheme.global.colors[color];
                  setTheme(nextTheme);
                }}
              />
            )}
            theme={theme}
            setTheme={setTheme}
          />
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
  )
}
