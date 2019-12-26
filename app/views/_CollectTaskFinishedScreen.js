import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {View, Text, Image, StyleSheet, Button, BackHandler} from 'react-native';
import {mapScreen} from '../utils/functions';
import {nextTask} from '../redux/actions';

class CollectTaskFinishedScreen extends Component {
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
        return 'results';
      }
    }
  }

  render() {
    const activity = this.props.model.educationalActivity;
    const task = this.props.model.tasks[this.props.currentTask];
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Tarea de recolección terminada</Text>
        <Text style={styles.text}>Elijan una opción para continuar</Text>
        <Button
        title="Ir a Depositar"
        onPress={() => this.props.navigation.navigate("ChooseDeposit")} />
        <Button
          title="Siguiente tarea"
          onPress={() => {
            this.props.navigation.navigate(
              mapScreen(this.nextTaskType(activity)),
            );
            this.props.nextTask();
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
  const {model, currentTask} = state;
  return {model, currentTask};
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
)(CollectTaskFinishedScreen);
