import React, { useState } from 'react';
import {
  Box,
  Button,
  Header,
  Heading,
  Layer,
  List,
  Menu,
  TextInput,
} from 'grommet';
import { Close } from 'grommet-icons';
import Page from './Page';

const allPeople = [
  { name: 'Angus', size: 'large', status: 'ok' },
  { name: 'Devon', size: 'small', status: 'warning' },
  { name: 'Rupert', size: 'medium', status: 'critical' },
  { name: 'Samantha', size: 'medium', status: 'unknown' },
];

const ExampleList = () => {
  const [search, setSearch] = useState('');
  const [people, setPeople] = useState(allPeople);
  const [person, setPerson] = useState();
  return (
    <Page>
      <Header margin={{ vertical: 'small' }}>
        <Heading level={1} size="small" margin="none">
          People
        </Heading>
        <Box>
          <TextInput
            placeholder="search"
            value={search}
            onChange={(event) => {
              const nextSearch = event.target.value;
              setSearch(nextSearch);
              const exp = new RegExp(nextSearch, 'i');
              setPeople(
                nextSearch
                  ? people.filter((p) => p.name.match(exp))
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
              <Button icon={<Close />} onClick={() => setPerson(undefined)} />
            </Header>
          </Box>
        </Layer>
      )}
    </Page>
  );
};

export default ExampleList;
