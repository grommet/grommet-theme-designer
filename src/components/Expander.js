import React from 'react';
import { Box, Button, Text } from 'grommet';
import { FormDown, FormUp } from 'grommet-icons';

const Expander = ({ label, expanded, change }) => (
  <Box pad={{ horizontal: 'medium' }}>
    <Button plain onClick={() => change(!expanded)}>
      {({ hover }) => (
        <Box
          pad={{ top: 'medium', bottom: 'small' }}
          direction="row"
          justify="between"
          align="center"
          border={expanded ? undefined : 'bottom'}
        >
          <Text weight="bold">{label}</Text>
          {expanded
            ? <FormUp color={hover ? 'accent-1' : undefined} />
            : <FormDown color={hover ? 'accent-1' : undefined} />}
        </Box>
      )}
    </Button>
  </Box>
)

export default Expander;
