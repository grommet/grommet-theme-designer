import React, { useCallback, useState } from 'react';
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
const edgeSizes = [...sizes, 'none'];

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

  const SelectField = ({ label, name, options: allOptions }) => {
    const value = getValue(name);
    const [options, setOptions] = useState(allOptions);

    return (
      <Field
        label={
          label ||
          name
            .split('.')
            .slice(1)
            .join(' ')
        }
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
          onSearch={
            allOptions.length > 6
              ? text => {
                  const exp = new RegExp(text, 'i');
                  let nextOptions = allOptions.filter(o =>
                    text ? exp.test(o) : true,
                  );
                  setOptions(nextOptions);
                }
              : undefined
          }
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
    <Fields label={`${aspect} text`}>
      <SelectField name={`${aspect}.size`} options={sizes} />
      <SelectField name={`${aspect}.weight`} options={['normal', 'bold']} />
      <SelectField name={`${aspect}.color`} options={colors} />
      <SelectField name={`${aspect}.margin.horizontal`} options={edgeSizes} />
      <SelectField name={`${aspect}.margin.vertical`} options={edgeSizes} />
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

      <Fields label="margin">
        <SelectField name="margin.bottom" options={edgeSizes} />
      </Fields>

      <Fields label="content">
        <SelectField name="content.pad" options={edgeSizes} />
      </Fields>

      <TextProps aspect="label" />

      <TextProps aspect="help" />

      <TextProps aspect="error" />

      <Fields label="error state">
        <SelectField
          label="background.color"
          name="error.background.color"
          options={colors}
        />
        <SelectField
          label="background.opacity"
          name="error.background.opacity"
          options={['weak', 'medium', 'strong']}
        />
      </Fields>
      <Fields label="disabled state">
        <SelectField
          label="background.color"
          name="disabled.background.color"
          options={colors}
        />
        <SelectField
          label="background.opacity"
          name="disabled.background.opacity"
          options={['weak', 'medium', 'strong']}
        />
      </Fields>

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
