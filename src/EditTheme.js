import React, { Fragment, useState } from 'react';
import { Box, TextInput } from 'grommet';
import { Apps, Code, Share } from 'grommet-icons';
import Field from './components/Field';
import ActionButton from './components/ActionButton';
import Colors from './colors/Colors';
import Font from './Font';
import Rounding from './Rounding';
import Spacing from './Spacing';
import Themes from './Themes';
import Raw from './Raw';
import Sharer from './Share';

const Actioner = ({ Icon, Modal, theme, title, setTheme }) => {
  const [show, setShow] = useState();
  return (
    <Fragment>
      <ActionButton
        title={title}
        icon={<Icon />}
        hoverIndicator
        onClick={() => setShow(true)}
      />
      {show && (
        <Modal
          theme={theme}
          setTheme={setTheme}
          onClose={() => setShow(false)}
        />
      )}
    </Fragment>
  );
};

export default ({ theme, setTheme }) => {
  return (
    <Box fill="vertical" overflow="auto" background="dark-1" border="left">
      <Box flex={false}>
        <Box
          flex={false}
          direction="row"
          justify="between"
          gap="small"
          border="bottom"
        >
          <Actioner
            title="choose another theme"
            Icon={Apps}
            Modal={Themes}
            theme={theme}
            setTheme={setTheme}
          />
          <Actioner
            title="see JSON"
            Icon={Code}
            Modal={Raw}
            theme={theme}
            setTheme={setTheme}
          />
          <Actioner
            title="share"
            Icon={Share}
            Modal={Sharer}
            theme={theme}
            setTheme={setTheme}
          />
        </Box>
        <Box margin={{ bottom: 'xlarge' }}>
          <Field htmlFor="name" label="name">
            <TextInput
              name="name"
              plain
              style={{ textAlign: 'right' }}
              value={theme.name}
              onChange={event => {
                const nextTheme = JSON.parse(JSON.stringify(theme));
                nextTheme.name = event.target.value;
                setTheme(nextTheme);
              }}
            />
          </Field>
          <Rounding theme={theme} setTheme={setTheme} />
          <Spacing theme={theme} setTheme={setTheme} />
          <Font theme={theme} setTheme={setTheme} />
          <Colors theme={theme} setTheme={setTheme} />
        </Box>
      </Box>
    </Box>
  );
};
