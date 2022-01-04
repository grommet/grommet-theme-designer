import React, { useContext } from 'react';
import {
  Box,
  Button,
  Header,
  Heading,
  Paragraph,
  TextArea,
  TextInput,
} from 'grommet';
import { Previous } from 'grommet-icons';
import Field from './components/Field';
import AppContext from './AppContext';

const Fonts = ({ setAspect }) => {
  const { theme, setTheme } = useContext(AppContext);
  const font = theme.global.font;
  return (
    <Box flex={false}>
      <Header>
        <Button
          icon={<Previous />}
          hoverIndicator
          onClick={() => setAspect('Primary')}
        />
        <Heading level={3} size="small" margin="none">
          fonts
        </Heading>
        <Box pad={{ horizontal: 'medium' }} />
      </Header>

      <Box pad={{ horizontal: 'medium' }}>
        <Paragraph color="dark-4">
          Double quotes use Google fonts. Single quotes prompt for face.
        </Paragraph>
      </Box>

      <Field label="family">
        <TextInput
          id="family"
          name="family"
          placeholder="font family"
          plain
          textAlign="end"
          value={font.family}
          onChange={(event) => {
            const family = event.target.value;
            const nextTheme = JSON.parse(JSON.stringify(theme));
            nextTheme.global.font.family = family;
            setTheme(nextTheme);
            // see if we need a face for any of the fonts
            const names = family.split(',').map((f) => f.trim());
            names.forEach((name) => {
              const match = name.match(/^"(.+)"/);
              if (match) {
                fetch(
                  `https://fonts.googleapis.com/css?family=${encodeURIComponent(
                    match[1],
                  )}`,
                )
                  .then((response) => response.text())
                  .then((face) => {
                    const nextTheme2 = JSON.parse(JSON.stringify(nextTheme));
                    nextTheme2.global.font.face = face;
                    setTheme(nextTheme2);
                  });
              }
            });
          }}
        />
      </Field>

      {font.family && font.family.match(/'/) && (
        <Field label="face" direction="column" align="start">
          <TextArea
            id="face"
            name="face"
            cols={40}
            rows={10}
            plain
            value={font.face || ''}
            onChange={(event) => {
              const face = event.target.value;
              const nextTheme = JSON.parse(JSON.stringify(theme));
              nextTheme.global.font.face = face;
              setTheme(nextTheme);
            }}
          />
        </Field>
      )}

      <Box pad={{ horizontal: 'medium' }}>
        <Heading level={3} size="smalll">
          heading
        </Heading>
      </Box>

      <Field label="family">
        <TextInput
          id="headingFamily"
          name="headingFamily"
          plain
          textAlign="end"
          value={
            theme.heading && theme.heading.font ? theme.heading.font.family : ''
          }
          onChange={(event) => {
            const family = event.target.value;
            const nextTheme = JSON.parse(JSON.stringify(theme));
            if (!nextTheme.heading) nextTheme.heading = {};
            if (!nextTheme.heading.font) nextTheme.heading.font = {};
            nextTheme.heading.font.family = family;
            setTheme(nextTheme);
            // see if we need a face for any of the fonts
            const names = family.split(',').map((f) => f.trim());
            names.forEach((name) => {
              const match = name.match(/^"(.+)"/);
              if (match) {
                fetch(
                  `https://fonts.googleapis.com/css?family=${encodeURIComponent(
                    match[1],
                  )}`,
                )
                  .then((response) => response.text())
                  .then((face) => {
                    const nextTheme2 = JSON.parse(JSON.stringify(nextTheme));
                    nextTheme2.global.font.face =
                      (nextTheme.global.font.face || '') + '\n' + face;
                    setTheme(nextTheme2);
                  });
              }
            });
          }}
        />
      </Field>

      {theme.heading &&
        theme.heading.font &&
        theme.heading.font.family &&
        theme.heading.font.family.match(/'/) && (
          <Field label="face" direction="column" align="start">
            <TextArea
              id="headingFace"
              name="headingFace"
              cols={40}
              rows={10}
              plain
              value={theme.heading.font.face || ''}
              onChange={(event) => {
                const face = event.target.value;
                const nextTheme = JSON.parse(JSON.stringify(theme));
                nextTheme.global.font.face = (font.face || '') + face;
                setTheme(nextTheme);
              }}
            />
          </Field>
        )}
    </Box>
  );
};

export default Fonts;
