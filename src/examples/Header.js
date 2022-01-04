import React, { useContext } from 'react';
import { Box, Header, Menu } from 'grommet';
import { HomeRounded, Add, User } from 'grommet-icons';
import NavButton from './NavButton';
import { RouterContext } from './Router';

const AppHeader = () => {
  const { push } = useContext(RouterContext);
  return (
    <Header>
      <NavButton icon={<HomeRounded />} path="/" />
      <Box direction="row">
        <NavButton icon={<Add />} path="/form" />
        <Menu
          icon={<User />}
          hoverIndicator
          dropAlign={{ right: 'right', top: 'bottom' }}
          items={[
            {
              label: 'Document',
              onClick: (event) => {
                event.preventDefault();
                push('/document');
              },
            },
          ]}
        />
      </Box>
    </Header>
  );
};

export default AppHeader;
