import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    View,
    Text,
    StyleSheet,
    BackHandler
} from 'react-native';
import { setCurrentTask } from '../redux/actions'
import { mapScreen } from '../utils/functions'
import Header from '../components/Header';
import Button from '../components/Button'
import container from './styles/container';
import text from './styles/text';

class ChooseTaskScreen extends Component {
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
        const options = this.props.navigation.getParam('options', []);
        tasks = this.props.model.tasks;
        if (options.length != 0) {
            tasks = tasks.filter((task) => options.includes(task.code));
        }

        return (
            <>
                <Header />
                <View style={styles.container}>
                    <Text style={styles.text}>{t("ChooseTask_001")}</Text>
                    <View style={styles.optionsContainer}>
                        {tasks.map((task, index) => (
                            <Button
                                key={index}
                                title={task.name}
                                visited={this.props.taskResults.find((item) => item.code == task.code)}
                                onPress={() => {
                                    const taskIndex = this.props.model.tasks.findIndex((item) => task.code == item.code);
                                    this.props.setCurrentTask(taskIndex);
                                    this.props.navigation.navigate(mapScreen(this.props.model.tasks[taskIndex].type));
                                }}
                            />
                        ))}
                    </View>
                    {
                        this.props.model.educationalActivity.sequential ? null : <Button title={t("ChooseTask_002")} color="green" onPress={() => this.props.navigation.navigate("SendAnswers")}></Button>
                    }
                    <View></View>
                </View>
            </>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        ...container
    },
    optionsContainer: {
        flex: 0.7,
        justifyContent: "space-between",
        overflow: "scroll"
    },
    text: {
        ...text
    }
})

const mapStateToProps = (state) => {
    const { model, currentTask, taskResults } = state
    return { model, currentTask, taskResults }
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        setCurrentTask,
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(ChooseTaskScreen);