import React, { Fragment, useState } from 'react';
import { Box, Button, Text, TextInput } from 'grommet';
import { Apps, Code, Redo, Share, Undo } from 'grommet-icons';
import Field from './components/Field';
import ActionButton from './components/ActionButton';
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

const ViewButton = ({ label, onClick }) => (
  <Button hoverIndicator onClick={onClick}>
    <Box
      direction="row"
      align="center"
      justify="between"
      gap="small"
      pad={{ vertical: 'small', horizontal: 'medium' }}
      border="bottom"
    >
      <Text>{label}</Text>
    </Box>
  </Button>
);

const Primary = ({ theme, setTheme, setView, onUndo, onRedo }) => (
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
      <Box direction="row">
        <ActionButton
          title="undo last change"
          icon={<Undo />}
          disabled={!onUndo}
          onClick={onUndo}
        />
        <ActionButton
          title="redo last change"
          icon={<Redo />}
          disabled={!onRedo}
          onClick={onRedo}
        />
      </Box>
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
          onChange={(event) => {
            const nextTheme = JSON.parse(JSON.stringify(theme));
            nextTheme.name = event.target.value;
            setTheme(nextTheme);
          }}
        />
      </Field>
      <Rounding theme={theme} setTheme={setTheme} />
      <Spacing theme={theme} setTheme={setTheme} />
      <Font theme={theme} setTheme={setTheme} />
      <ViewButton label="colors" onClick={() => setView('colors')} />
      <ViewButton label="form field" onClick={() => setView('form field')} />
    </Box>
  </Box>
);

export default Primary;
