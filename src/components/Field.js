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
        pad={{ horizontal: 'small' }}
        {...rest}
      >
        <Box
          as="label"
          flex={false}
          pad={{ vertical: 'small', horizontal: 'small' }}
          htmlFor={htmlFor}
        >
          <Text>{label}</Text>
        </Box>
        <Box>{children}</Box>
      </Box>
      {help && (
        <Box margin={{ vertical: 'small' }}>
          <Paragraph color="dark-4" margin="none">
            {help}
          </Paragraph>
        </Box>
      )}
    </Box>
  ),
);
