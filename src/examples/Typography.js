import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { Box, Heading, Paragraph, Text } from 'grommet';
import Page from './Page';

const Typography = () => {
  const theme = useContext(ThemeContext);
  return (
    <Page background="background">
      <Box background="background-front" pad="large">
        {[1, 2, 3, 4].map((level) => (
          <Box key={level} direction="row" align="baseline" gap="medium">
            <Text size="small" color="text-xweak">
              {theme.heading.level[level].medium.size}
            </Text>
            <Heading level={level}>{`Heading ${level}`}</Heading>
          </Box>
        ))}
        {['xxlarge', 'xlarge', 'large', 'medium', 'small'].map((size) => (
          <Box key={size} direction="row" align="baseline" gap="medium">
            <Text size="small" color="text-xweak">
              {theme.paragraph[size].size}
            </Text>
            <Paragraph size={size}>{`Paragraph ${size}`}</Paragraph>
          </Box>
        ))}
        {['xxlarge', 'xlarge', 'large', 'medium', 'small', 'xsmall'].map(
          (size) => (
            <Box key={size} direction="row" align="baseline" gap="medium">
              <Text size="small" color="text-xweak">
                {theme.text[size].size}
              </Text>
              <Text size={size}>{`Text ${size}`}</Text>
            </Box>
          ),
        )}

        {['xlarge', 'large', 'small'].map((size) => (
          <Box key={size}>
            {[1, 2, 3, 4].map((level) => (
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
    </Page>
  );
};

export default Typography;
