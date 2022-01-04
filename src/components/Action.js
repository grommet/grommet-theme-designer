import React from 'react';
import { Box, Button, Heading, Layer } from 'grommet';
import { Close } from 'grommet-icons';

const Action = ({ children, closeTitle, label, onClose, ...rest }) => (
  <Layer
    position="top"
    margin="medium"
    modal
    {...rest}
    onEsc={onClose}
    onClickOutside={onClose}
  >
    <Box flex background="dark-1" elevation="medium">
      <Box flex={false} direction="row" align="center" justify="between">
        <Button
          tip={closeTitle || 'close'}
          icon={<Close />}
          hoverIndicator
          onClick={onClose}
        />
        {label && (
          <Heading
            level={2}
            size="small"
            margin={{ vertical: 'none', horizontal: 'large' }}
          >
            {label}
          </Heading>
        )}
      </Box>
      <Box
        flex
        pad={{ horizontal: 'large', bottom: 'large' }}
        align="start"
        overflow="auto"
      >
        {children}
      </Box>
    </Box>
  </Layer>
);

export default Action;
