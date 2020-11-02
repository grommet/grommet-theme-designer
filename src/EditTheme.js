import React, { useState } from 'react';
import { Box } from 'grommet';
import Primary from './Primary';
import Colors from './colors/Colors';
import FormField from './FormField';

const EditTheme = ({ theme, setTheme }) => {
  const [view, setView] = useState('primary');
  const [changes, setChanges] = useState([]);
  const [changeIndex, setChangeIndex] = useState();

  // add to changes, if needed
  React.useEffect(() => {
    // do this stuff lazily to ride out typing sprees
    const timer = setTimeout(() => {
      // If we already have this design object, we must be doing an undo or
      // redo, and therefore no need to add a change
      if (!changes.some((c) => c.theme === theme)) {
        let nextChanges;
        nextChanges = [...changes];
        nextChanges = nextChanges.slice(changeIndex, 10);
        nextChanges.unshift({ theme });
        setChanges(nextChanges);
        setChangeIndex(0);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [changes, changeIndex, theme]);

  const onUndo = React.useCallback(() => {
    const nextChangeIndex = Math.min(changeIndex + 1, changes.length - 1);
    const { theme: nextTheme } = changes[nextChangeIndex];
    setTheme(nextTheme);
    setChangeIndex(nextChangeIndex);
  }, [changes, changeIndex, setTheme]);

  const onRedo = React.useCallback(() => {
    const nextChangeIndex = Math.max(changeIndex - 1, 0);
    const { theme: nextTheme } = changes[nextChangeIndex];
    setTheme(nextTheme);
    setChangeIndex(nextChangeIndex);
  }, [changes, changeIndex, setTheme]);

  let content;
  if (view === 'primary') {
    content = (
      <Primary
        theme={theme}
        setTheme={setTheme}
        onRedo={changeIndex > 0 ? onRedo : undefined}
        onUndo={changeIndex < changes.length - 1 ? onUndo : undefined}
        setView={setView}
      />
    );
  } else if (view === 'colors') {
    content = <Colors theme={theme} setTheme={setTheme} setView={setView} />;
  } else if (view === 'form field') {
    content = <FormField theme={theme} setTheme={setTheme} setView={setView} />;
  }

  return (
    <Box fill="vertical" overflow="auto" background="dark-1" border="left">
      {content}
    </Box>
  );
};

export default EditTheme;
