import React, { Fragment, useState } from 'react';
import { Box, TextInput } from 'grommet';
import { Apps, Code, Redo, Share, Undo } from 'grommet-icons';
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
  const [changes, setChanges] = React.useState([]);
  const [changeIndex, setChangeIndex] = React.useState();

  // add to changes, if needed
  React.useEffect(() => {
    // do this stuff lazily to ride out typing sprees
    const timer = setTimeout(() => {
      // If we already have this design object, we must be doing an undo or
      // redo, and therefore no need to add a change
      if (!changes.some(c => c.theme === theme)) {
        let nextChanges;
        nextChanges = [...changes];
        nextChanges = nextChanges.slice(changeIndex, 10);
        nextChanges.unshift({ theme });
        setChanges(nextChanges);
        setChangeIndex(0);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [changes, changeIndex, theme]);

  const onUndo = React.useCallback(() => {
    const nextChangeIndex = Math.min(changeIndex + 1, changes.length - 1);
    const { theme: nextTheme } = changes[nextChangeIndex];
    setTheme(nextTheme);
    setChangeIndex(nextChangeIndex);
  }, [changes, changeIndex, setTheme]);

  const onRedo = React.useCallback(() => {
    const nextChangeIndex = Math.max(changeIndex - 1, 0);
    const { theme: nextTheme } = changes[nextChangeIndex];
    setTheme(nextTheme);
    setChangeIndex(nextChangeIndex);
  }, [changes, changeIndex, setTheme]);

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
          <Box direction="row">
            <ActionButton
              title="undo last change"
              icon={<Undo />}
              disabled={!(changeIndex < changes.length - 1)}
              onClick={onUndo}
            />
            <ActionButton
              title="redo last change"
              icon={<Redo />}
              disabled={!(changeIndex > 0)}
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
