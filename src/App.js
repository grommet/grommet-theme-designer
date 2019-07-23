import React, { Component } from 'react';
import { Box, Grid, Grommet, Keyboard, grommet } from 'grommet';
import { Apps, Code, Share } from 'grommet-icons';
import { apiUrl, starter, upgradeTheme } from './theme';
import ActionButton from './components/ActionButton';
import Card from './Card';
import Primary from './Primary';
import Themes from './Themes';
import Raw from './Raw';

const getParams = () => {
  const { location } = window;
  const params = {};
  location.search.slice(1).split('&').forEach(p => {
    const [k, v] = p.split('=');
    params[k] = decodeURIComponent(v);
  });
  return params;
}

class App extends Component {
  state = { theme: starter, themes: [] };

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
        stored = localStorage.getItem(stored) || localStorage.getItem('theme');
      }
      if (stored) {
        const theme = JSON.parse(stored);
        upgradeTheme(theme);
        document.title = theme.name;
        this.setState({ theme });
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
    const { manage, raw, preview, theme } = this.state;
    return (
      <Grommet full theme={grommet}>
        <Keyboard target="document" onKeyDown={this.onKey}>
          {preview ? <Card theme={theme} /> : (
            <Grid fill columns={[['small', 'medium'], 'flex']} rows='full'>
              <Box
                fill="vertical"
                overflow="auto"
                background="dark-1"
                pad={{ horizontal: 'small', vertical: 'small' }}
                border="right"
              >
                <Box
                  flex={false}
                  direction="row"
                  justify="between"
                  gap="small"
                  margin={{ bottom: 'small' }}
                >
                  <ActionButton
                    icon={<Apps />}
                    hoverIndicator
                    onClick={() => this.setState({ manage: true })}
                  />
                  {manage && (
                    <Themes
                      theme={theme}
                      onChange={this.onChange}
                      onClose={() => this.setState({ manage: undefined })}
                    />
                  )}
                  <ActionButton
                    icon={<Code />}
                    hoverIndicator
                    onClick={() => this.setState({ raw: true })}
                  />
                  {raw && (
                    <Raw
                      theme={theme}
                      onChange={this.onChange}
                      onClose={() => this.setState({ raw: undefined })}
                    />
                  )}
                  <ActionButton icon={<Share />} hoverIndicator />
                </Box>
                <Primary theme={theme} onChange={this.onChange} />
              </Box>
              <Card theme={theme} />
            </Grid>
          )}
        </Keyboard>
      </Grommet>
    );
  }
}

export default App;
