import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {View, Text, StyleSheet, Button, BackHandler} from 'react-native';
import {ListItem} from 'react-native-elements';
import {setCurrentTask, setTaskResult} from '../redux/actions';
import {mapScreen} from '../functions';
import {
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler';

class MultipleChoiceTaskScreen extends Component {
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
    const checked = props.model.tasks[props.currentTask].options.map(item => false);
    this.state = {
      checked: checked,
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
          {task.options.map((option, index) => (
            <ListItem
              key={index}
              title={option.text}
              bottomDivider
              checkBox={{
                checkedColor: 'green',
                uncheckedColor: 'red',
                checked: this.state.checked[index],
                onPress: () =>
                  this.setState(state => {
                    const checked = state.checked.map((item, j) => {
                      if (j == index) {
                        return !item;
                      } else {
                        return item;
                      }
                    });
                    return {
                      checked,
                    };
                  }),
              }}
              onPress={() =>
                this.setState(state => {
                  const checked = state.checked.map((item, j) => {
                    if (j == index) {
                      return !item;
                    } else {
                      return item;
                    }
                  });
                  return {
                    checked,
                  };
                })
              }
            />
          ))}
        </View>

        <Button
          title="Continuar"
          onPress={() => {
            var result = task.options.filter((item, index) => this.state.checked[index]).map(item => item.code);
            this.props.setTaskResult(task.code, result, task.type);
            if(task.correctAnswers){
              this.props.navigation.navigate('MultipleChoiceTaskResult', {result: result});
            } else {
              this.props.navigation.navigate("TaskResult", {"answer": result});
            }

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
  const {model, currentTask} = state;
  return {model, currentTask};
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
)(MultipleChoiceTaskScreen);
