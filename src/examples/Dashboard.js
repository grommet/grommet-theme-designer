import React from 'react';
import {
  Box,
  Button,
  Chart,
  Grid,
  Header,
  Heading,
  Main,
  Menu,
  Meter,
  Stack,
  Text,
  TextInput,
} from 'grommet';
import { Ad, User } from 'grommet-icons';

const data = [
  { name: 'Clients', value: 27, note: 'added 2 today' },
  { name: 'Sites', value: 2, note: 'all good' },
  { name: 'Events', value: 270, note: 'client A joined 5m ago' },
];

const chartInboundValues = [10, 40, 60, 90, 70, 80, 50, 70].map((v, i) => ({
  value: [i, v],
}));

const chartOutboundValues = [45, 20, 25, 40, 35, 50, 20, 15].map((v, i) => ({
  value: [i, v],
}));

const Axis = ({ values, ...rest }) => (
  <Box justify="between" {...rest}>
    {values.map(v => (
      <Text key={v} size="small" color="text-xweak">
        {v}
      </Text>
    ))}
  </Box>
);

const Key = ({ labels, ...rest }) => (
  <Box direction="row" align="center" justify="end" gap="medium" {...rest}>
    {labels.map(({ color, label }) => (
      <Box
        key={label}
        align="center"
        justify="center"
        direction="row"
        gap="xsmall"
      >
        <Box
          align="center"
          justify="center"
          pad="xsmall"
          background={{ color }}
          round="full"
        />
        <Text size="small" color="text-xweak">
          {label}
        </Text>
      </Box>
    ))}
  </Box>
);

export default ({ theme }) => {
  return (
    <Main background="background-back">
      <Grid
        columns={['flex', ['medium', 'xlarge'], 'flex']}
        rows={['flex']}
        areas={[{ name: 'content', start: [1, 0], end: [1, 0] }]}
      >
        <Box gridArea="content">
          <Header pad="small">
            <Button icon={<Ad />} hoverIndicator />
            <Box>
              <TextInput placeholder="search ..." />
            </Box>
            <Menu
              icon={<User />}
              hoverIndicator
              dropAlign={{ right: 'right', top: 'bottom' }}
              items={[{ label: 'Logout' }]}
            />
          </Header>
          <Grid
            columns={{ size: 'small', count: 'fit' }}
            rows="small"
            gap="medium"
            margin="medium"
          >
            {data.map(({ name, value, note }) => (
              <Box
                key={name}
                background="background-front"
                round="small"
                overflow="hidden"
              >
                <Box flex pad="small">
                  <Heading level={3} size="small" margin="none">
                    {name}
                  </Heading>
                  <Box flex align="start" justify="center" gap="xsmall">
                    <Text size="xxlarge" weight="bold">
                      {value}
                    </Text>
                    <Meter
                      max={Math.pow(10, ('' + value).length)}
                      values={[{ value }]}
                      round
                    />
                  </Box>
                </Box>
                <Box pad="small" background="background-contrast">
                  <Text color="text-xweak">{note}</Text>
                </Box>
              </Box>
            ))}
          </Grid>

          <Box
            background="background-front"
            margin="medium"
            round="small"
            overflow="hidden"
          >
            <Box pad="small">
              <Heading level={3} size="small" margin="none">
                Latency <Text color="text-xweak">ms</Text>
              </Heading>
              <Box justify="start" direction="column" gap="xsmall">
                <Stack guidingChild="last" fill={false}>
                  <Chart
                    type="area"
                    values={chartInboundValues}
                    bounds={[
                      [0, 7],
                      [0, 100],
                    ]}
                    overflow={true}
                    thickness="xsmall"
                    round={false}
                    color={{ color: 'graph-0', opacity: 'medium' }}
                    size="full"
                  />
                  <Chart
                    type="line"
                    values={chartInboundValues}
                    bounds={[
                      [0, 7],
                      [0, 100],
                    ]}
                    overflow={true}
                    thickness="xsmall"
                    round={true}
                    color={{ color: 'graph-0' }}
                    size="full"
                  />
                  <Chart
                    type="point"
                    values={[{ value: [3, 90] }]}
                    bounds={[
                      [0, 7],
                      [0, 100],
                    ]}
                    overflow={true}
                    thickness="small"
                    round={true}
                    color={{ color: 'text', opacity: 'medium' }}
                    size="full"
                  />
                  <Axis
                    align="end"
                    height="xsmall"
                    pad={{ right: 'xsmall' }}
                    values={[2000, 1000, 0]}
                  />
                </Stack>
                <Stack guidingChild="last">
                  <Chart
                    type="area"
                    values={chartOutboundValues}
                    bounds={[
                      [0, 7],
                      [0, 100],
                    ]}
                    style={{ transform: 'rotate(180deg)' }}
                    color={{ color: 'graph-1', opacity: 'medium' }}
                    thickness="xsmall"
                    round={false}
                    size="full"
                    overflow={true}
                  />
                  <Chart
                    type="line"
                    values={chartOutboundValues}
                    bounds={[
                      [0, 7],
                      [0, 100],
                    ]}
                    style={{ transform: 'rotate(180deg)' }}
                    color={{ color: 'graph-1' }}
                    thickness="xsmall"
                    round={true}
                    size="full"
                    overflow={true}
                  />
                  <Chart
                    type="point"
                    values={[{ value: [5, 50] }]}
                    bounds={[
                      [0, 7],
                      [0, 100],
                    ]}
                    style={{ transform: 'rotate(180deg)' }}
                    color={{ color: 'text', opacity: 'medium' }}
                    thickness="small"
                    round={true}
                    size="full"
                    overflow={true}
                  />
                  <Axis
                    align="end"
                    height="xxsmall"
                    pad={{ right: 'xsmall' }}
                    values={[0, 1000]}
                  />
                </Stack>
                <Axis
                  align="start"
                  direction="row"
                  border={{ side: 'top' }}
                  pad={{ horizontal: 'xsmall' }}
                  values={['-24h', '-12h', 'now']}
                />
              </Box>
            </Box>
            <Key
              margin="small"
              labels={[
                { color: 'graph-0', label: 'inbound' },
                { color: 'graph-1', label: 'outbound' },
              ]}
            />
            <Box background="background-contrast" pad="small">
              <Text color="text-xweak">peak of 2000ms 15 hours ago</Text>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Main>
  );
};
