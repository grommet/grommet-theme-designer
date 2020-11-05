import React, { useState } from 'react';
import { Box, Button, Form, FormField, TextArea } from 'grommet';
import Action from './components/Action';

const Raw = ({ theme, onClose, setTheme }) => {
  const [value, setValue] = useState({ json: JSON.stringify(theme, null, 2) });
  return (
    <Action closeTitle="cancel" onClose={onClose} modal>
      <Form
        value={value}
        onChange={setValue}
        onSubmit={({ value: { json } }) => {
          const nextTheme = JSON.parse(json);
          setTheme(nextTheme);
          onClose();
        }}
      >
        <Box fill>
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
          <Box align="start">
            <Button type="submit" label="Done" />
          </Box>
        </Box>
      </Form>
    </Action>
  );
};

export default Raw;
