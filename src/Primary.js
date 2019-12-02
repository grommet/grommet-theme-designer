import React from 'react';
import { Box, TextInput } from 'grommet';
import Field from './components/Field';
import Colors from './colors/Colors';
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
      <Rounding theme={theme} setTheme={setTheme} />
      <Spacing theme={theme} setTheme={setTheme} />
      <Font theme={theme} setTheme={setTheme} />
      <Colors theme={theme} setTheme={setTheme} />
    </Box>
  )
}
