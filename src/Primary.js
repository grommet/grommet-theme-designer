import React from 'react';
import { Box, Heading, TextInput } from 'grommet';
import Field from './components/Field';
import Colors from './Colors';
import Font from './Font';
import Rounding from './Rounding';
import Spacing from './Spacing';

export default ({ theme, setTheme }) => {
  return (
    <Box>
      <Field htmlFor="name" label="name">
        <TextInput
          name="name"
          plain
          style={{ textAlign: 'right' }}
          value={theme.name}
          onChange={(event) => {
            const nextTheme = JSON.parse(JSON.stringify(theme));
            nextTheme.name = event.target.value;
            setTheme(nextTheme);
          }}
        />
      </Field>
      <Font theme={theme} setTheme={setTheme} />
      <Box pad={{ horizontal: 'medium' }}>
        <Heading level={2} size="small">Sizing</Heading>
      </Box>
      <Rounding theme={theme} setTheme={setTheme} />
      <Spacing theme={theme} setTheme={setTheme} />
      <Colors theme={theme} setTheme={setTheme} />
    </Box>
  )
}
