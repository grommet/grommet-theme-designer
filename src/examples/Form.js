import React, { useState } from 'react';
import {
  Box,
  Button,
  CheckBox,
  DateInput,
  Form,
  FormField,
  Grid,
  Heading,
  Main,
  RadioButtonGroup,
  Select,
} from 'grommet';

const ExampleForm = ({ theme }) => {
  const [value, setValue] = useState({ name: '', local: true, size: 'medium' });
  return (
    <Main background="background">
      <Grid
        columns={['flex', 'medium', 'flex']}
        rows={['flex']}
        areas={[{ name: 'content', start: [1, 0], end: [1, 0] }]}
      >
        <Box gridArea="content" margin={{ bottom: 'large' }}>
          <Form value={value} onChange={setValue}>
            <Heading level={2}>Form</Heading>
            <FormField name="name" label="Name" required />
            <FormField name="local">
              <CheckBox name="local" label="Local" />
            </FormField>
            <FormField name="size" label="Size" help="for your T-shirt">
              <RadioButtonGroup
                name="size"
                options={['small', 'medium', 'large']}
              />
            </FormField>
            <FormField name="month" label="Month">
              <Select name="month" options={['January', 'February', 'March']} />
            </FormField>
            <FormField name="date" label="Date">
              <DateInput name="date" format="mm/dd/yyyy" />
            </FormField>
            <Box direction="row" gap="small" margin={{ top: 'medium' }}>
              <Button primary label="Submit" type="submit" />
              <Button label="Cancel" />
            </Box>
          </Form>
        </Box>
      </Grid>
    </Main>
  );
};

export default ExampleForm;
