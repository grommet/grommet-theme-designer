import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Box, Button } from 'grommet';
import {
  Code,
  Compass,
  Menu,
  Moon,
  Redo,
  Share,
  Sun,
  Undo,
} from 'grommet-icons';
import LayerButton from './components/LayerButton';
import AppContext from './AppContext';
import Themes from './Themes';
import Raw from './Raw';
import Sharer from './Share';
import Primary from './Primary';
import Fonts from './Fonts';
import Colors from './colors/Colors';
import FormField from './FormField';

const themeModeIcons = {
  dark: <Moon />,
  light: <Sun />,
};

const aspects = {
  Primary: Primary,
  Fonts: Fonts,
  Colors: Colors,
  FormField: FormField,
  Themes: Themes,
};

const Editor = () => {
  const { setTheme, setThemeMode, theme, themeMode } = useContext(AppContext);
  const [aspect, setAspect] = useState('Primary');
  const [changes, setChanges] = useState([]);
  const [changeIndex, setChangeIndex] = useState();

  // add to changes, if needed
  useEffect(() => {
    if (!theme) return;
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

  const onUndo = useCallback(() => {
    const nextChangeIndex = Math.min(changeIndex + 1, changes.length - 1);
    const { theme: nextTheme } = changes[nextChangeIndex];
    setTheme(nextTheme);
    setChangeIndex(nextChangeIndex);
  }, [changes, changeIndex, setTheme]);

  const onRedo = useCallback(() => {
    const nextChangeIndex = Math.max(changeIndex - 1, 0);
    const { theme: nextTheme } = changes[nextChangeIndex];
    setTheme(nextTheme);
    setChangeIndex(nextChangeIndex);
  }, [changes, changeIndex, setTheme]);

  // const onDelete = (name) => {
  //   setConfirmDelete(undefined);
  //   const nextThemes = themes.map((t) => t.name).filter((n) => n !== name);
  //   localStorage.setItem('themes', JSON.stringify(nextThemes));
  //   localStorage.removeItem(name);
  //   setThemes(nextThemes);
  //   if (theme.name === name) {
  //     localStorage.removeItem('activeTheme');
  //     setTheme(starter);
  //   }
  // };

  const nextThemeMode = useMemo(() => {
    if (themeMode === 'dark') return undefined;
    else if (themeMode === 'light') return 'dark';
    return 'light';
  }, [themeMode]);

  const Aspect = aspects[theme ? aspect : 'Themes'];

  return (
    <Box fill="vertical" overflow="auto" background="dark-1" border="right">
      <Box
        flex={false}
        direction="row"
        justify="between"
        gap="small"
        border="bottom"
      >
        <Button
          tip={
            aspect === 'Themes' && theme
              ? `return to ${theme.name}`
              : 'show my themes'
          }
          icon={<Menu />}
          disabled={!theme}
          onClick={() => setAspect(aspect === 'Themes' ? 'Primary' : 'Themes')}
        />
        <Box direction="row">
          <Button
            tip="undo last change"
            icon={<Undo />}
            disabled={changeIndex >= changes.length - 1}
            onClick={onUndo}
          />
          <Button
            tip="redo last change"
            icon={<Redo />}
            disabled={changeIndex <= 0}
            onClick={onRedo}
          />
        </Box>
        <Button
          tip={`change theme mode to ${nextThemeMode || 'follow browser'}`}
          icon={themeModeIcons[themeMode] || <Compass />}
          onClick={() => setThemeMode(nextThemeMode)}
        />
        <LayerButton tip="edit raw JSON" icon={<Code />} Layer={Raw} />
        <LayerButton tip="share" icon={<Share />} Layer={Sharer} />
      </Box>
      <Aspect setAspect={setAspect} />
    </Box>
  );
};

export default Editor;
