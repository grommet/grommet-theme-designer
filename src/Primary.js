import React from 'react';
import { Box, Heading, TextInput } from 'grommet';
import Field from './components/Field';
import Colors from './Colors';
import Font from './Font';
import Rounding from './Rounding';
import Spacing from './Spacing';

export default ({ theme, onChange }) => {
  return (
    <Box flex="grow" overflow="auto" pad={{ horizontal: 'small' }}>
      <Field htmlFor="name" label="name">
        <Box pad={{ right: 'medium' }}>
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
        </Box>
      </Field>
      <Font theme={theme} onChange={onChange} />
      <Heading level={2} size="small">Sizing</Heading>
      <Rounding theme={theme} onChange={onChange} />
      <Spacing theme={theme} onChange={onChange} />
      <Colors theme={theme} onChange={onChange} />
    </Box>
  )
}
