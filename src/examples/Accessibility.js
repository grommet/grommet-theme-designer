import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import {
  Anchor,
  Box,
  Grommet,
  Header,
  Heading,
  Paragraph,
  Text,
} from 'grommet';
import Score from '../colors/Score';
import Page from './Page';

const Cell = ({ background, text, theme, themeMode }) => (
  <Box
    key={background}
    background={background}
    width="xxsmall"
    align="center"
    justify="center"
  >
    <Score
      theme={theme}
      mode={themeMode}
      background={background}
      color={text}
    />
  </Box>
);

const Texts = ({ background, texts, theme, themeMode }) => (
  <Box direction="row" border="top" gap="small">
    <Box width="small" pad="small">
      <Text>{background}</Text>
    </Box>
    {texts.map((text) => (
      <Cell
        key={text}
        background={background}
        text={text}
        theme={theme}
        themeMode={themeMode}
      />
    ))}
  </Box>
);

const TextLabels = ({ texts }) => (
  <Box
    flex={false}
    direction="row"
    align="center"
    justify="center"
    gap="small"
    margin={{ bottom: 'small' }}
  >
    <Box width="small" pad="small" />
    {texts.map((text) => (
      <Box key={text} width="xxsmall">
        <Text color={text} textAlign="center">
          {text.split('-')[1] || 'text'}
        </Text>
      </Box>
    ))}
  </Box>
);

const Backgrounds = ({ backgrounds, texts, theme, themeMode }) => (
  <Box flex={false} margin={{ vertical: 'large' }} align="center">
    <TextLabels texts={texts} />
    {backgrounds.map((name) => (
      <Texts
        key={name}
        background={name}
        texts={texts}
        theme={theme}
        themeMode={themeMode}
      />
    ))}
  </Box>
);

const Accessibility = () => {
  const theme = useContext(ThemeContext);
  const colors = theme.global.colors;
  const backgrounds = Object.keys(colors).filter((color) =>
    color.startsWith('background-'),
  );
  const palette = Object.keys(colors)
    .filter((color) => color.endsWith('!'))
    .map((color) => color.split('!')[0]);
  const texts = Object.keys(colors).filter((color) => color.startsWith('text'));

  return (
    <Page background="background">
      <Header pad="medium" direction="column" gap="none">
        <Heading level={1} size="small" margin="none">
          Accessibility
        </Heading>
        <Paragraph textAlign="center">
          Anywhere a number is shown indicates that the contrast ratio between
          the text color and the background color isn't large enough. It should
          be at least 4.5, according to the{' '}
          <Anchor
            target="_blank"
            href="https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html"
          >
            WCAG guidelines
          </Anchor>
          .
        </Paragraph>
      </Header>
      {['light', 'dark'].map((themeMode) => (
        <Grommet key={themeMode} theme={theme} themeMode={themeMode}>
          <Backgrounds
            backgrounds={backgrounds}
            texts={texts}
            theme={theme}
            themeMode={themeMode}
          />
          <Backgrounds
            backgrounds={palette}
            texts={texts}
            theme={theme}
            themeMode={themeMode}
          />
        </Grommet>
      ))}
      <Backgrounds
        backgrounds={palette.map((name) => `${name}!`)}
        texts={texts}
        theme={theme}
      />
    </Page>
  );
};

export default Accessibility;
