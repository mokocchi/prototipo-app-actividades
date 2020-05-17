import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Text, Image, StyleSheet, Button, BackHandler } from 'react-native';
import { mapScreen } from '../utils/functions';
import { nextTask, setCurrentTask } from '../redux/actions';

class TaskResultScreen extends Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton() {
    return true;
  }

  nextTaskType(activity) {
    if (!activity.sequential) {
      return 'choose';
    } else {
      const index = this.props.currentTask + 1;
      if (index < this.props.model.tasks.length) {
        return this.props.model.tasks[index].type;
      } else {
        return 'sendAnswers';
      }
    }
  }

  findDestination(activity, task) {
    if (task.jumps.length == 0) {
      this.props.navigation.navigate(
        mapScreen(this.nextTaskType(activity)),
      );
      this.props.nextTask();
    } else {
      const tasks = this.props.model.tasks;
      const forcedJump = task.jumps.find((jump) => jump.on == "ALL");
      if (forcedJump) {
        if (forcedJump.to[0] == "END") {
          this.props.navigation.navigate("SendAnswers");
        } else {
          this.jump(forcedJump, tasks);
        }
      } else {
        const answers = this.props.navigation.getParam('answer', []);
        const jumpWhenNone = task.jumps.find((jump) => jump.on == "NONE");
        if (jumpWhenNone && (answers.length == 0)) {
          if (jumpWhenNone.to.length > 1) {
            this.props.navigation.navigate("ChooseTask", { "options": jumpWhenNone.to });
          } else {
            this.jump(jumpWhenNone, tasks);
            return;
          }
        }
        const jumpWhenPassed = task.jumps.find((jump) => jump.on == "YES_TASK");
        if (jumpWhenPassed && this.props.taskResults.find(task => task.code == jumpWhenPassed.answer)) {
          this.jump(jumpWhenPassed, tasks)
          return;
        }
        const jumpWhenNotPassed = task.jumps.find((jump) => jump.on == "NO_TASK");
        if(jumpWhenNotPassed && !this.props.taskResults.find(task => task.code == jumpWhenPassed.answer)) {
          this.jump(jumpWhenNotPassed, tasks);
          return;
        }

        for (let index = 0; index < answers.length; index++) {
          const answer = answers[index];
          for (let index = 0; index < task.jumps.length; index++) {
            const jump = task.jumps[index];
            if (jump.answer == answer) {
              if (jump.on == "YES") {
                if (jump.to.length > 1) {
                  this.props.navigation.navigate("ChooseTask", { "options": jump.to });
                } else {
                  if (jump.to[0] == "END") {
                    this.props.navigation.navigate("SendAnswers");
                  } else {
                    this.jump(jump, tasks)
                  }
                }
                return;
              }
            } else {
              if (jump.on == "NO") {
                if (jump.to.length > 1) {
                  this.props.navigation.navigate("ChooseTask", { "options": jump.to });
                } else {
                  const targetTask = tasks.find((item) => item.code == jump.to[0]);
                  this.props.navigation.navigate(
                    mapScreen(targetTask.type),
                  );
                  const taskIndex = this.props.model.tasks.findIndex((item) => targetTask.code == item.code);
                  this.props.setCurrentTask(taskIndex);
                }
                return;
              }
            }
          }
        }
        this.props.navigation.navigate(
          mapScreen(this.nextTaskType(activity)),
        );
        this.props.nextTask();
      }
    }
  }

  jump(jump, tasks) {
    if (jump.to.length > 1) {
      this.props.navigation.navigate("ChooseTask", { "options": jump.to });
    }
    else {
      const targetTask = tasks.find((item) => item.code == jump.to[0]);
      this.props.navigation.navigate(mapScreen(targetTask.type));
      const taskIndex = this.props.model.tasks.findIndex((item) => targetTask.code == item.code);
      this.props.setCurrentTask(taskIndex);
    }
  }

  render() {
    t = this.props.screenProps.t;
    const activity = this.props.model.educationalActivity;
    const task = this.props.model.tasks[this.props.currentTask];
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{t("TaskResult_001")}</Text>
        <Text style={styles.text}>{t("TaskResult_002")}</Text>
        <Button
          title={t("TaskResult_003")}
          onPress={() => {
            this.findDestination(activity, task);
          }}></Button>
        <Button
          title={t("TaskResult_004")}
          onPress={() => {
            this.props.navigation.navigate("ActivityResults");
          }}></Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: 'skyblue',
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    margin: 10,
  },
});

const mapStateToProps = state => {
  const { model, currentTask, taskResults } = state;
  return { model, currentTask, taskResults };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      nextTask, setCurrentTask
    },
    dispatch,
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TaskResultScreen);
