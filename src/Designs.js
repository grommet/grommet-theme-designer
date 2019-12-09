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
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!activeDesign) setDesign(() => Dashboard);
    }, 500);
    return () => clearTimeout(timer);
  }, [activeDesign, setDesign]);

  // load design based on browser location path
  useEffect(() => {
    const onPopState = () => {
      const {
        location: { pathname },
      } = document;
      const name = pathname.slice(1);
      const example = examples.find(e => e.name === name);
      if (example) {
        setDesign(() => example.Design);
      }
    };

    window.addEventListener('popstate', onPopState);
    onPopState();
    return () => window.removeEventListener('popstate', onPopState);
  }, [setDesign]);

  // update browser location to match design
  useEffect(() => {
    const {
      location: { pathname },
    } = document;
    const example = examples.find(e => e.Design === activeDesign);
    if (example) {
      const path = `/${example.name}`;
      if (path !== pathname)
        window.history.pushState(undefined, undefined, path);
    }
  }, [activeDesign]);

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
