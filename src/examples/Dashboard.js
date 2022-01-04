import React, { useContext } from 'react';
import {
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chart,
  Grid,
  Heading,
  Meter,
  Nav,
  Stack,
  Text,
} from 'grommet';
import Page from './Page';
import { RouterContext } from './Router';
import NavAnchor from './NavAnchor';

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
    {values.map((v) => (
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

const Dashboard = () => {
  const { push } = useContext(RouterContext);
  return (
    <Page>
      <Grid
        columns={{ size: 'small', count: 'fit' }}
        rows="small"
        gap="medium"
        margin={{ bottom: 'medium', top: 'small' }}
      >
        {data.map(({ name, value, note }) => (
          <Card
            key={name}
            background="background-front"
            onClick={(event) => {
              event.preventDefault();
              push('/list');
            }}
          >
            <CardHeader pad="small">
              <Heading level={3} size="small" margin="none">
                {name}
              </Heading>
            </CardHeader>
            <CardBody align="start" justify="center" gap="xsmall" pad="small">
              <Text size="xxlarge" weight="bold">
                {value}
              </Text>
              <Meter
                max={Math.pow(10, ('' + value).length)}
                values={[{ value }]}
                round
              />
            </CardBody>
            <CardFooter pad="small" background="background-contrast">
              <Text color="text-xweak">{note}</Text>
            </CardFooter>
          </Card>
        ))}
      </Grid>

      <Card background="background-front">
        <CardHeader pad="small">
          <Heading level={3} size="small" margin="none">
            Latency <Text color="text-xweak">ms</Text>
          </Heading>
        </CardHeader>
        <CardBody gap="xsmall" pad="small">
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
          <Key
            margin="small"
            labels={[
              { color: 'graph-0', label: 'inbound' },
              { color: 'graph-1', label: 'outbound' },
            ]}
          />
        </CardBody>
        <CardFooter background="background-contrast" pad="small">
          <Text color="text-xweak">peak of 2000ms 15 hours ago</Text>
        </CardFooter>
      </Card>
      <Nav direction="row" pad="small" margin={{ top: 'small' }}>
        <NavAnchor label="accessibility" path="/accessibility" />
        <NavAnchor label="typography" path="/typography" />
      </Nav>
    </Page>
  );
};

export default Dashboard;
