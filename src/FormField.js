import React, { useCallback } from 'react';
import {
  Box,
  Button,
  Heading,
  RadioButtonGroup,
  Select,
  Text,
  base,
} from 'grommet';
import { Close } from 'grommet-icons';
import Field from './components/Field';

const sizes = ['xsmall', 'small', 'medium', 'large'];

const Label = ({ value }) => (
  <Box pad="small">
    <Text weight="bold" truncate>
      {(typeof value !== 'string' ? JSON.stringify(value) : value) || ''}
    </Text>
  </Box>
);

export default ({ theme, setTheme, setView }) => {
  const formField = theme.formField || base.formField;
  const cloneTheme = useCallback(() => {
    const nextTheme = JSON.parse(JSON.stringify(theme));
    if (!nextTheme.formField) nextTheme.formField = { ...base.formField };
    return nextTheme;
  }, [theme]);
  const colors = Object.keys(theme.global.colors).sort();

  const getValue = (
    name,
    obj = theme.formField || base.formField,
    parent,
    create,
  ) => {
    const parts = name.split('.');
    if (!obj[parts[0]] && create) obj[parts[0]] = {};
    const sub = obj[parts[0]];
    if ((parent && parts.length > 2) || (!parent && parts.length > 1)) {
      return getValue(parts.slice(1).join('.'), sub, parent, create);
    }
    return sub;
  };

  const setValue = (name, value) => {
    const nextTheme = cloneTheme();
    const obj = getValue(name, nextTheme.formField, true, true);
    const prop = name.split('.').slice(-1)[0];
    if (value === 'undefined') delete obj[prop];
    else obj[prop] = value;
    setTheme(nextTheme);
  };

  const SelectField = ({ name, options }) => {
    const value = getValue(name);
    return (
      <Field
        label={name
          .split('.')
          .slice(1)
          .join(' ')}
        htmlFor={name}
      >
        <Select
          id={name}
          name={name}
          plain
          options={value ? options.concat(['undefined']) : options}
          value={value}
          valueLabel={<Label value={value} />}
          onChange={event => setValue(name, event.option)}
        />
      </Field>
    );
  };

  const Fields = ({ children, label }) => (
    <Box>
      <Box pad="medium">
        <Heading level={3} size="small" margin="none">
          {label}
        </Heading>
      </Box>
      {children}
    </Box>
  );

  const TextProps = ({ aspect }) => (
    <Fields label={aspect}>
      <SelectField name={`${aspect}.size`} options={sizes} />
      <SelectField name={`${aspect}.weight`} options={['normal', 'bold']} />
      <SelectField name={`${aspect}.color`} options={colors} />
      <SelectField name={`${aspect}.margin.horizontal`} options={sizes} />
      <SelectField name={`${aspect}.margin.vertical`} options={sizes} />
    </Fields>
  );

  return (
    <Box flex={false}>
      <Box
        pad={{ left: 'medium' }}
        direction="row"
        align="center"
        justify="between"
        gap="medium"
      >
        <Heading level={3} size="small" margin="none">
          Form Field
        </Heading>
        <Button
          icon={<Close />}
          hoverIndicator
          onClick={() => setView('primary')}
        />
      </Box>

      <Fields label="border">
        <Field label="position">
          <Box pad="small">
            <RadioButtonGroup
              direction="row"
              gap="medium"
              name="border.position"
              options={['inner', 'outer']}
              value={formField.border.position}
              onChange={event => {
                const nextTheme = cloneTheme();
                nextTheme.formField.border.position = event.target.value;
                setTheme(nextTheme);
              }}
            />
          </Box>
        </Field>
        <SelectField name="border.color" options={colors} />
        <SelectField
          name="border.side"
          options={[
            'horizontal',
            'vertical',
            'top',
            'bottom',
            'left',
            'right',
            'all',
            'none',
          ]}
        />
        <SelectField
          name="border.style"
          options={['solid', 'dashed', 'dotted']}
        />
        <SelectField name="border.size" options={sizes} />
      </Fields>

      {formField.border.position === 'inner' && (
        <Fields label="margin">
          <SelectField name="margin.bottom" options={sizes} />
        </Fields>
      )}

      <Fields label="content">
        <SelectField name="content.error.background" options={colors} />
        <SelectField name="content.disabled.background" options={colors} />
      </Fields>

      <TextProps aspect="label" />

      <TextProps aspect="help" />

      <TextProps aspect="error" />

      <Button
        margin="large"
        label="reset to defaults"
        onClick={() => {
          const nextTheme = JSON.parse(JSON.stringify(theme));
          delete nextTheme.formField;
          setTheme(nextTheme);
        }}
      />
    </Box>
  );
};
