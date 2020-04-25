import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clearTaskResult } from '../redux/actions'

import {
    View,
    Text,
    StyleSheet,
    Button,
    BackHandler,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { Alert } from 'react-native';
import { RESULTS_URL } from '../config';

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

    async sendAnswers(results) {
        const object = {};
        object["code"] = this.props.model.educationalActivity.code;
        object["responses"] = results;
        const data = await fetch(RESULTS_URL, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(object)
        });
        if(!data.error_code) {
            Alert.alert(t("SendAnswers_003"))
        } else {
            //TODO: errores por error_code
            Alert.alert(t("SendAnswers_004"))
            console.log(data)
        }
        this.props.clearTaskResult()
        this.props.navigation.navigate("Splash");
    }

    onPress = () => {
        this.sendAnswers(this.props.taskResults)
    }

    render() {
        const t = this.props.screenProps.t;
        const activity = this.props.model.educationalActivity;
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{activity.name}</Text>
                <Text style={styles.text}>{t("SendAnswers_001")}</Text>
                <Button title={t("SendAnswers_002")} onPress={this.onPress} />
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
    const { model, taskResults } = state
    return { model, taskResults }
};

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            clearTaskResult,
        },
        dispatch,
    );

export default connect(mapStateToProps, mapDispatchToProps)(SendAnswersScreen);