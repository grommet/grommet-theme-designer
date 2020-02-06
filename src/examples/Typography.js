import React from 'react';
import { ThemeContext } from 'styled-components';
import { Box, Grid, Heading, Main, Paragraph, Text } from 'grommet';

export default () => {
  const theme = React.useContext(ThemeContext);
  return (
    <Main background="background-back">
      <Grid
        columns={['flex', ['medium', 'large'], 'flex']}
        rows={['flex']}
        areas={[{ name: 'content', start: [1, 0], end: [1, 0] }]}
      >
        <Box
          gridArea="content"
          fill="vertical"
          background="background-front"
          pad="large"
        >
          {[1, 2, 3, 4].map(level => (
            <Box key={level} direction="row" align="baseline" gap="medium">
              <Text size="small" color="text-xweak">
                {theme.heading.level[level].medium.size}
              </Text>
              <Heading level={level}>{`Heading ${level}`}</Heading>
            </Box>
          ))}
          {['xxlarge', 'xlarge', 'large', 'medium', 'small'].map(size => (
            <Box key={size} direction="row" align="baseline" gap="medium">
              <Text size="small" color="text-xweak">
                {theme.paragraph[size].size}
              </Text>
              <Paragraph size={size}>{`Paragraph ${size}`}</Paragraph>
            </Box>
          ))}
          {['xxlarge', 'xlarge', 'large', 'medium', 'small', 'xsmall'].map(
            size => (
              <Box key={size} direction="row" align="baseline" gap="medium">
                <Text size="small" color="text-xweak">
                  {theme.text[size].size}
                </Text>
                <Text size={size}>{`Text ${size}`}</Text>
              </Box>
            ),
          )}

          {['xlarge', 'large', 'small'].map(size => (
            <Box key={size}>
              {[1, 2, 3, 4].map(level => (
                <Box key={level} direction="row" align="baseline" gap="medium">
                  <Text size="small" color="text-xweak">
                    {theme.heading.level[level][size].size}
                  </Text>
                  <Heading
                    level={level}
                    size={size}
                  >{`Heading ${size} ${level}`}</Heading>
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </Grid>
    </Main>
  );
};
