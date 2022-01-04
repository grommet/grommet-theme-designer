import React from 'react';
import { Box, Grid, Main } from 'grommet';
import Header from './Header';

const Page = ({ children, ...rest }) => {
  return (
    <Main background="background-back" {...rest}>
      <Grid
        columns={['flex', ['medium', 'xlarge'], 'flex']}
        rows={['flex']}
        areas={[{ name: 'content', start: [1, 0], end: [1, 0] }]}
      >
        <Box gridArea="content" margin={{ horizontal: 'medium' }}>
          <Header />
          {children}
        </Box>
      </Grid>
    </Main>
  );
};

export default Page;
