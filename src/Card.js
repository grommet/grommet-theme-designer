import React from 'react';
import {
  Anchor, Box, Button, Calendar, Chart, CheckBox, DropButton,
  Form, FormField, Grid,
  Grommet, Heading,
  Menu, Paragraph, RadioButtonGroup, ResponsiveContext,
  Select, Stack, Text, TextInput,
} from 'grommet';
import { FormDown, Search, Trash } from 'grommet-icons';

export default ({ theme }) => {
  const [people, setPeople] = React.useState([
    { name: 'Angus', size: 'large' },
    { name: 'Devon', size: 'small' },
    { name: 'Rupert', size: 'medium' },
  ])
  const [background, setBackground] = React.useState()

  const Swatch = ({ color, ...rest }) => (
    <Box
      flex
      pad="small"
      background={color}
      onClick={(event) => 
        setBackground(event.shiftKey ? undefined : color)
      }
      {...rest} />
  )
  
  const Set = ({ colors, ...rest }) => (
    <Box flex direction="row" {...rest}>
      {colors.map(color => <Swatch key={color} color={color} />)}
    </Box>
  )

  const DatePicker = ({ name, value, onChange }) => {
    const [open, setOpen] = React.useState();
    return (
      <DropButton
        name={name}
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        dropContent={(
          <Calendar
            date={value}
            onSelect={(date) => {
              onChange({ value: date })
              setOpen(false)
            }}
          />
        )}
      >
        <Box
          pad="small"
          direction="row"
          justify="between"
          align="center"
          gap="medium"
        >
          <Text>
            {value ? new Date(value).toLocaleDateString() : "Select date"}
          </Text>
          <FormDown color="brand" />
        </Box>
      </DropButton>
    )
  }

  return (
    <Grommet theme={theme}>
      <Box
        fill="vertical"
        overflow="auto"
        pad="xlarge"
        background={background}
      >
        <Box flex={false} direction="row">
          <Box flex>
            <Heading level={1} size="large" margin="none">
              {theme.name}
            </Heading>
        
            <Box flex="grow" direction="row" margin={{ top: 'medium' }}>
              <Swatch color="brand" />
            <Box flex>
                <Set colors={['accent-1', 'accent-2', 'accent-3', 'accent-4']} />
                <Set colors={['neutral-1', 'neutral-2', 'neutral-3', 'neutral-4']} />
              </Box>
            </Box>
          </Box>
          <Box direction="row">
            <Box>
              {['dark-1', 'dark-2', 'dark-3', 'dark-4',
                'light-4', 'light-3', 'light-2', 'light-1'].map(color => (
                  <Swatch key={color} color={color} flex={false} />
                ))}
            </Box>
            <Box>
              {['status-critical', 'status-warning', 'status-ok', 'status-unknown'].map(color => (
                  <Swatch key={color} color={color} flex={false} />
                ))}
            </Box>
          </Box>
        </Box>

        <Box flex={false}>
          <ResponsiveContext.Consumer>
            {(responsive) => (
              <Grid
                columns={responsive === 'small' ? 'flex' : 'medium'}
                gap="large"
                margin={{ top: 'medium' }}
              >

                <Box>
                  <Heading level={2}>Heading</Heading>
                  <Paragraph>
                    Paragraph - Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. <Anchor>Anchor</Anchor> within.
                  </Paragraph>
                  <Text>Text</Text>
                  <Anchor>Anchor</Anchor>
                  <Box>
                    <Heading level={3} size="small">Chart</Heading>
                    <Stack guidingChild="last">
                      <Box fill>
                        <Box flex border="horizontal" />
                        <Box flex border="bottom" />
                      </Box>
                      <Chart
                        type="line"
                        round
                        bounds={[[0, 4], [0, 100]]}
                        values={[10, 20, 75, 40, 80]}
                      />
                    </Stack>
                  </Box>
                </Box>

                <Box>
                  <Box direction="row" justify="between" align="center">
                    <Heading level={2}>List</Heading>
                    <Menu label="actions" items={[{ label: 'Share' }, { label: 'Save' }]} />
                  </Box>
                  <Box direction="row" margin={{ bottom: 'medium' }}>
                    <TextInput placeholder="Search" />
                    <Button icon={<Search />} hoverIndicator />
                  </Box>
                  {people.map((item, index) => (
                    <Box
                      key={item.name}
                      pad={{ left: "small" }}
                      direction="row"
                      align="center"
                      justify="between"
                      border={index ? 'bottom' : 'horizontal'}
                    >
                      <Text weight="bold">{item.name}</Text>
                      <Button
                        icon={<Trash />}
                        hoverIndicator
                        onClick={() => setPeople(people.filter(p => p.name !== item.name))}
                      />
                    </Box>
                  ))}
                </Box>

                <Form
                  value={{ name: '', local: true, size: 'medium' }}
                  onSubmit={({ value }) => setPeople([...people, value])}
                >
                  <Heading level={2}>Form</Heading>
                  <FormField name="name" label="Name" required />
                  <FormField
                    name="local"
                    pad
                    component={CheckBox}
                    label="Local"
                    reverse
                  />
                  <FormField
                    name="size"
                    label="Size"
                    pad
                    component={RadioButtonGroup}
                    options={['small', 'medium', 'large']}
                  />
                  <FormField
                    name="month"
                    label="Month"
                    component={Select}
                    options={['January', 'February', 'March']}
                  />
                  <FormField
                    name="date"
                    label="Date"
                    component={DatePicker}
                  />
                  <Box direction="row" gap="small" margin={{ top: 'medium' }}>
                    <Button primary label="Submit" type="submit" />
                    <Button label="Cancel" />
                  </Box>
                </Form>

              </Grid>
            )}
          </ResponsiveContext.Consumer>
        </Box>
      </Box>
    </Grommet>
  )
}
