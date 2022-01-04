import React, { useContext, useMemo } from 'react';
import { Grommet } from 'grommet';
import { Router, Routes, Route } from './Router';
import Accessibility from './Accessibility';
import Dashboard from './Dashboard';
import Document from './Document';
import Form from './Form';
import List from './List';
import Typography from './Typography';
import AppContext from '../AppContext';

const App = () => {
  const { theme, themeMode: contextThemeMode } = useContext(AppContext);
  // if the themeMode isn't set at the App level, see what the browser is using
  const themeMode = useMemo(
    () =>
      contextThemeMode ||
      (window.matchMedia &&
        ((window.matchMedia('(prefers-color-scheme: dark)').matches &&
          'dark') ||
          'light')) ||
      undefined,
    [contextThemeMode],
  );

  return (
    <Grommet theme={theme} themeMode={themeMode}>
      <Router>
        <Routes>
          <Route Component={Dashboard} path="/dashboard" unmatchedPath />
          <Route Component={List} path="/list" />
          <Route Component={Form} path="/form" />
          <Route Component={Document} path="/document" />
          <Route Component={Accessibility} path="/accessibility" />
          <Route Component={Typography} path="/typography" />
        </Routes>
      </Router>
    </Grommet>
  );
};

export default App;
