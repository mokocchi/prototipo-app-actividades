import React, {Component} from 'react';
import { connect } from 'react-redux';

import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  BackHandler,
} from 'react-native';

import { mapScreen } from '../utils/functions'

class WelcomeScreen extends Component {
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton() {
        return true;
    }

    render() {
    let { t } = this.props.screenProps;
    const activity = this.props.model.educationalActivity;
    const nextScreen = activity.sequential ? this.props.model.tasks[0].type : "choose";
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{activity.name}</Text>
            <Text style={styles.text}>{activity.goal}</Text>           
            <Button title={t("Welcome_001")} onPress={()=>this.props.navigation.navigate(mapScreen(nextScreen))} />
        </View>
    );
  }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: "center",
        justifyContent: "center",
        backgroundColor: "skyblue"
    },
    text: {
        textAlign: "center",
        fontSize: 20,
        margin: 10
    }
})

const mapStateToProps = (state) => {
    const { model } = state
    return { model }
  };

export default connect(mapStateToProps)(WelcomeScreen);