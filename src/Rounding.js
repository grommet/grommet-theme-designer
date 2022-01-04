import React, { useMemo } from 'react';
import { Box, MaskedInput, RangeInput, Text, base } from 'grommet';
import Field from './components/Field';
import { setPath } from './utils';

const Rounding = ({ theme, setTheme }) => {
  const value = useMemo(() => theme?.rounding ?? 4, [theme.rounding]);

  const onChange = (event) => {
    const nextTheme = JSON.parse(JSON.stringify(theme));
    const rounding = parseInt(event.target.value, 10) || 0;
    nextTheme.rounding = rounding;
    const radius = `${rounding}px`;
    setPath(nextTheme, 'global.control.border.radius', radius);
    setPath(nextTheme, 'global.drop.border.radius', radius);
    setPath(nextTheme, 'button.border.radius', radius);
    setPath(nextTheme, 'checkBox.check.radius', radius);
    setPath(nextTheme, 'checkBox.toggle.radius', radius);
    setPath(nextTheme, 'radioButton.check.radius', radius);
    if (!nextTheme.formField) nextTheme.formField = { ...base.formField };
    nextTheme.formField.round = radius;
    setTheme(nextTheme);
  };

  return (
    <Field htmlFor="rounding" label="rounding">
      <Box direction="row" align="center">
        <RangeInput
          id="rounding"
          name="rounding"
          max={24}
          min={0}
          step={2}
          value={value}
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
            mask={[{ length: [1, 2], regexp: /^[0-9]+$/ }]}
            style={{ textAlign: 'right', width: '48px' }}
            value={value}
            onChange={onChange}
          />
          <Text>px</Text>
        </Box>
      </Box>
    </Field>
  );
};

export default Rounding;
