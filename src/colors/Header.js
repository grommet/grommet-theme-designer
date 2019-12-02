import React from 'react';
import { Box, Heading, Text } from 'grommet';

export default ({ name, help }) => (
  <Box direction="row" align="center" justify="between">
    <Box width="large" direction="row" justify="between" align="center">
      <Heading level={2} margin={{ top: 'none' }}>{name}</Heading>
      <Box flex={false} direction="row" gap="small">
        <Box width="small" pad="small">
          <Text color="text-xweak" textAlign="end">
            light mode
          </Text>
        </Box>
        <Box width="small" pad="small">
          <Text color="text-xweak">dark mode</Text>
        </Box>
      </Box>
    </Box>
    {help}
  </Box>
);
