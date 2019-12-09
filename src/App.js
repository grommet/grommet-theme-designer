import React, { useCallback, useContext, useEffect, useState } from 'react';
import ReactGA from 'react-ga';
import { Box, Grid, Grommet, ResponsiveContext, Keyboard } from 'grommet';
import { apiUrl, starter, upgradeTheme } from './theme';
import EditTheme from './EditTheme';
import Designs from './Designs';

const getParams = () => {
  const { location } = window;
  const params = {};
  location.search
    .slice(1)
    .split('&')
    .forEach(p => {
      const [k, v] = p.split('=');
      params[k] = decodeURIComponent(v);
    });
  return params;
};

const App = () => {
  const [theme, setTheme] = useState();
  const [themes, setThemes] = useState([]);
  const [themeMode, setThemeMode] = React.useState('light');
  const [Design, setDesign] = useState();
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
        .then(response => response.json())
        .then(nextTheme => {
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
  }, []);

  // load themes
  useEffect(() => {
    const stored = localStorage.getItem('themes');
    if (stored) setThemes(JSON.parse(stored));
  }, []);

  // load editing mode
  useEffect(() => {
    const stored = localStorage.getItem('editing');
    if (stored) setEditing(JSON.parse(stored));
  }, []);

  // store editing mode
  useEffect(() => localStorage.setItem('editing', JSON.stringify(editing)), [
    editing,
  ]);

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

  const onKey = useCallback(
    event => {
      if (event.metaKey) {
        if (event.key === 'e' || event.key === 'E') {
          event.preventDefault();
          setEditing(!editing);
        }
      }
    },
    [editing],
  );

  let columns;
  if (responsive === 'small') columns = 'flex';
  else if (!editing) columns = ['small', 'flex'];
  else columns = ['small', 'flex', ['small', 'medium']];

  return (
    <Grommet full theme={starter}>
      <Keyboard target="document" onKeyDown={onKey}>
        {!theme ? (
          <Box fill justify="center" align="center">
            <Box pad="xlarge" background="dark-2" round animation="pulse" />
          </Box>
        ) : (
          <Grid fill columns={columns} rows="full">
            {responsive !== 'small' && theme && (
              <Designs
                theme={theme}
                design={Design}
                setDesign={setDesign}
                toggleEditing={() => setEditing(!editing)}
                themeMode={themeMode}
                setThemeMode={setThemeMode}
              />
            )}
            {Design && theme ? (
              <Grommet theme={theme} themeMode={themeMode}>
                <Design theme={theme} />
              </Grommet>
            ) : (
              <Box />
            )}
            {responsive !== 'small' && editing && (
              <EditTheme theme={theme} setTheme={setTheme} />
            )}
          </Grid>
        )}
      </Keyboard>
    </Grommet>
  );
};

export default App;
