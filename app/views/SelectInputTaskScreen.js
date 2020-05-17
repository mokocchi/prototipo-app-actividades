import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Text, StyleSheet, Button, BackHandler, Picker } from 'react-native';
import { setTaskResult } from '../redux/actions';
import NextTaskButtons from '../components/NextTaskButtons';

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
      value: task.elements[0].code
    };
  }

  render() {
    const t = this.props.screenProps.t;
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
            {task.elements.map((option, index) =>
              <Picker.Item key={index} label={option.name} value={option.code} />
            )}
          </Picker>
        </View>

        <NextTaskButtons condition={this.state.value} result={this.state.value} task={task} answer={[this.state.value]}
          setTaskResult={this.props.setTaskResult} navigate={this.props.navigation.navigate}/>
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
