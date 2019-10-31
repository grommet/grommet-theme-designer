import React from 'react';
import { Box, Paragraph, Text } from 'grommet';

export default React.forwardRef(
  ({ children, first, label, help, htmlFor, ...rest }, ref) => (
    <Box ref={ref} border="bottom">
      <Box
        direction="row"
        align="center"
        justify="between"
        border={first ? 'horizontal' : 'bottom'}
        pad={{ horizontal: 'medium' }}
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
  ),
);
