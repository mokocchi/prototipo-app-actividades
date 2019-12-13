import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Text, StyleSheet, Button, BackHandler, Picker } from 'react-native';
import { setTaskResult } from '../redux/actions';

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
    const task = this.props.model.tasks[this.props.currentTask];
    this.state = {
      value: task.options[0].code
    };
  }

  render() {
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
              <Picker.Item key={index} label={option.text} value={option.code} />
            )}
          </Picker>
        </View>

        <Button
          title="Continuar"
          onPress={() => {
            this.props.setTaskResult(task.code, this.state.value, task.type);
            this.props.navigation.navigate("TaskResult", {"answer":[this.state.value]});
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
      setTaskResult
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SelectInputTaskScreen);
