import React, { useContext } from 'react';
import { Button } from 'grommet';
import { RouterContext } from './Router';

const NavButton = ({ path, ...rest }) => {
  const { push } = useContext(RouterContext);
  return (
    <Button
      {...rest}
      hoverIndicator
      href={path}
      onClick={(event) => {
        event.preventDefault();
        push(path);
      }}
    />
  );
};

export default NavButton;
