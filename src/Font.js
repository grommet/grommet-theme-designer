import React from 'react';
import {
  Box,
  DropButton,
  Heading,
  Paragraph,
  Text,
  TextArea,
  TextInput,
} from 'grommet';

export default ({ theme, setTheme }) => {
  const font = theme.global.font;
  return (
    <DropButton
      plain
      hoverIndicator
      dropAlign={{ right: 'left', top: 'top' }}
      dropContent={
        <Box flex={false} pad="medium">
          <Heading level={2} margin="none">
            font
          </Heading>

          <Paragraph color="dark-4">
            Double quotes use Google fonts. Single quotes prompt for face.
          </Paragraph>

          <TextInput
            id="family"
            name="family"
            placeholder="font family"
            value={font.family}
            onChange={event => {
              const family = event.target.value;
              const nextTheme = JSON.parse(JSON.stringify(theme));
              nextTheme.global.font.family = family;
              setTheme(nextTheme);
              // see if we need a face for any of the fonts
              const names = family.split(',').map(f => f.trim());
              names.forEach(name => {
                const match = name.match(/^"(.+)"/);
                if (match) {
                  fetch(
                    `https://fonts.googleapis.com/css?family=${encodeURIComponent(
                      match[1],
                    )}`,
                  )
                    .then(response => response.text())
                    .then(face => {
                      const nextTheme2 = JSON.parse(JSON.stringify(nextTheme));
                      nextTheme2.global.font.face = face;
                      setTheme(nextTheme2);
                    });
                }
              });
            }}
          />

          {font.family && font.family.match(/'/) && (
            <TextArea
              id="face"
              name="face"
              cols={40}
              rows={10}
              placeholder="font face"
              value={font.face || ''}
              onChange={event => {
                const face = event.target.value;
                const nextTheme = JSON.parse(JSON.stringify(theme));
                nextTheme.global.font.face = face;
                setTheme(nextTheme);
              }}
            />
          )}

          <Heading level={3}>heading</Heading>

          <TextInput
            id="headingFamily"
            name="headingFamily"
            placeholder="heading font family"
            value={
              theme.heading && theme.heading.font
                ? theme.heading.font.family
                : ''
            }
            onChange={event => {
              const family = event.target.value;
              const nextTheme = JSON.parse(JSON.stringify(theme));
              if (!nextTheme.heading) nextTheme.heading = {};
              if (!nextTheme.heading.font) nextTheme.heading.font = {};
              nextTheme.heading.font.family = family;
              setTheme(nextTheme);
              // see if we need a face for any of the fonts
              const names = family.split(',').map(f => f.trim());
              names.forEach(name => {
                const match = name.match(/^"(.+)"/);
                if (match) {
                  fetch(
                    `https://fonts.googleapis.com/css?family=${encodeURIComponent(
                      match[1],
                    )}`,
                  )
                    .then(response => response.text())
                    .then(face => {
                      const nextTheme2 = JSON.parse(JSON.stringify(nextTheme));
                      nextTheme2.global.font.face =
                        (nextTheme.global.font.face || '') + '\n' + face;
                      setTheme(nextTheme2);
                    });
                }
              });
            }}
          />

          {theme.heading &&
            theme.heading.font &&
            theme.heading.font.family &&
            theme.heading.font.family.match(/'/) && (
              <TextArea
                id="headingFace"
                name="headingFace"
                cols={40}
                rows={10}
                placeholder="heading font face"
                value={theme.heading.font.face || ''}
                onChange={event => {
                  const face = event.target.value;
                  const nextTheme = JSON.parse(JSON.stringify(theme));
                  nextTheme.global.font.face = (font.face || '') + face;
                  setTheme(nextTheme);
                }}
              />
            )}
        </Box>
      }
    >
      <Box
        direction="row"
        align="center"
        justify="between"
        gap="small"
        pad={{ vertical: 'small', horizontal: 'medium' }}
        border="bottom"
      >
        <Text>font</Text>
        <Text weight="bold">{font.family}</Text>
      </Box>
    </DropButton>
  );
};

// export default ({ theme, setTheme }) => {
//   return (
//     <Fragment>
//       <Box pad={{ horizontal: 'medium', top: 'small' }}>
//         <Text color="dark-4">
//           Double quotes use Google fonts. Single quotes prompt for face.
//         </Text>
//       </Box>
//       <Field
//         htmlFor="family"
//         label="font family"
//         align="start"
//       >
//         <Box pad={{ right: 'medium' }}>
//           <TextInput
//             id="family"
//             name="family"
//             plain
//             style={{ textAlign: 'right' }}
//             value={theme.global.font.family}
//             onChange={(event) => {
//               const family = event.target.value;
//               const nextTheme = JSON.parse(JSON.stringify(theme));
//               nextTheme.global.font.family = family;
//               setTheme(nextTheme);
//               // see if we need a face for any of the fonts
//               const names = family.split(',').map(f => f.trim());
//               names.forEach(name => {
//                 const match = name.match(/^"(.+)"/);
//                 if (match) {
//                   fetch(`https://fonts.googleapis.com/css?family=${encodeURIComponent(match[1])}`)
//                   .then(response => response.text())
//                   .then(face => {
//                     const nextTheme2 = JSON.parse(JSON.stringify(nextTheme));
//                     nextTheme2.global.font.face = face;
//                     setTheme(nextTheme2);
//                   })
//                 }
//               })
//             }}
//           />
//         </Box>
//       </Field>
//       {theme.global.font.family && theme.global.font.family.match(/'/) && (
//         <Field label="face" htmlFor="face" align="start">
//           <Box pad={{ right: 'medium' }}>
//             <TextArea
//               id="face"
//               name="face"
//               plain
//               style={{ textAlign: 'right' }}
//               cols={20}
//               rows={3}
//               value={theme.global.font.face || ''}
//               onChange={(event) => {
//                 const face = event.target.value;
//                 const nextTheme = JSON.parse(JSON.stringify(theme));
//                 nextTheme.global.font.face = face;
//                 setTheme(nextTheme);
//               }}
//             />
//           </Box>
//         </Field>
//       )}
//       <Field
//         htmlFor="headingFamily"
//         label="heading font family"
//         align="start"
//       >
//         <Box pad={{ right: 'medium' }}>
//           <TextInput
//             id="headingFamily"
//             name="headingFamily"
//             plain
//             style={{ textAlign: 'right' }}
//             value={(theme.heading && theme.heading.font)
//               ? theme.heading.font.family : ''}
//             onChange={(event) => {
//               const family = event.target.value;
//               const nextTheme = JSON.parse(JSON.stringify(theme));
//               if (!nextTheme.heading) nextTheme.heading = {};
//               if (!nextTheme.heading.font) nextTheme.heading.font = {};
//               nextTheme.heading.font.family = family;
//               setTheme(nextTheme);
//               // see if we need a face for any of the fonts
//               const names = family.split(',').map(f => f.trim());
//               names.forEach(name => {
//                 const match = name.match(/^"(.+)"/);
//                 if (match) {
//                   fetch(`https://fonts.googleapis.com/css?family=${encodeURIComponent(match[1])}`)
//                   .then(response => response.text())
//                   .then(face => {
//                     const nextTheme2 = JSON.parse(JSON.stringify(nextTheme));
//                     nextTheme2.global.font.face =
//                     (nextTheme.global.font.face || '') + '\n' + face;
//                     setTheme(nextTheme2);
//                   })
//                 }
//               })
//             }}
//           />
//         </Box>
//       </Field>
//       {theme.heading && theme.heading.font && theme.heading.font.family
//         && theme.heading.font.family.match(/'/) && (
//         <Field label="heading font face" htmlFor="headingFace" align="start">
//           <Box pad={{ right: 'medium' }}>
//             <TextArea
//               id="headingFace"
//               name="headingFace"
//               plain
//               style={{ textAlign: 'right' }}
//               cols={20}
//               rows={3}
//               value={theme.heading.font.face || ''}
//               onChange={(event) => {
//                 const face = event.target.value;
//                 const nextTheme = JSON.parse(JSON.stringify(theme));
//                 nextTheme.global.font.face =
//                   (nextTheme.global.font.face || '') + face;
//                   setTheme(nextTheme);
//               }}
//             />
//           </Box>
//         </Field>
//       )}
//     </Fragment>
//   )
// }
