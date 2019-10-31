import React, { Component, Fragment } from 'react';
import { Box, Grid, Grommet, ResponsiveContext, Keyboard, grommet } from 'grommet';
import { Apps, Code, Share } from 'grommet-icons';
import { apiUrl, starter, upgradeTheme } from './theme';
import ActionButton from './components/ActionButton';
import Card from './Card';
import Primary from './Primary';
import Themes from './Themes';
import Raw from './Raw';
import Sharer from './Share';

const getParams = () => {
  const { location } = window;
  const params = {};
  location.search.slice(1).split('&').forEach(p => {
    const [k, v] = p.split('=');
    params[k] = decodeURIComponent(v);
  });
  return params;
}

const Actioner = ({ Icon, Modal, theme, title, onChange }) => {
  const [show, setShow] = React.useState();
  return (
    <Fragment>
      <ActionButton
        title={title}
        icon={<Icon />}
        hoverIndicator
        onClick={() => setShow(true)}
      />
      {show && (
        <Modal theme={theme} onChange={onChange} onClose={() => setShow(false)} />
      )}
    </Fragment>
  );
}

class App extends Component {
  state = { themes: [] };

  componentDidMount() {
    const params = getParams();
    if (params.id) {
      fetch(`${apiUrl}/${params.id}`)
      .then(response => response.json())
      .then((theme) => {
        upgradeTheme(theme);
        document.title = theme.name;
        this.setState({ theme });
      });
    } else {
      let stored = localStorage.getItem('activeTheme');
      if (stored) {
        stored = localStorage.getItem(stored);
      }
      if (stored) {
        const theme = JSON.parse(stored);
        upgradeTheme(theme);
        document.title = theme.name;
        this.setState({ theme });
      } else {
        this.setState({ theme: starter });
      }
    }
    const stored = localStorage.getItem('themes');
    this.setState({ themes: stored ? JSON.parse(stored) : [] });
  }

  onChange = (nextState) => {
    const { themes: previousThemes } = this.state;
    this.setState(nextState);

    if (nextState.theme) {
      if (!this.debouncing) {
        this.debouncing = true;
      }
      const { theme } = nextState;
      // delay storing it locally so we don't bog down typing
      clearTimeout(this.storeTimer);
      this.storeTimer = setTimeout(() => {
        document.title = theme.name;
        localStorage.setItem(theme.name, JSON.stringify(theme));
        localStorage.setItem('activeTheme', theme.name);
        if (document.location.search) {
          // clear current URL, in case we've started editing a published design locally
          window.history.replaceState({}, theme.name, '/');
        }
        if (!previousThemes.includes(theme.name)) {
          const themes = [theme.name, ...previousThemes];
          localStorage.setItem('themes', JSON.stringify(themes));
          this.setState({ themes });
        }
        this.debouncing = false;
      }, 500);
    }
  }

  onKey = (event) => {
    const { preview } = this.state;
    if (event.metaKey) {
      if (event.key === 'e') {
        event.preventDefault();
        this.setState({ preview: !preview });
      }
    }
  }

  render() {
    const { preview, theme } = this.state;
    return (
      <Grommet full theme={grommet}>
        <ResponsiveContext.Consumer>
          {(responsive) => (
            <Keyboard target="document" onKeyDown={this.onKey}>
              {!theme ? (
                <Box fill justify="center" align="center">
                  <Box pad="xlarge" background="dark-2" round animation="pulse" />
                </Box>
              ) : (
                <Grid
                  fill
                  columns={(responsive === 'small' || preview)
                    ? 'flex' : [['small', 'medium'], 'flex']}
                  rows='full'
                >
                  {responsive !== 'small' && !preview && (
                    <Box
                      fill="vertical"
                      overflow="auto"
                      background="dark-1"
                      border="right"
                    >
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
                            onChange={this.onChange}
                          />
                          <Actioner
                            title="see JSON"
                            Icon={Code}
                            Modal={Raw}
                            theme={theme}
                            onChange={this.onChange}
                          />
                          <Actioner
                            title="share"
                            Icon={Share}
                            Modal={Sharer}
                            theme={theme}
                            onChange={this.onChange}
                          />
                        </Box>
                        <Primary theme={theme} onChange={this.onChange} />
                      </Box>
                    </Box>
                  )}
                  <Card theme={theme} />
                </Grid>
              )}
            </Keyboard>
          )}
        </ResponsiveContext.Consumer>
      </Grommet>
    );
  }
}

export default App;
