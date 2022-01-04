import React, { useContext } from 'react';
import { Button, Nav } from 'grommet';
import { RouterContext } from './Router';

const paths = [
  { label: 'list', path: '/list' },
  { label: 'form', path: '/form' },
  { label: 'document', path: '/document' },
];

const AppNav = () => {
  const { push } = useContext(RouterContext);
  return (
    <Nav direction="row">
      {paths.map(({ label, path }) => (
        <Button
          label={label}
          href={path}
          onClick={(event) => {
            event.preventDefault();
            push(path);
          }}
        />
      ))}
    </Nav>
  );
};

export default AppNav;
