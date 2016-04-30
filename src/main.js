import React from 'react';
import ReactDOM from 'react-dom';
import {Page, Tabbar, Tab, Toolbar} from 'react-onsenui';

// load Onsen UI library
import 'onsenui';

class HomePage extends React.Component {
  render() {
    return (
      <Page
        renderToolbar={() =>
          <Toolbar>
            <div className='center'>Title</div>
          </Toolbar>
        }
      >
        <div>
          Home Page
        </div>
      </Page>
    );
  }
}

class SettingsPage extends React.Component {
  render() {
    return (
      <Page
        renderToolbar={() =>
          <Toolbar>
            <div className='center'>Title</div>
          </Toolbar>
        }
      >
        <div>
          Settings Page
        </div>
      </Page>
    );
  }
}

class App extends React.Component {
  renderTabs() {
    return [
      {
        content: <HomePage />,
        tab: <Tab label='Home' icon='md-home' />
      },
      {
        content: <SettingsPage />,
        tab: <Tab label='Settings' icon='md-settings' />
      }
    ]
  }

  render() {
    return (
      <Tabbar
        initialIndex={0}
        renderTabs={this.renderTabs.bind(this)}
      />
        );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
