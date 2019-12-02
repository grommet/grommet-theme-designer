import React from 'react';
import {
  Anchor, Box, Button, Calendar, Chart, CheckBox, DropButton,
  Form, FormField, Grid,
  Grommet, Heading,
  Menu, Paragraph, RadioButtonGroup, ResponsiveContext,
  Select, Stack, Text, TextInput,
} from 'grommet';
import {
  Edit, FormDown, Layer, Paint, Search, StatusCriticalSmall, StatusGoodSmall,
  StatusUnknownSmall, StatusWarningSmall,
} from 'grommet-icons';

const StatusIcons = {
  critical: StatusCriticalSmall,
  ok: StatusGoodSmall,
  unknown: StatusUnknownSmall,
  warning: StatusWarningSmall,
}

const Size = ({ name, value, onChange }) => (
  <Box pad="small">
    <RadioButtonGroup
      name={name}
      value={value}
      options={['small', 'medium', 'large']}
      onChange={onChange}
    />
  </Box>
)

const DatePicker = ({ name, value, onChange }) => {
  const [open, setOpen] = React.useState()
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

const ignorePrefixes =
  ['background', 'brand', 'text', 'control', 'border', 'selected', 'active', 'status']

export default ({ theme, onTogglePreview }) => {
  const [people, setPeople] = React.useState([
    { name: 'Angus', size: 'large', status: 'ok' },
    { name: 'Devon', size: 'small', status: 'warning' },
    { name: 'Rupert', size: 'medium', status: 'critical' },
    { name: 'Samantha', size: 'medium', status: 'unknown' },
  ])
  const [themeMode, setThemeMode] = React.useState(theme.defaultMode || 'light')
  const [background, setBackground] = React.useState()
  const [depth, setDepth] = React.useState(0)
  const colors = React.useMemo(() => {
    const result = []
    Object.keys(theme.global.colors).sort().forEach((color) => {
      const [prefix] = color.split('-')
      if (!ignorePrefixes.includes(prefix)) {
        if (result.length === 0 || result[result.length - 1].prefix !== prefix) {
          result.push({ prefix, colors: [] })
        }
        result[result.length - 1].colors.push(color)
      }
    })
    return result
  }, [theme.global.colors])

  const Swatch = ({ color, ...rest }) => (
    <Box
      pad="small"
      background={color}
      title={color}
      onClick={(event) => 
        setBackground(background === color ? undefined : color)
      }
      {...rest} />
  )

  const tileProps = depth > 0 ? {
    background: background || 'background',
    pad: 'medium',
  } : {};

  return (
    <Grommet theme={theme} themeMode={themeMode}>
      <Box
        fill="vertical"
        overflow="auto"
        background={depth > 0 ? 'background-weak' : background}
      >
        <Box flex={false} direction="row" justify="between">
          <Button icon={<Edit />} hoverIndicator onClick={onTogglePreview} />
          <Box direction="row">
            <Button
              icon={<Layer />}
              hoverIndicator
              onClick={() => setDepth(depth > 0 ? 0 : depth + 1)}
            />
            <Button
              icon={<Paint />}
              hoverIndicator
              onClick={() =>
                setThemeMode(themeMode === 'dark' ? 'light' : 'dark')}
            />
          </Box>
        </Box>
        <Box flex={false} pad="xlarge">
          <Box flex={false} direction="row" align="center" justify="between">
            <Heading level={1} size="large" margin="none">
              {theme.name}
            </Heading>
            <Box direction="row" align="center">
              <Box alignSelf="stretch" margin={{ right: 'small' }}>
                <Swatch color='brand' flex pad="medium" />
              </Box>
              {colors.map(({ prefix, colors }) => (
                <Box key={prefix}>
                  {colors.map(color => (
                    <Swatch key={color} color={color} />
                  ))}
                </Box>
              ))}
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

                  <Box {...tileProps}>
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
                          color="brand"
                          round
                          bounds={[[0, 4], [0, 100]]}
                          values={[10, 20, 75, 40, 80]}
                        />
                      </Stack>
                    </Box>
                  </Box>

                  <Box {...tileProps}>
                    <Box direction="row" justify="between" align="center">
                      <Heading level={2}>List</Heading>
                      <Menu label="actions" items={[{ label: 'Share' }, { label: 'Save' }]} />
                    </Box>
                    <Box direction="row" margin={{ bottom: 'medium' }}>
                      <TextInput placeholder="Search" />
                      <Button icon={<Search />} hoverIndicator />
                    </Box>
                    {people.map(({ name, status }, index) => {
                      const StatusIcon = StatusIcons[status]
                      return (
                        <Button key={name} hoverIndicator>
                          <Box
                            pad="small"
                            direction="row"
                            align="center"
                            justify="between"
                            border={index ? 'bottom' : 'horizontal'}
                          >
                            <Text weight="bold">{name}</Text>
                            <StatusIcon color={`status-${status}`} />
                          </Box>
                        </Button>
                      )
                    })}
                  </Box>

                  <Box {...tileProps}>
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
                      />
                      <FormField name="size" label="Size" component={Size} />
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
                  </Box>

                </Grid>
              )}
            </ResponsiveContext.Consumer>
          </Box>
        </Box>
      </Box>
    </Grommet>
  )
}
