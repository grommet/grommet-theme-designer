import React from 'react';
import {
  Anchor,
  Box,
  Button,
  Footer,
  Grid,
  Header,
  Heading,
  Main,
  Paragraph,
  Text,
} from 'grommet';
import { Ad } from 'grommet-icons';

const Document = ({ theme }) => {
  return (
    <Main background="background-back">
      <Grid
        columns={['flex', ['medium', 'large'], 'flex']}
        rows={['flex']}
        areas={[{ name: 'content', start: [1, 0], end: [1, 0] }]}
      >
        <Box gridArea="content" background="background-front">
          <Header pad="small">
            <Button icon={<Ad />} hoverIndicator />
            <Box direction="row" align="center" gap="small" pad="small">
              <Anchor href="">page 1</Anchor>
              <Anchor href="">page 2</Anchor>
            </Box>
          </Header>
          <Box pad="large">
            <Heading>Crossing the Bar</Heading>
            <Paragraph size="large" style={{ whiteSpace: 'pre-wrap' }}>
              "Twilight and evening bell,{'\n'}
              And after that the dark!{'\n'}
              And may there be no sadness of farewell,{'\n'}
              When I embark;{'\n'}
              For though from out our bourne of Time and Place{'\n'}
              The flood may bear me far,{'\n'}I hope to see my Pilot face to
              face{'\n'}
              When I have crossed the bar."
            </Paragraph>
            <Text>Alfred, Lord Tennyson</Text>
            <Heading level={2}>Notes</Heading>
            <Paragraph>
              The vast natural power of the sea and the ever-present danger to
              men who venture across it keep the line between life and death
              always visible. In Alfred, Lord Tennyson's “Crossing the Bar”
              (1889) the nautical term “crossing the bar” (sailing over the
              sandbar at the entrance to any harbor, setting out to sea) stands
              in for dying, embarking for “the boundless deep.” Tennyson wrote
              that poem just a few years before he died, and at his request, it
              traditionally appears last in any collection of his work.
            </Paragraph>
          </Box>
          <Footer pad="large">
            <Text color="text-weak">&copy; Copyright</Text>
          </Footer>
        </Box>
      </Grid>
    </Main>
  );
};

export default Document;
