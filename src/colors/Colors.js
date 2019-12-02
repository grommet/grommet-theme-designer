import React, { Fragment } from 'react';
import { Anchor, Box, Grommet, Heading, Layer, Text } from 'grommet';
import { Close, Edit } from 'grommet-icons';
import ActionButton from '../components/ActionButton';
import sections from './sections';
import ColorControls from './ColorControls';
import Header from './Header';
import Graphics from './Graphics';
import PaletteColors from './PaletteColors';

export default ({ theme, setTheme }) => {
  const [editColors, setEditColors] = React.useState();

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
                    <PaletteColors theme={theme} setTheme={setTheme} />
                  ) : (
                    <Box direction="row" gap="large">
                      <Box width="large">
                        {colors.map((color) => (
                          <ColorControls
                            color={color}
                            theme={theme}
                            setTheme={setTheme}
                          />
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

              <Graphics theme={theme} setTheme={setTheme} />

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
