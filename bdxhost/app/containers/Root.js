// @flow
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/es/styles';
import { red, blue } from '@material-ui/core/es/colors';
import CssBaseline from '@material-ui/core/es/CssBaseline';
import Routes from '../routes';

type Props = {
  store: {},
  history: {}
};

const theme = createMuiTheme({
  palette: {
    primary: blue,
    accent: red,
    type: 'light'
  }
});

export default class Root extends Component<Props> {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={this.props.store}>
          <ConnectedRouter history={this.props.history}>
            <Routes />
          </ConnectedRouter>
        </Provider>
      </MuiThemeProvider>
    );
  }
}
