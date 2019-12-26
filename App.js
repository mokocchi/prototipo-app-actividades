import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import AppNavigator from './app/navigation/AppNavigator'
import reducers from './app/redux/reducers'
import i18n from './app/utils/i18n';


const store = createStore(reducers);

class App extends Component {
  state = {
    locale: i18n.locale
  }

  setLocale = locale => {
    this.setState({ locale });
  };

  t = (scope, options) => {
    return i18n.t(scope, { locale: this.state.locale, ...options });
  };

  render() {
    return (
      <Provider store={store}>
        <AppNavigator
          screenProps={{
            t: this.t,
            locale: this.state.locale,
            setLocale: this.setLocale,
          }} />
      </Provider>
    )
  }
}

export default App;
