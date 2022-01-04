import React, { useContext, useState } from 'react';
import {
  Box,
  Button,
  Form,
  FormField,
  Header,
  Layer,
  Paragraph,
  TextArea,
} from 'grommet';
import { Close } from 'grommet-icons';
import AppContext from './AppContext';

const Raw = ({ onClose }) => {
  const { theme, setTheme } = useContext(AppContext);
  const [value, setValue] = useState({ json: JSON.stringify(theme, null, 2) });
  return (
    <Layer
      position="top"
      margin="medium"
      modal
      onEsc={onClose}
      onClickOutside={onClose}
    >
      <Box pad="medium" overflow="auto" background="dark-1">
        <Form
          value={value}
          onChange={setValue}
          onSubmit={({ value: { json } }) => {
            const nextTheme = JSON.parse(json);
            setTheme(nextTheme);
            onClose();
          }}
        >
          <Header>
            <Button
              tip="close"
              icon={<Close />}
              hoverIndicator
              onClick={onClose}
            />
            <Button type="submit" primary label="Save" />
          </Header>
          <FormField
            name="json"
            component={TextArea}
            cols={60}
            rows={20}
            validate={(value) => {
              try {
                JSON.parse(value);
              } catch (e) {
                return e.message;
              }
            }}
          />
          <Paragraph size="small">
            If you use this theme in a typescript project, you will need to
            remove a few theme-designer specific properties to avoid type
            conflicts.
          </Paragraph>
        </Form>
      </Box>
    </Layer>
  );
};

export default Raw;
