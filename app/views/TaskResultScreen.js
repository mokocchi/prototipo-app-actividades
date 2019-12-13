import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Text, Image, StyleSheet, Button, BackHandler } from 'react-native';
import { mapScreen } from '../functions';
import { nextTask } from '../redux/actions';

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

  render() {
    var results = false;
    const activity = this.props.model.educationalActivity;
    const task = this.props.model.tasks[this.props.currentTask];
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Tarea terminada</Text>
        <Text style={styles.text}>{results ? "Elijan una opción para continuar" : "Vamos a la siguiente tarea"}</Text>
        <Button
          title="Continuar"
          onPress={() => {
            if(task.jumps.length == 0) {
              this.props.navigation.navigate(
                mapScreen(this.nextTaskType(activity)),
                );
            } else {
              const tasks = this.props.model.tasks;
              const forcedJump = task.jumps.find((jump) => jump.on == "ALL");
              if(forcedJump){
                if(forcedJump.to[0] == "END") {
                  this.props.navigation.navigate("SendAnswers");
                } else {
                  if (forcedJump.to.length > 1) {
                    this.props.navigation.navigate("ChooseTask", { "options": forcedJump.to });
                  } else {
                    const type = tasks.find((item) => item.code == forcedJump.to[0]).type;
                    this.props.navigation.navigate(
                      mapScreen(type),
                    );
                  }
                }
              } else {
                //conditional jump
              }
            }
            this.props.nextTask();
          }}></Button>
        <Button
          title="Ver respuestas"
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
  const { model, currentTask } = state;
  return { model, currentTask };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      nextTask,
    },
    dispatch,
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TaskResultScreen);
