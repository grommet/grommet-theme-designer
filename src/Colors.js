import React, { Fragment } from 'react';
import { Box, Heading, MaskedInput, Text, base, grommet } from 'grommet';
import Field from './components/Field';
import Expander from './components/Expander';

const getColor = (theme, name) => (
  theme.global.colors[name] !== undefined ? theme.global.colors[name]
    : (grommet.global.colors[name] || base.global.colors[name]))


const ColorInput = ({ value, onChangeColor})=> (
  <input
    type="color"
    value={value}
    onChange={(event)=>{onChangeColor(event.target.value)}}
  >
  </input>
)

const ColorField = ({ theme, color, setTheme }) => (
  <Field htmlFor={color} label={color}>
    <Box direction="row" align="center">
      <MaskedInput
        name={color}
        plain
        style={{ textAlign: 'right' }}
        mask={[
          { fixed: '#' },
          { length: 6, placeholder: 'rrggbb', regexp: /^[0-9a-zA-Z]+$/ },
        ]}
        value={getColor(theme, color)}
        onChange={(event) => {
          const nextTheme = JSON.parse(JSON.stringify(theme));
          nextTheme.global.colors[color] = event.target.value;
          setTheme(nextTheme);
        }}
      />
      <ColorInput
        value={getColor(theme, color)}
        onChangeColor={(colorVal)=>{
          const nextTheme = JSON.parse(JSON.stringify(theme));
          nextTheme.global.colors[color] = colorVal;
          onChange({ theme: nextTheme });
        }}
      ></ColorInput>
    </Box>
  </Field>
)

const ContextColor = ({ color, context, theme, setTheme }) => (
  <Box
    direction="row"
    align="center"
    background={`${context}-1`}
    pad={{ horizontal: 'small' }}
  >
    <Text>{context}</Text>
    <MaskedInput
      name={`${color}-${context}`}
      plain
      style={{ textAlign: 'right' }}
      mask={[
        { fixed: '#' },
        { length: 6, placeholder: 'rrggbb', regexp: /^[0-9a-zA-Z]+$/ },
      ]}
      value={getColor(theme, color)[context]}
      onChange={(event) => {
        const nextTheme = JSON.parse(JSON.stringify(theme));
        if (!nextTheme.global.colors[color]) {
          nextTheme.global.colors[color] = {};
        }
        nextTheme.global.colors[color][context] = event.target.value;
        setTheme(nextTheme);
      }}
    />
    <Box pad="small" background={{ color, dark: (context !== 'light') }} />
  </Box>
)

const ObjectColorField = ({ theme, color, setTheme }) => (
  <Field direction="column" align="stretch" htmlFor={color} label={color}>
    <ContextColor context="light" color={color} theme={theme} setTheme={setTheme} />
    <ContextColor context="dark" color={color} theme={theme} setTheme={setTheme} />
  </Field>
)

export default ({ theme, setTheme }) => {
  const [editColors, setEditColors] = React.useState(false)
  const [editMoreColors, setEditMoreColors] = React.useState(false)

  return (
    <Fragment>
      <Box pad={{ horizontal: 'medium' }}>
        <Heading level={2} size="small">Color</Heading>
      </Box>
      <ColorField theme={theme} color='brand' setTheme={setTheme} />
      <Expander label="Colors" expanded={editColors} change={setEditColors} />
      {editColors && (
        <Fragment>
          <Box pad={{ horizontal: 'medium' }}>
            <Heading level={3}>Accent</Heading>
          </Box>
          {['accent-1', 'accent-2', 'accent-3', 'accent-4'].map(color => (
            <ColorField key={color} theme={theme} color={color} setTheme={setTheme} />
          ))}
          <Box pad={{ horizontal: 'medium' }}>
            <Heading level={3}>Neutral</Heading>
          </Box>
          {['neutral-1', 'neutral-2', 'neutral-3', 'neutral-4',
          ].map(color => (
            <ColorField key={color} theme={theme} color={color} setTheme={setTheme} />
          ))}
          <Expander label="More Colors" expanded={editMoreColors} change={setEditMoreColors} />
          {editMoreColors && (
            <Fragment>
              <Box pad={{ horizontal: 'medium' }}>
                <Heading level={3}>Shades</Heading>
              </Box>
              {['dark-1', 'dark-2', 'dark-3', 'dark-4',
                'light-1', 'light-2', 'light-3', 'light-4',
              ].map(color => (
                <ColorField key={color} theme={theme} color={color} setTheme={setTheme} />
              ))}
              <Box pad={{ horizontal: 'medium' }}>
                <Heading level={3}>Status</Heading>
              </Box>
              {['status-critical', 'status-warning', 'status-ok', 'status-unknown',
              ].map(color => (
                <ColorField key={color} theme={theme} color={color} setTheme={setTheme} />
              ))}
              <Box pad={{ horizontal: 'medium' }}>
                <Heading level={3}>Chrome</Heading>
              </Box>
              {['border', 'control', 'text'].map(color => (
                <ObjectColorField key={color} theme={theme} color={color} setTheme={setTheme} />
              ))}
              {['background', 'focus'].map(color => (
                <ColorField key={color} theme={theme} color={color} setTheme={setTheme} />
              ))}
            </Fragment>
          )}
        </Fragment>
      )}
    </Fragment>
  )
}
