import React, { useEffect } from 'react';
import { Box, Text } from 'grommet';
import { Edit, Info } from 'grommet-icons';
import ActionButton from './components/ActionButton';
import Accessibility from './examples/Accessibility';
import Form from './examples/Form';
import Dashboard from './examples/Dashboard';
import List from './examples/List';

const examples = [
  { name: 'Dashboard', Design: Dashboard },
  { name: 'List', Design: List },
  { name: 'Form', Design: Form },
  { name: 'Accessibility', Design: Accessibility },
];

export default ({
  theme,
  design: activeDesign,
  setDesign,
  toggleEditing,
  toggleThemeMode,
}) => {
  useEffect(() => setDesign(() => Dashboard), [setDesign]);
  return (
    <Box fill="vertical" overflow="auto" background="dark-1" border="right">
      <Box
        flex={false}
        direction="row"
        justify="between"
        align="center"
        pad={{ left: 'small' }}
      >
        <Text weight="bold">{theme.name}</Text>
        <ActionButton
          title="toggle dark/light mode"
          icon={<Info />}
          hoverIndicator
          onClick={toggleThemeMode}
        />
      </Box>
      <Box flex="grow">
        {examples.map(({ name, Design }) => (
          <Box
            key={name}
            pad="small"
            background={Design === activeDesign ? 'selected' : undefined}
            hoverIndicator
            onClick={() => setDesign(() => Design)}
          >
            {name}
          </Box>
        ))}
      </Box>
      <Box flex={false} direction="row" justify="end">
        <ActionButton
          title="edit theme"
          icon={<Edit />}
          hoverIndicator
          onClick={toggleEditing}
        />
      </Box>
    </Box>
  );
};
