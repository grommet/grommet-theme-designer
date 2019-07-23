import React from 'react';
import { Box, Paragraph, Text } from 'grommet';

export default ({ children, label, help, htmlFor, ...rest }) => (
  <Box border="bottom">
    <Box
      direction="row"
      align="center"
      {...rest}
    >
      <Box margin={{ vertical: 'small', right: 'medium' }}>
        <Text as="label" htmlFor={htmlFor}>{label}</Text>
      </Box>
      <Box flex={true}>
        {children}
      </Box>
    </Box>
    {help && (
      <Box margin={{ vertical: 'small' }}>
        <Paragraph color="dark-4" margin="none">{help}</Paragraph>
      </Box>
    )}
  </Box>
);
