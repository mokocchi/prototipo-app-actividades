import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {View, Text, StyleSheet, Button, BackHandler} from 'react-native';
import {ListItem} from 'react-native-elements';
import {setCurrentTask, setTaskResult} from '../redux/actions';
import SkipTaskButton from '../components/SkipTaskButton';

class CountersTaskScreen extends Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton() {
    return true;
  }

  check(event) {
    alert(element.code);
  }

  constructor(props) {
    super(props);
    const counters = props.model.tasks[props.currentTask].elements.map(item => 0);
    this.state = {
      counters: counters,
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
              input={{
                keyboardType: 'decimal-pad',
                onChangeText: (text) =>
                  this.setState(state => {
                    const counters = state.counters.map((item, j) => {
                      if (j == index) {
                        return text;
                      } else {
                        return item;
                      }
                    });
                    return {
                      counters,
                    };
                  }),
                value: this.state.counters[index].toString()
              }}
            />
          ))}
        </View>

        <Button
          title={t("CountersTask_001")}
          onPress={() => {
            if(task.byScore) {
                const result = task.elements.map((element, index)=>({[element.code]: parseInt(this.state.counters[index])}));
                this.props.setTaskResult(task.code, result, task.type);
                this.props.navigation.navigate('ResultByScore', {result: result});    
            } else {
                if(task.byWeight){
                    this.props.navigate("ResultByWeight",{result: this.state.counters})
                } else {
                    this.props.navigation.navigate('TaskResult');
                }
            }
          }}></Button>
          <SkipTaskButton navigate={this.props.navigation.navigate} optional={task.optional}/>
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
)(CountersTaskScreen);
