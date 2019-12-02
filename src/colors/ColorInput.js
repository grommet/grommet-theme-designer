import React from 'react';
import { Box, TextInput } from 'grommet';
import { getColor } from './utils';

export default ({ theme, name, mode, setTheme }) => {
  const value = getColor(theme, name, mode);
  const single = typeof theme.global.colors[name] !== "object";

  const set = React.useCallback((nextValue) => {
    const nextTheme = JSON.parse(JSON.stringify(theme));
    const unset = nextValue === 'same as light' || !nextValue;
    if (!single && !unset) {
      nextTheme.global.colors[name][mode] = nextValue;
    } else if (single && mode === 'light') {
      nextTheme.global.colors[name] = nextValue;
    } else if (single && mode === 'dark' && !unset) {
      const lightValue = nextTheme.global.colors[name];
      nextTheme.global.colors[name] = {
        light: lightValue, dark: nextValue,
      };
    } else if (!single && mode === 'dark' && unset) {
      nextTheme.global.colors[name] = nextTheme.global.colors[name].light;
    }
    setTheme(nextTheme);
  }, [mode, name, theme, single, setTheme]);

  const suggestions = Object.keys(theme.global.colors)
    .filter(n => ((single && mode === 'dark')
      || n.startsWith(value))).sort()
  if (mode === 'dark') suggestions.unshift('same as light');

  return (
    <Box basis="small" flex={false}>
      <TextInput
        name={mode ? `${name}-${mode}` : name}
        style={mode === 'light' ? { textAlign: 'right' } : undefined}
        suggestions={suggestions}
        value={(single && mode === 'dark') ? '' : value}
        onChange={(event) => set(event.target.value)}
        onSelect={(event) => set(event.suggestion)}
      />
    </Box>
  );
};
