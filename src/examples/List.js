import React, { useState } from 'react';
import {
  Box,
  Button,
  Grid,
  Header,
  Heading,
  Layer,
  List,
  Main,
  Menu,
  TextInput,
} from 'grommet';
import { Ad, Close, User } from 'grommet-icons';

const allPeople = [
  { name: 'Angus', size: 'large', status: 'ok' },
  { name: 'Devon', size: 'small', status: 'warning' },
  { name: 'Rupert', size: 'medium', status: 'critical' },
  { name: 'Samantha', size: 'medium', status: 'unknown' },
];

export default ({ theme }) => {
  const [search, setSearch] = useState('');
  const [people, setPeople] = useState(allPeople);
  const [person, setPerson] = useState();
  return (
    <Main background="background">
      <Grid
        columns={['flex', ['medium', 'large'], 'flex']}
        rows={['flex']}
        areas={[{ name: 'content', start: [1, 0], end: [1, 0] }]}
      >
        <Box gridArea="content">
          <Header pad="small">
            <Button icon={<Ad />} hoverIndicator />
            <Menu
              icon={<User />}
              hoverIndicator
              dropAlign={{ right: 'right', top: 'bottom' }}
              items={[{ label: 'Logout' }]}
            />
          </Header>
          <Header margin={{ vertical: 'small' }}>
            <Heading level={1} size="small" margin="none">
              People
            </Heading>
            <Box>
              <TextInput
                placeholder="search"
                value={search}
                onChange={event => {
                  const nextSearch = event.target.value;
                  setSearch(nextSearch);
                  const exp = new RegExp(nextSearch, 'i');
                  setPeople(
                    nextSearch
                      ? people.filter(p => p.name.match(exp))
                      : allPeople,
                  );
                }}
              />
            </Box>
            <Menu label="actions" />
          </Header>
          <List
            data={people}
            primaryKey="name"
            secondaryKey="size"
            onClickItem={({ item }) => setPerson(item)}
          />
          {person && (
            <Layer
              position="top"
              margin="large"
              onEsc={() => setPerson(undefined)}
              onClickOutside={() => setPerson(undefined)}
            >
              <Box pad="large" background="white" round="small">
                <Header>
                  <Heading level={2} margin="none">
                    {person.name}
                  </Heading>
                  <Button
                    icon={<Close />}
                    onClick={() => setPerson(undefined)}
                  />
                </Header>
              </Box>
            </Layer>
          )}
        </Box>
      </Grid>
    </Main>
  );
};
