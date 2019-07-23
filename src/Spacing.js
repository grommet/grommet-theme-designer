import React from 'react';
import { Box, MaskedInput, RangeInput, Text } from 'grommet';
import Field from './components/Field';

export default ({ theme, onChange }) => {

  const localOnChange = (event) => {
    const nextTheme = JSON.parse(JSON.stringify(theme));
    const spacing = parseInt(event.target.value, 10);
    nextTheme.spacing = spacing;
    onChange({ theme: nextTheme });
  }

  return (
    <Field htmlFor="spacing" label="spacing">
      <Box direction="row" align="center">
        <RangeInput
          id="spacing"
          name="spacing"
          max={36}
          min={12}
          step={4}
          value={theme.spacing !== undefined ? theme.spacing : 24}
          onChange={localOnChange}
          style={{ textAlign: 'end' }}
        />
        <Box
          flex={false}
          margin={{ left: 'small' }}
          direction="row"
          align="center"
        >
          <MaskedInput
            plain
            mask={[{ length: [1,2], regexp: /^[0-9]+$/ }]}
            style={{ textAlign: 'right', width: '48px' }}
            value={theme.spacing}
            onChange={localOnChange}
          />
          <Text>px</Text>
        </Box>
      </Box>
    </Field>
  )
}
