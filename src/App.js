import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import ReactGA from 'react-ga';
import {
  Box,
  Grid,
  Grommet,
  grommet,
  ResponsiveContext,
  Keyboard,
} from 'grommet';
import { apiUrl, starter, upgradeTheme } from './theme';
import AppContext from './AppContext';
import Editor from './Editor';
import ExampleApp from './examples/App';

const getParams = () => {
  const { location } = window;
  const params = {};
  location.search
    .slice(1)
    .split('&')
    .forEach((p) => {
      const [k, v] = p.split('=');
      params[k] = decodeURIComponent(v);
    });
  return params;
};

const App = () => {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState();
  const [themes, setThemes] = useState([]);
  const [themeMode, setThemeMode] = useState();
  const [editing, setEditing] = useState(true);
  const responsive = useContext(ResponsiveContext);

  // initialize analytics
  React.useEffect(() => {
    if (window.location.host !== 'localhost') {
      const {
        location: { pathname },
      } = window;
      if (document.domain) {
        ReactGA.initialize('UA-99690204-5');
        ReactGA.pageview(pathname);
      }
    }
  }, []);

  // load initial theme
  useEffect(() => {
    const params = getParams();
    if (params.id) {
      fetch(`${apiUrl}/${params.id}`)
        .then((response) => response.json())
        .then((nextTheme) => {
          upgradeTheme(nextTheme);
          document.title = nextTheme.name;
          setTheme(nextTheme);
          if (nextTheme.defaultMode) setThemeMode(nextTheme.defaultMode);
          ReactGA.event({
            category: 'switch',
            action: 'published theme',
          });
        });
    } else if (params.new) {
      setTheme(starter);
      ReactGA.event({
        category: 'switch',
        action: 'new theme',
      });
      setEditing(true);
    } else {
      let stored = localStorage.getItem('activeTheme');
      if (stored) {
        stored = localStorage.getItem(stored);
      }
      if (stored) {
        const nextTheme = JSON.parse(stored);
        upgradeTheme(nextTheme);
        document.title = nextTheme.name;
        setTheme(nextTheme);
        if (nextTheme.defaultMode) setThemeMode(nextTheme.defaultMode);
        ReactGA.event({
          category: 'switch',
          action: 'previous theme',
        });
      } else {
        setTheme(starter);
        if (starter.defaultMode) setThemeMode(starter.defaultMode);
        ReactGA.event({
          category: 'switch',
          action: 'new theme',
        });
      }
      setEditing(true);
    }
    setLoading(false);
  }, []);

  // load theme names
  useEffect(() => {
    const stored = localStorage.getItem('themes');
    if (stored) {
      const nextThemes = JSON.parse(stored)
        .filter((name) => {
          // check if we still have this theme
          let aTheme = localStorage.getItem(name);
          if (aTheme) {
            try {
              JSON.parse(aTheme);
              return true;
            } catch (e) {
              return false;
            }
          }
          return false;
        })
        // prune out any that we don't have anymore
        .filter((t) => t);

      // store back, in case we removed any
      localStorage.setItem('themes', JSON.stringify(nextThemes));

      setThemes(nextThemes);
    }
  }, []);

  // load editing mode
  useEffect(() => {
    const stored = localStorage.getItem('editing');
    if (stored) setEditing(JSON.parse(stored));
  }, []);

  // store editing mode
  useEffect(
    () => localStorage.setItem('editing', JSON.stringify(editing)),
    [editing],
  );

  // store theme
  useEffect(() => {
    if (theme) {
      // do this stuff lazily, so we don't bog down the UI
      const timer = setTimeout(() => {
        document.title = theme.name;

        localStorage.setItem(theme.name, JSON.stringify(theme));
        localStorage.setItem('activeTheme', theme.name);

        if (!themes.includes(theme.name)) {
          const nextThemes = [theme.name, ...themes];
          localStorage.setItem('themes', JSON.stringify(nextThemes));
          setThemes(nextThemes);
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [theme, themes]);

  // load theme mode
  useEffect(() => {
    const stored = localStorage.getItem('themeMode');
    if (stored) setThemeMode(JSON.parse(stored));
  }, []);

  // store theme mode
  useEffect(() => {
    if (themeMode) localStorage.setItem('themeMode', JSON.stringify(themeMode));
    else localStorage.removeItem('themeMode');
  }, [themeMode]);

  const deleteActiveTheme = useCallback(() => {
    localStorage.removeItem(theme.name);
    localStorage.removeItem('activeTheme');
    // remove from themes list
    const nextThemes = themes.filter((name) => name !== theme.name);
    setThemes(nextThemes);
    localStorage.setItem('themes', JSON.stringify(nextThemes));
    setTheme(undefined);
  }, [theme?.name, themes]);

  const appContextValue = useMemo(
    () => ({
      deleteActiveTheme,
      setTheme,
      setThemeMode,
      theme,
      themeMode,
      themes,
    }),
    [deleteActiveTheme, theme, themeMode, themes],
  );

  const onKey = useCallback(
    (event) => {
      if (event.metaKey) {
        if (event.key === '.') {
          event.preventDefault();
          setEditing(!editing);
        }
      }
    },
    [editing],
  );

  let columns;
  if (responsive === 'small' || !editing) columns = 'flex';
  else columns = ['medium', 'flex'];

  return (
    <AppContext.Provider value={appContextValue}>
      <Grommet full theme={grommet}>
        <Keyboard target="document" onKeyDown={onKey}>
          {loading ? (
            <Box fill justify="center" align="center">
              <Box pad="xlarge" background="dark-2" round animation="pulse" />
            </Box>
          ) : (
            <Grid fill columns={columns} rows="full">
              {responsive !== 'small' && editing && <Editor />}
              {theme && <ExampleApp />}
            </Grid>
          )}
        </Keyboard>
      </Grommet>
    </AppContext.Provider>
  );
};

export default App;
