import React, { useContext, useState } from 'react';
import { Box, Button, Footer, Heading, Layer, Text, TextInput } from 'grommet';
import { FormNext } from 'grommet-icons';
import Field from './components/Field';
import AppContext from './AppContext';
import Rounding from './Rounding';
import Spacing from './Spacing';

const ViewButton = ({ label, onClick }) => (
  <Button hoverIndicator onClick={onClick}>
    <Box
      direction="row"
      align="center"
      justify="between"
      gap="small"
      pad={{ vertical: 'small', start: 'medium', end: 'small' }}
      border="bottom"
    >
      <Text>{label}</Text>
      <FormNext />
    </Box>
  </Button>
);

const Primary = ({ setAspect }) => {
  const { deleteActiveTheme, theme, setTheme } = useContext(AppContext);
  const [confirmDelete, setConfirmDelete] = useState();

  const onDelete = () => {
    setConfirmDelete(undefined);
    deleteActiveTheme();
  };

  const onCancelConfirm = () => setConfirmDelete(undefined);

  return (
    <Box flex="grow" gap="xlarge" justify="between">
      <Box>
        <Field htmlFor="name" label="name">
          <TextInput
            name="name"
            plain
            style={{ textAlign: 'right' }}
            value={theme.name}
            onChange={(event) => {
              const nextTheme = JSON.parse(JSON.stringify(theme));
              nextTheme.name = event.target.value;
              setTheme(nextTheme);
            }}
          />
        </Field>
        <Rounding theme={theme} setTheme={setTheme} />
        <Spacing theme={theme} setTheme={setTheme} />
        <ViewButton label="fonts" onClick={() => setAspect('Fonts')} />
        <ViewButton label="colors" onClick={() => setAspect('Colors')} />
        <ViewButton label="form field" onClick={() => setAspect('FormField')} />
      </Box>
      <Footer pad="medium" justify="center">
        <Button label="delete theme" onClick={() => setConfirmDelete(true)} />
        {confirmDelete && (
          <Layer onEsc={onCancelConfirm} onClickOutside={onCancelConfirm}>
            <Box pad="medium">
              <Heading level="3">Delete {theme.name}?</Heading>
              <Footer>
                <Button primary label="Yes, delete" onClick={onDelete} />
                <Button label="No, cancel delete" onClick={onCancelConfirm} />
              </Footer>
            </Box>
          </Layer>
        )}
      </Footer>
    </Box>
  );
};

export default Primary;
