import React from 'react';
import { Box, Button, Grid, Grommet, Stack, Text } from 'grommet';
import { Trash } from 'grommet-icons';
import { starter, upgradeTheme } from './theme';
import Action from './components/Action';
import ActionButton from './components/ActionButton';

const nameToBackground = (name) => {
  let num = 0;
  for (let i = 0; i < name.length; i++) {
    num += name.charCodeAt(i);
  }
  return `accent-${(num % 4) + 1}`;
};

const Themes = ({ theme, onClose, onChange }) => {
  const [themes, setThemes] = React.useState([]);
  const [error, setError] = React.useState();
  const [confirmDelete, setConfirmDelete] = React.useState();

  React.useEffect(() => {
    let item = localStorage.getItem('themes'); // array of names
    if (item) {
      setThemes(JSON.parse(item).map((name) => {
        let theme = localStorage.getItem(name);
        if (theme) {
          try {
            return JSON.parse(theme);
          } catch (e) {
            return { name };
          }
        }
        return { name };
      }));
    }
  }, []);

  const onSelect = (name) => {
    const item = localStorage.getItem(name);
    if (item) {
      const nextTheme = JSON.parse(item);
      upgradeTheme(nextTheme);
      onChange({ theme: nextTheme });
      onClose();
    }
  }

  const onReset = () => {
    localStorage.removeItem('selected');
    localStorage.removeItem('activeTheme');
    onChange({ theme: starter });
    onClose();
  }

  const onDelete = (name) => {
    setConfirmDelete(undefined);
    const nextThemes = themes.map(t => t.name).filter(n => n !== name);
    localStorage.setItem('themes', JSON.stringify(nextThemes));
    localStorage.removeItem(name);
    setThemes(nextThemes);
    if (theme.name === name) {
      localStorage.removeItem('activeTheme');
      onChange({ theme: starter });
    }
  }

  return (
    <Action label="themes" onClose={onClose} full="horizontal">
      <Grid fill="horizontal" columns="small" rows="small" gap="large">
        <Box fill round="medium" >
          <Button fill label="New" onClick={onReset} />
        </Box>
        {themes.map(theme => {
          const name = theme.name;
          const background = (theme.global
            ? theme.global.colors.brand
            : nameToBackground(name))
          return (
            <Stack key={name} fill anchor="bottom-right">
              <Grommet theme={theme} style={{ height: '100%' }}>
                <Box fill round="medium" overflow="hidden">
                  <Button fill plain onClick={() => onSelect(name)}>
                    {({ hover }) => (
                      <Box
                        fill
                        pad="medium"
                        background={hover ? 'light-1' : background}
                        align="center"
                        justify="center"
                      >
                        <Text textAlign="center" size="xlarge" weight="bold">
                          {name}
                        </Text>
                      </Box>
                    )}
                  </Button>
                </Box>
              </Grommet>
              <Box direction="row" gap="small">
                {confirmDelete === name && (
                  <ActionButton
                    title="confirm delete"
                    icon={<Trash color="status-critical" />}
                    hoverIndicator
                    onClick={() => onDelete(name)}
                  />
                )}
                <ActionButton
                  title="delete theme"
                  icon={<Trash color="dark-3" />}
                  hoverIndicator
                  onClick={() => setConfirmDelete(name)}
                />
              </Box>
            </Stack>
          )
        })}
        <Box
          fill
          round="medium"
          overflow="hidden"
          border={{ side: 'all', color: 'dark-3', size: 'medium' }}
        >
          <Stack fill guidingChild="last" interactiveChild="first">
            <input
              style={{ display: 'block', width: '100%', height: '100%' }}
              type="file"
              onChange={(event) => {
                setError(undefined);
                const reader = new FileReader();
                reader.onload = () => {
                  try {
                    const theme = JSON.parse(reader.result);
                    onChange({ theme });
                    onClose();
                  } catch (e) {
                    setError(e.message);
                  }
                };
                reader.readAsText(event.target.files[0]);
              }}
            />
            <Box
                fill
                background="dark-1"
                align="center"
                justify="center"
              >
                <Text>Import</Text>
                {error && (
                  <Box background="status-critical" pad="medium">
                    <Text>{error}</Text>
                  </Box>
                )}
              </Box>
          </Stack>
        </Box>
      </Grid>
    </Action>
  );
};

export default Themes;
