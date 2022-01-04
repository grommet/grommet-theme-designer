import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, Grommet, Header, Heading, Text } from 'grommet';
import { Add } from 'grommet-icons';
import { starter, upgradeTheme } from './theme';
import AppContext from './AppContext';

const Themes = ({ setAspect }) => {
  const { theme, themes: themeNames, setTheme } = useContext(AppContext);
  // Unlike the 'themes' in the AppContext, which are just names,
  // these are the themes themselves, so we can use them to style the list
  // items.
  const [themes, setThemes] = useState([]);

  useEffect(() => {
    setThemes(
      themeNames
        .map((name) => JSON.parse(localStorage.getItem(name)))
        .filter((t) => t),
    );
  }, [themeNames]);

  const onSelect = (name) => {
    const item = localStorage.getItem(name);
    if (item) {
      const nextTheme = JSON.parse(item);
      upgradeTheme(nextTheme);
      setTheme(nextTheme);
      setAspect('Primary');
    }
  };

  const onNew = () => {
    localStorage.removeItem('activeTheme');
    setTheme(starter);
    setAspect('Primary');
  };

  return (
    <Box>
      <Header pad={{ start: 'small' }} gap="large">
        <Heading level={2} size="small" margin="none">
          themes
        </Heading>
        <Button
          tip="create a new theme"
          icon={<Add />}
          hoverIndicator
          onClick={onNew}
        />
      </Header>
      {themes.map((aTheme) => {
        const { name } = aTheme;
        const current = theme?.name === aTheme.name;
        return (
          <Grommet key={name} theme={aTheme} style={{ height: '100%' }}>
            <Button fill plain onClick={() => onSelect(name)}>
              {({ hover }) => (
                <Box
                  fill
                  direction="row"
                  pad="small"
                  gap="small"
                  background={{
                    color:
                      (hover && 'background-contrast') ||
                      (current && 'active') ||
                      'background',
                    dark: !hover && !current,
                  }}
                >
                  <Box
                    pad="small"
                    background="brand"
                    round={`${aTheme.rounding}px`}
                  />
                  <Text>{name}</Text>
                </Box>
              )}
            </Button>
          </Grommet>
        );
      })}
    </Box>
  );
};

export default Themes;
