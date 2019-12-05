import React from 'react';
import { Box, Grommet, Meter, Text, TextArea } from 'grommet';
import Header from './Header';

const Example = () => (
  <Meter
    type="bar"
    round
    values={[
      { value: 20 },
      { value: 30 },
      { value: 10 },
      { value: 20 },
    ]}
  />
)

export default ({ theme, setTheme }) => (
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
                  const value =
                    event.target.value.match(/\S+/g) || [];
                  if (!nextTheme.global.graph ||
                    Array.isArray(nextTheme.global.graph)) {
                    nextTheme.global.graph = { colors: value };
                  } else {
                    nextTheme.global.graph.colors.light = value;
                  }
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
                  const value =
                    event.target.value.match(/\S+/g) || [];
                  if (value.length > 0) {
                    if (!nextTheme.global.graph) {
                      nextTheme.global.graph = { colors: {} };
                    } else if (Array.isArray(nextTheme.global.graph.colors)) {
                      const light = nextTheme.global.graph.colors;
                      nextTheme.global.graph = { colors: { light } };
                    }
                    nextTheme.global.graph.colors.dark = value;
                  } else if (nextTheme.global.graph) {
                    // no value, see if we need to shrink to array
                    if (nextTheme.global.graph.colors.dark) {
                      nextTheme.global.graph.colors =
                      nextTheme.global.graph.colors.light;
                    }
                  }
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
              align="end"
              justify="center"
            >
              <Example />
            </Box>
            <Box
              flex
              background={{ color: 'background', dark: true }}
              pad="small"
              gap="medium"
              align="start"
              justify="center"
            >
              <Example />
            </Box>
          </Box>
        </Grommet>
      </Box>
    </Box>
  </Box>
)
