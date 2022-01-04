import React, { useContext } from 'react';
import { Anchor } from 'grommet';
import { RouterContext } from './Router';

const NavAnchor = ({ path, ...rest }) => {
  const { push } = useContext(RouterContext);
  return (
    <Anchor
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

export default NavAnchor;
