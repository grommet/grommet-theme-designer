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

const Size = ({ name, value, onChange }) => (
  <Box pad="small">
    <RadioButtonGroup
      name={name}
      value={value}
      options={['small', 'medium', 'large']}
      onChange={onChange}
    />
  </Box>
);

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
        <Box gridArea="content">
          <Form value={{ name: '', local: true, size: 'medium' }}>
            <Heading level={2}>Form</Heading>
            <FormField name="name" label="Name" required />
            <FormField name="local" pad component={CheckBox} label="Local" />
            <FormField name="size" label="Size" component={Size} />
            <FormField
              name="month"
              label="Month"
              component={Select}
              options={['January', 'February', 'March']}
            />
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
