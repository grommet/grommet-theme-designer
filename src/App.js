import React, { Fragment, useCallback, useContext, useEffect, useState } from 'react';
import { Box, Grid, Grommet, ResponsiveContext, Keyboard, grommet } from 'grommet';
import { Apps, Code, Share } from 'grommet-icons';
import { apiUrl, starter, upgradeTheme } from './theme';
import ActionButton from './components/ActionButton';
import Card from './Card';
import Primary from './Primary';
import Themes from './Themes';
import Raw from './Raw';
import Sharer from './Share';

const getParams = () => {
  const { location } = window;
  const params = {};
  location.search.slice(1).split('&').forEach(p => {
    const [k, v] = p.split('=');
    params[k] = decodeURIComponent(v);
  });
  return params;
}

const Actioner = ({ Icon, Modal, theme, title, setTheme }) => {
  const [show, setShow] = useState();
  return (
    <Fragment>
      <ActionButton
        title={title}
        icon={<Icon />}
        hoverIndicator
        onClick={() => setShow(true)}
      />
      {show && (
        <Modal theme={theme} setTheme={setTheme} onClose={() => setShow(false)} />
      )}
    </Fragment>
  );
}

const App = () => {
  const [theme, setTheme] = useState();
  const [themes, setThemes] = useState([]);
  const [preview, setPreview] = useState(true);
  const responsive = useContext(ResponsiveContext);

  // load initial
  useEffect(() => {
    const params = getParams();
    if (params.id) {
      fetch(`${apiUrl}/${params.id}`)
      .then(response => response.json())
      .then((nextTheme) => {
        upgradeTheme(nextTheme);
        document.title = nextTheme.name;
        setTheme(nextTheme);
      });
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
      } else {
        setTheme(starter);
      }
      setPreview(false);
    }
    const stored = localStorage.getItem('themes');
    if (stored) {
      setThemes(JSON.parse(stored));
    }
  }, []);

  // store theme
  useEffect(() => {
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
  }, [theme, themes]);

  const onKey = useCallback((event) => {
    if (event.metaKey) {
      if (event.key === 'e' || event.key === 'E') {
        event.preventDefault();
        setPreview(!preview);
      }
    }
  }, [preview]);

  return (
    <Grommet full theme={grommet}>
      <Keyboard target="document" onKeyDown={onKey}>
        {!theme ? (
          <Box fill justify="center" align="center">
            <Box pad="xlarge" background="dark-2" round animation="pulse" />
          </Box>
        ) : (
          <Grid
            fill
            columns={(responsive === 'small' || preview)
              ? 'flex' : [['small', 'medium'], 'flex']}
            rows='full'
          >
            {responsive !== 'small' && !preview && (
              <Box
                fill="vertical"
                overflow="auto"
                background="dark-1"
                border="right"
              >
                <Box flex={false}>
                  <Box
                    flex={false}
                    direction="row"
                    justify="between"
                    gap="small"
                    border="bottom"
                  >
                    <Actioner
                      title="choose another theme"
                      Icon={Apps}
                      Modal={Themes}
                      theme={theme}
                      setTheme={setTheme}
                    />
                    <Actioner
                      title="see JSON"
                      Icon={Code}
                      Modal={Raw}
                      theme={theme}
                      setTheme={setTheme}
                    />
                    <Actioner
                      title="share"
                      Icon={Share}
                      Modal={Sharer}
                      theme={theme}
                      setTheme={setTheme}
                    />
                  </Box>
                  <Primary theme={theme} setTheme={setTheme} />
                </Box>
              </Box>
            )}
            <Card theme={theme} />
          </Grid>
        )}
      </Keyboard>
    </Grommet>
  );
}

export default App;
