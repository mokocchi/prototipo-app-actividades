import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { nextTask, setCurrentTask } from '../redux/actions';
import {
    View,
    Text,
    StyleSheet,
    BackHandler,
} from 'react-native';

import { mapScreen } from '../utils/functions'
import { Colors } from '../assets/styles'
import Header from '../components/Header'
import Button from '../components/Button'
import title from './styles/title';
import subtitle from './styles/subtitle';


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

    calculateFirstScreen = (sequential) => {
        if (sequential) {
            const initialTasks = this.props.model.tasks.filter(task => task.initial);
            if (initialTasks.length === 1) {
                this.props.navigation.navigate(mapScreen(initialTasks[0].type));
                const taskIndex = this.props.model.tasks.findIndex((item) => initialTasks[0].code == item.code);
                this.props.setCurrentTask(taskIndex);
            } else {
                const codes = initialTasks.map(task => task.code);
                this.props.navigation.navigate("ChooseTask", { "options": codes });
            }
        } else {
            this.props.navigation.navigate("ChooseTask");
        }
    }

    render() {
        let { t } = this.props.screenProps;
        const activity = this.props.model.educationalActivity;
        return (
            <>
                <Header />
                <View style={styles.container}>
                    <Text style={styles.title}>{activity.name}</Text>
                    <Text style={styles.subtitle}>{t("Welcome_001")}: {activity.goal}</Text>
                    <Button title={t("Welcome_002")} onPress={() => this.calculateFirstScreen(activity.sequential)} />
                    <View />
                </View>
            </>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: "center",
        justifyContent: "space-between",
        backgroundColor: Colors.background
    },
    subtitle: {
        ...subtitle
    },
    title: {
        ...title
    }
})
const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            setCurrentTask
        },
        dispatch,
    );
const mapStateToProps = (state) => {
    const { model } = state
    return { model }
};

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen);