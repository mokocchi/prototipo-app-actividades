import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, BackHandler } from 'react-native';
import Header from '../components/Header';
import title from './styles/title';
import container from './styles/container';
import text from './styles/text';
import * as Colors from '../assets/styles/colors';

class PermissionsNoticeScreen extends Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton() {
    return true;
  }

  nextScreen = () => this.props.navigation.navigate("Splash");

  render() {
    t = this.props.screenProps.t;
    return (
      <>
        <Header />
        <View style={styles.container}>
          <Text style={styles.title}>{t("PermissionsNotice_001")}</Text>
          <Text style={styles.text}>{t("PermissionsNotice_002")}</Text>
          <Button title={t("PermissionsNotice_003")} onPress={this.nextScreen} color={Colors.buttonBackgroundColor}/>
          <View />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...container
  },
  title: {
    ...title
  },
  text: {
    ...text
  },
});

export default PermissionsNoticeScreen;
