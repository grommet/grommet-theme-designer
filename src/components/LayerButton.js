import React, { Fragment, useState } from 'react';
import { Button } from 'grommet';

const LayerButton = ({ Layer, ...rest }) => {
  const [show, setShow] = useState();
  return (
    <Fragment>
      <Button {...rest} hoverIndicator onClick={() => setShow(true)} />
      {show && <Layer onClose={() => setShow(false)} />}
    </Fragment>
  );
};

export default LayerButton;
