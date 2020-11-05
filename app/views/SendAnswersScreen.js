import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clearTaskResult } from '../redux/actions'

import {
    View,
    Text,
    StyleSheet,
    BackHandler,
    ActivityIndicator,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { Alert } from 'react-native';
import { RESULTS_URL } from '../config';
import Header from '../components/Header';
import Button from '../components/Button';
import container from './styles/container';
import title from './styles/title';
import text from './styles/text';

class SendAnswersScreen extends Component {

    state = {
        sendAllowed: true
    }

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
        try {
            const data = await fetch(RESULTS_URL, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(object)
            });
            const json = await data.json();
            if (!json.error_code) {
                Alert.alert(t("SendAnswers_003"))
                this.props.clearTaskResult()
                this.props.navigation.navigate("Splash");
            } else {
                //TODO: errores por error_code
                Alert.alert(t("SendAnswers_004"))
                console.log(json)
                this.setState({ sendAllowed: true })
            }
        } catch (error) {
            Alert.alert(t("SendAnswers_006"))
            console.log(error)
            this.setState({ sendAllowed: true })
        }
    }

    onPress = () => {
        this.setState({
            sendAllowed: false
        })
        this.sendAnswers(this.props.taskResults)
    }

    render() {
        const t = this.props.screenProps.t;
        const activity = this.props.model.educationalActivity;
        return (
            <>
                <Header />
                <View style={styles.container}>
                    <Text style={styles.title}>{activity.name}</Text>
                    <Text style={styles.text}>{t("SendAnswers_001")}</Text>
                    {this.state.sendAllowed ?
                        <>
                            <Button title={t("SendAnswers_002")} onPress={this.onPress} />
                            <Button title={t("SendAnswers_005")} onPress={() => { this.props.clearTaskResult(); this.props.navigation.navigate("Splash") }} />
                        </>
                        :
                        <ActivityIndicator />
                    }
                    <View />
                </View>
            </>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        ...container
    },
    text: {
        ...text
    },
    title: {
        ...title
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