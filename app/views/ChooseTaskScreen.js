import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  View,
  Text,
  StyleSheet,
  Button,
  BackHandler
} from 'react-native';
import { setCurrentTask } from '../redux/actions'
import { mapScreen } from '../functions'

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
        const options = this.props.navigation.getParam('options', []);
        tasks = this.props.model.tasks;
        if(options.length != 0) {
            tasks = tasks.filter((task) => options.includes(task.code));
        }
        
    return (
        <View style={styles.container}>
            <Text>Elige una tarea para comenzar</Text>
            {tasks.map((task, index) => (
                <Button
                key={ index }
                title={ task.name }
                color={this.props.taskResults.find((item)=> item.code == task.code)? "orange" : "blue"}
                onPress={() => {
                    const taskIndex = this.props.model.tasks.findIndex((item) => task.code == item.code);
                    this.props.setCurrentTask(taskIndex);
                    this.props.navigation.navigate(mapScreen(this.props.model.tasks[taskIndex].type));
                }
                }
                />
            ))}
            {
                this.props.model.educationalActivity.sequential? null : <Button title="Terminar" color="green" onPress={()=>this.props.navigation.navigate("SendAnswers")}></Button>
            }
        </View>
    );
  }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: "center",
        justifyContent: "space-between",
        backgroundColor: "skyblue"
    },
    text: {
        textAlign: "center",
        color: "white"
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