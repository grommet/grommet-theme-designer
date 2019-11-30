import React from 'react';
import { Box, Button, Grid, Grommet, Stack, Text } from 'grommet';
import { Trash } from 'grommet-icons';
import { starter, upgradeTheme } from './theme';
import Action from './components/Action';
import ActionButton from './components/ActionButton';

const Themes = ({ theme, onClose, setTheme }) => {
  const [themes, setThemes] = React.useState([]);
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
      setTheme(nextTheme);
      onClose();
    }
  }

  const onReset = () => {
    localStorage.removeItem('selected');
    localStorage.removeItem('activeTheme');
    setTheme(starter);
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
      setTheme(starter);
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
          return (
            <Stack key={name} fill anchor="bottom-right">
              <Grommet theme={theme} style={{ height: '100%' }}>
                <Box fill round="medium" overflow="hidden">
                  <Button fill plain onClick={() => onSelect(name)}>
                    {({ hover }) => (
                      <Box
                        fill
                        pad="medium"
                        background={hover ? 'light-1' : 'brand'}
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
      </Grid>
    </Action>
  );
};

export default Themes;
