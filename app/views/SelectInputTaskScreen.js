import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Text, StyleSheet, Button, BackHandler, Picker } from 'react-native';
import { ListItem } from 'react-native-elements';
import { setCurrentTask, setTaskResult } from '../redux/actions';
import { mapScreen } from '../functions';
import {
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler';

class SelectInputTaskScreen extends Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton() {
    return true;
  }

  constructor(props) {
    super(props);
    console.log("constructor")
    const task = this.props.model.tasks[this.props.currentTask];
    this.state = {
      value: task.options[0].code
    };
  }

  render() {
    console.log("render")
    const activity = this.props.model.educationalActivity;
    const task = this.props.model.tasks[this.props.currentTask];
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{task.name}</Text>
        <Text style={styles.text}>{task.instruction}</Text>

        <View>
          <Picker
           selectedValue={this.state.value}
           onValueChange={(itemValue, itemIndex) =>
            this.setState({value: itemValue})}
           >
            {task.options.map((option, index) =>
              <Picker.Item label={option.text} value={option.code} />
            )}
          </Picker>
        </View>

        <Button
          title="Continuar"
          onPress={() => {
            this.props.setTaskResult(task.code, this.state.value, task.type);
            this.props.navigation.navigate("TaskResult");
          }}></Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'space-between',
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
      setCurrentTask,
      setTaskResult
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SelectInputTaskScreen);
