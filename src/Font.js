import React, { Fragment } from 'react';
import { Box, Heading, Text, TextArea, TextInput } from 'grommet';
import Field from './components/Field';

export default ({ theme, setTheme }) => {
  return (
    <Fragment>
      <Box pad={{ horizontal: 'medium' }}>
        <Heading level={2} size="small">Font</Heading>
        <Text color="dark-4">
          Double quotes use Google fonts. Single quotes prompt for face.
        </Text>
      </Box>
      <Field
        htmlFor="family"
        label="font family"
        align="start"
      >
        <Box pad={{ right: 'medium' }}>
          <TextInput
            id="family"
            name="family"
            plain
            style={{ textAlign: 'right' }}
            value={theme.global.font.family}
            onChange={(event) => {
              const family = event.target.value;
              const nextTheme = JSON.parse(JSON.stringify(theme));
              nextTheme.global.font.family = family;
              setTheme(nextTheme);
              // see if we need a face for any of the fonts
              const names = family.split(',').map(f => f.trim());
              names.forEach(name => {
                const match = name.match(/^"(.+)"/);
                if (match) {
                  fetch(`https://fonts.googleapis.com/css?family=${encodeURIComponent(match[1])}`)
                  .then(response => response.text())
                  .then(face => {
                    const nextTheme2 = JSON.parse(JSON.stringify(nextTheme));
                    nextTheme2.global.font.face = face;
                    setTheme(nextTheme2);
                  })
                }
              })
            }}
          />
        </Box>
      </Field>
      {theme.global.font.family && theme.global.font.family.match(/'/) && (
        <Field label="face" htmlFor="face" align="start">
          <Box pad={{ right: 'medium' }}>
            <TextArea
              id="face"
              name="face"
              plain
              style={{ textAlign: 'right' }}
              cols={20}
              rows={3}
              value={theme.global.font.face || ''}
              onChange={(event) => {
                const face = event.target.value;
                const nextTheme = JSON.parse(JSON.stringify(theme));
                nextTheme.global.font.face = face;
                setTheme(nextTheme);
              }}
            />
          </Box>
        </Field>
      )}
      <Field
        htmlFor="headingFamily"
        label="heading font family"
        align="start"
      >
        <Box pad={{ right: 'medium' }}>
          <TextInput
            id="headingFamily"
            name="headingFamily"
            plain
            style={{ textAlign: 'right' }}
            value={(theme.heading && theme.heading.font)
              ? theme.heading.font.family : ''}
            onChange={(event) => {
              const family = event.target.value;
              const nextTheme = JSON.parse(JSON.stringify(theme));
              if (!nextTheme.heading) nextTheme.heading = {};
              if (!nextTheme.heading.font) nextTheme.heading.font = {};
              nextTheme.heading.font.family = family;
              setTheme(nextTheme);
              // see if we need a face for any of the fonts
              const names = family.split(',').map(f => f.trim());
              names.forEach(name => {
                const match = name.match(/^"(.+)"/);
                if (match) {
                  fetch(`https://fonts.googleapis.com/css?family=${encodeURIComponent(match[1])}`)
                  .then(response => response.text())
                  .then(face => {
                    const nextTheme2 = JSON.parse(JSON.stringify(nextTheme));
                    nextTheme2.global.font.face =
                    (nextTheme.global.font.face || '') + '\n' + face;
                    setTheme(nextTheme2);
                  })
                }
              })
            }}
          />
        </Box>
      </Field>
      {theme.heading && theme.heading.font && theme.heading.font.family
        && theme.heading.font.family.match(/'/) && (
        <Field label="heading font face" htmlFor="headingFace" align="start">
          <Box pad={{ right: 'medium' }}>
            <TextArea
              id="headingFace"
              name="headingFace"
              plain
              style={{ textAlign: 'right' }}
              cols={20}
              rows={3}
              value={theme.heading.font.face || ''}
              onChange={(event) => {
                const face = event.target.value;
                const nextTheme = JSON.parse(JSON.stringify(theme));
                nextTheme.global.font.face =
                  (nextTheme.global.font.face || '') + face;
                  setTheme(nextTheme);
              }}
            />
          </Box>
        </Field>
      )}
    </Fragment>
  )
}
