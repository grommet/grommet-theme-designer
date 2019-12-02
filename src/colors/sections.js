import React from 'react';
import { Box, Button, Menu, Select, Text } from 'grommet';
import { Alert } from 'grommet-icons';
import Score from './Score';

const backgroundColors =
  ['background', 'background-strong', 'background-weak', 'background-xweak'];

const textColors = ['text', 'text-strong', 'text-weak', 'text-xweak'];

const statusColors = [
  'status-critical', 'status-warning', 'status-ok', 'status-disabled',
  'status-unknown',
];

const ControlsContents = ({ theme, background, mode }) => (
  <Box
    flex
    background={{ color: background, dark: (mode === 'dark') }}
    pad="medium"
  >
    <Select options={['one', 'two', 'three']} value="one" />
    <Box border>
      <Box
        pad={{ vertical: 'xsmall', horizontal: 'small' }}
        background="selected-background"
      >
        <Score
          theme={theme}
          background="selected-background"
          mode={mode}
          color="selected-text"
        />
      </Box>
      <Box
        pad={{ vertical: 'xsmall', horizontal: 'small' }}
        background="active-background"
      >
        <Score
          theme={theme}
          background="active-background"
          mode={mode}
          color="active-text"
        />
      </Box>
      <Box pad={{ vertical: 'xsmall', horizontal: 'small' }}>
        <Score
          theme={theme}
          background="background"
          mode={mode}
          color="text"
        />
      </Box>
    </Box>
  </Box>
)

export default [
  {
    name: 'brand',
    colors: ['brand'],
    example: () => (
      <Box fill direction="row" overflow="hidden">
        <Box
          flex
          direction="row"
          background={{ color: 'background', dark: false }}
          pad="small"
          gap="medium"
          justify="end"
        >
          <Menu label="Menu" />
          <Button primary color="brand" label="OK" />
        </Box>
        <Box
          flex
          direction="row"
          background={{ color: 'background', dark: true }}
          pad="small"
          gap="medium"
        >
          <Button primary color="brand" label="OK" />
          <Menu label="Menu" />
        </Box>
      </Box>
    )
  },
  {
    name: 'palette',
    colors: [],
    palette: true,
  },
  {
    name: 'background',
    colors: backgroundColors,
    example: () => (
      <Box fill direction="row">
        <Box
          flex
          direction="row"
          background={{ color: 'background', dark: false }}
          pad="medium"
          gap="medium"
        >
          {backgroundColors.filter(color => color !== 'background')
          .map(color => (
            <Box key={color} flex background={color} pad="small" justify="end">
              <Text truncate>{color.split('-')[1]}</Text>
            </Box>
          ))}
        </Box>
        <Box
          flex
          direction="row"
          background={{ color: 'background', dark: true }}
          pad="medium"
          gap="medium"
        >
          {backgroundColors.slice(0).reverse()
          .filter(color => color !== 'background').map(color => (
            <Box key={color} flex background={color} pad="small" justify="end">
              <Text truncate>{color.split('-')[1]}</Text>
            </Box>
          ))}
        </Box>
      </Box>
    ),
  },
  {
    name: 'text',
    colors: textColors,
    example: (theme) => (
      <Box fill direction="row">
        <Box
          flex
          direction="row"
          background={{ color: 'background', dark: false }}
        >
          {backgroundColors.map(backgroundColor => (
            <Box
              key={backgroundColor}
              flex
              background={backgroundColor}
              pad="small"
              gap="small"
              justify="between"
            >
              {textColors.map(textColor => (
                <Score
                  key={textColor}
                  theme={theme}
                  background={backgroundColor}
                  color={textColor}
                  mode='light'
                />
              ))}
            </Box>
          ))}
        </Box>
        <Box
          flex
          direction="row"
          background={{ color: 'background', dark: true }}
        >
          {backgroundColors.slice(0).reverse().map(backgroundColor => (
            <Box
              key={backgroundColor} 
              flex
              background={backgroundColor}
              pad="small"
              gap="small"
              justify="between"
            >
              {textColors.map(textColor => (
                <Score
                  key={textColor}
                  theme={theme}
                  background={backgroundColor}
                  color={textColor}
                  mode='dark'
                />
              ))}
            </Box>
          ))}
        </Box>
      </Box>
    ),
  },
  {
    name: 'controls',
    colors: [
      'control', 'border', 'focus', 'active-background', 'active-text',
      'selected-background', 'selected-text',
    ],
    example: (theme) => (
      <Box fill direction="row">
        {backgroundColors.filter(color => color !== 'background-strong')
        .map(color => (
          <ControlsContents
            key={color}
            theme={theme}
            mode="light"
            background={color}
          />
        ))}
        {backgroundColors.filter(color => color !== 'background-strong')
        .reverse().map(color => (
          <ControlsContents
            key={color}
            theme={theme}
            mode="dark"
            background={color}
          />
        ))}
      </Box>
    ),
  },
  {
    name: 'status',
    colors: statusColors,
    example: (theme) => (
      <Box fill>
        {statusColors.map(color => (
          <Box key={color} flex direction="row" gap="medium">
            <Box
              flex
              direction="row"
              background={{ color: 'background', dark: false }}
              gap="small"
              pad="small"
            >
              <Alert color={color} />
              <Score
                theme={theme}
                background="background"
                mode="light"
                color={color}
              />
            </Box>
            <Box
              flex
              direction="row"
              background={{ color: 'background', dark: true }}
              gap="small"
              pad="small"
            >
              <Alert color={color} />
              <Score
                theme={theme}
                background="background"
                mode="dark"
                color={color}
              />
            </Box>
            <Box flex background={color} pad="small" justify="end">
              <Score theme={theme} background={color} color="text" />
            </Box>
          </Box>
        ))}
      </Box>
    ),
  },
];
