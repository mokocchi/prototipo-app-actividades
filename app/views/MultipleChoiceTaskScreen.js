import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {View, Text, StyleSheet, Button, BackHandler} from 'react-native';
import {ListItem} from 'react-native-elements';
import {setTaskResult} from '../redux/actions';

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
    const checked = props.model.tasks[props.currentTask].elements.map(item => false);
    this.state = {
      checked: checked,
    };
  }

  render() {
    const t = this.props.screenProps.t;
    const task = this.props.model.tasks[this.props.currentTask];
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{task.name}</Text>
        <Text style={styles.text}>{task.instruction}</Text>

        <View>
          {task.elements.map((element, index) => (
            <ListItem
              key={index}
              title={element.name}
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
          title={t("MultipleChoiceTask_001")}
          onPress={() => {
            var result = task.elements.filter((item, index) => this.state.checked[index]).map(item => item.code);
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
      setTaskResult
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MultipleChoiceTaskScreen);
