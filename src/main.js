import React, { Component } from 'react';
import {
  StyleSheet,
  Navigator
} from 'react-native';
import Dashboard from './components/dashboard/dashboard';
import QrCodeScreen from './components/qrCodeScreen/qrCodeScreen';

const ROUTES = {
  dashboard: Dashboard,
  qrCodeScreen: QrCodeScreen,
};

export default class Main extends Component {
  renderScene(route, navigator) {
    let Component = ROUTES[route.name];
    return <Component route={ route } navigator={ navigator } {...route.passProps}/>
  }
  render() {
    return (
      <Navigator 
        style={ styles.container }
        initialRoute={ {name: 'dashboard'} }
        renderScene={ this.renderScene }
        configureScene={ () => { return Navigator.SceneConfigs.FloatFromBottom; } }
        />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
