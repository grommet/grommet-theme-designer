import React, { Fragment } from 'react';
import { Box, TextArea } from 'grommet';
import Field from './components/Field';

export default ({ theme, onChange }) => (
  <Fragment>
    <Field
      htmlFor="family"
      label="font family"
      help="Double quotes use Google fonts. Single quotes prompt for face."
      align="start"
    >
      <Box pad={{ right: 'medium' }}>
        <TextArea
          name="family"
          plain
          style={{ textAlign: 'right' }}
          value={theme.global.font.family}
          onChange={(event) => {
            const family = event.target.value;
            const nextTheme = JSON.parse(JSON.stringify(theme));
            nextTheme.global.font.family = family;
            onChange({ theme: nextTheme });
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
                  onChange({ theme: nextTheme2 });
                })
              }
            })
          }}
        />
      </Box>
    </Field>
  </Fragment>
)
