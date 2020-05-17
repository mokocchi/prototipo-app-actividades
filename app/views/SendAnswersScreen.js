import React, {Component} from 'react';
import { connect } from 'react-redux';

import {
  View,
  Text,
  StyleSheet,
  Button,
  BackHandler,
} from 'react-native';

class SendAnswersScreen extends Component {
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
    const t = this.props.screenProps.t;
    const activity = this.props.model.educationalActivity;
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{activity.name}</Text>
            <Text style={styles.text}>{t("SendAnswers_001")}</Text>           
            <Button title={t("SendAnswers_002")} onPress={()=>this.props.navigation.navigate("Splash")} />
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

export default connect(mapStateToProps)(SendAnswersScreen);