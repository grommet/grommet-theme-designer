import React from 'react';
import {
  Box,
  Button,
  Calendar,
  CheckBox,
  DropButton,
  Form,
  FormField,
  Grid,
  Heading,
  Main,
  RadioButtonGroup,
  Select,
  Text,
} from 'grommet';
import { FormDown } from 'grommet-icons';

const DatePicker = ({ name, value, onChange }) => {
  const [open, setOpen] = React.useState();
  return (
    <DropButton
      name={name}
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      dropContent={
        <Calendar
          date={value}
          onSelect={date => {
            onChange({ value: date });
            setOpen(false);
          }}
        />
      }
    >
      <Box
        pad="small"
        direction="row"
        justify="between"
        align="center"
        gap="medium"
      >
        <Text weight={value ? 'bold' : undefined}>
          {value ? new Date(value).toLocaleDateString() : 'Select date'}
        </Text>
        <FormDown color="brand" />
      </Box>
    </DropButton>
  );
};

export default ({ theme }) => {
  return (
    <Main background="background">
      <Grid
        columns={['flex', 'medium', 'flex']}
        rows={['flex']}
        areas={[{ name: 'content', start: [1, 0], end: [1, 0] }]}
      >
        <Box gridArea="content" margin={{ bottom: 'large' }}>
          <Form value={{ name: '', local: true, size: 'medium' }}>
            <Heading level={2}>Form</Heading>
            <FormField name="name" label="Name" required />
            <FormField name="local">
              <Box pad="small">
                <CheckBox name="local" label="Local" />
              </Box>
            </FormField>
            <FormField name="size" label="Size" help="for your T-shirt">
              <Box pad="small">
                <RadioButtonGroup
                  name="size"
                  options={['small', 'medium', 'large']}
                />
              </Box>
            </FormField>
            <FormField name="month" label="Month">
              <Select name="month" options={['January', 'February', 'March']} />
            </FormField>
            <FormField name="date" label="Date" component={DatePicker} />
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
