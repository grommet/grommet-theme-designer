import React from 'react';
import { Box, MaskedInput, RangeInput, Text } from 'grommet';
import Field from './components/Field';

export default ({ theme, setTheme }) => {

  const onChange = (event) => {
    const nextTheme = JSON.parse(JSON.stringify(theme));
    const rounding = parseInt(event.target.value, 10);
    nextTheme.rounding = rounding
    const radius = `${rounding}px`
    nextTheme.global.control = {
      border: { radius: radius },
    };
    nextTheme.button = {
      border: { radius: radius },
    };
    nextTheme.checkBox = {
      check: { radius: radius },
      toggle: { radius: radius },
    };
    nextTheme.radioButton = {
      check: { radius: radius },
    };
    setTheme(nextTheme);
  }

  return (
    <Field htmlFor="rounding" label="rounding">
      <Box direction="row" align="center">
        <RangeInput
          id="rounding"
          name="rounding"
          max={24}
          min={0}
          step={2}
          value={theme.rounding !== undefined ? theme.rounding : 4}
          onChange={onChange}
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
            value={theme.rounding}
            onChange={onChange}
          />
          <Text>px</Text>
        </Box>
      </Box>
    </Field>
  )
}
