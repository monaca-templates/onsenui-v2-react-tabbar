import React from 'react';
import ReactDOM from 'react-dom';
import {Tabbar, Tab} from 'react-onsenui';

import HomePage from './HomePage';
import SettingsPage from './SettingsPage';

export default class App extends React.Component {
  renderTabs() {
    return [
      {
        content: <HomePage key='home' />,
        tab: <Tab label='Home' icon='md-home' key='home' />
      },
      {
        content: <SettingsPage key='settings' />,
        tab: <Tab label='Settings' icon='md-settings' key='settings' />
      }
    ]
  }

  render() {
    return (
      <Tabbar initialIndex={0} renderTabs={this.renderTabs.bind(this)} />
    );
  }
}
