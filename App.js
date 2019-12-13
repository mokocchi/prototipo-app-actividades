import React, {Component} from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import AppNavigator from './app/navigation/AppNavigator'
import reducers from './app/redux/reducers'


const store = createStore(reducers);

class App extends Component {
  render(){
    return(
      <Provider store={ store }>
        <AppNavigator/>
      </Provider>
    )
  }
}

export default App;
