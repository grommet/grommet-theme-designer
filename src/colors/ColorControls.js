import React from 'react';
import { Box, Text } from 'grommet';
import ColorInput from './ColorInput';

export default ({ color, controls, theme, setTheme }) => {
  return (
    <Box
      width="large"
      direction="row"
      gap="medium"
      align="center"
      justify="between"
    >
      <Text>{color}</Text>
      <Box
        direction="row"
        justify="end"
        gap="small"
        margin={{ vertical: 'xsmall' }}
      >
        {controls}
        <ColorInput
          theme={theme}
          name={color}
          mode="light"
          setTheme={setTheme}
        />
        <ColorInput
          theme={theme}
          name={color}
          mode="dark"
          setTheme={setTheme}
        />
      </Box>
    </Box>
  )
}
