import React from 'react';
import { Box, Heading, TextInput } from 'grommet';
import Field from './components/Field';
import Colors from './Colors';
import Font from './Font';
import Rounding from './Rounding';
import Spacing from './Spacing';

export default ({ theme, onChange }) => {
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
            onChange({ theme: nextTheme });
          }}
        />
      </Field>
      <Font theme={theme} onChange={onChange} />
      <Box pad={{ horizontal: 'medium' }}>
        <Heading level={2} size="small">Sizing</Heading>
      </Box>
      <Rounding theme={theme} onChange={onChange} />
      <Spacing theme={theme} onChange={onChange} />
      <Colors theme={theme} onChange={onChange} />
    </Box>
  )
}
