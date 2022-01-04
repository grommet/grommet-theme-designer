import React from 'react';
import { Box, Footer, Heading, Paragraph, Text } from 'grommet';
import Page from './Page';

const Document = () => {
  return (
    <Page>
      <Box pad="large" background="background-front">
        <Heading>Crossing the Bar</Heading>
        <Paragraph size="large" style={{ whiteSpace: 'pre-wrap' }}>
          "Twilight and evening bell,{'\n'}
          And after that the dark!{'\n'}
          And may there be no sadness of farewell,{'\n'}
          When I embark;{'\n'}
          For though from out our bourne of Time and Place{'\n'}
          The flood may bear me far,{'\n'}I hope to see my Pilot face to face
          {'\n'}
          When I have crossed the bar."
        </Paragraph>
        <Text>Alfred, Lord Tennyson</Text>
        <Heading level={2}>Notes</Heading>
        <Paragraph>
          The vast natural power of the sea and the ever-present danger to men
          who venture across it keep the line between life and death always
          visible. In Alfred, Lord Tennyson's “Crossing the Bar” (1889) the
          nautical term “crossing the bar” (sailing over the sandbar at the
          entrance to any harbor, setting out to sea) stands in for dying,
          embarking for “the boundless deep.” Tennyson wrote that poem just a
          few years before he died, and at his request, it traditionally appears
          last in any collection of his work.
        </Paragraph>
        <Footer margin={{ top: 'large' }}>
          <Text color="text-weak">&copy; Copyright</Text>
        </Footer>
      </Box>
    </Page>
  );
};

export default Document;
