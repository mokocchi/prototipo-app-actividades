import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Text, StyleSheet, BackHandler, ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements';
import { setCurrentTask, setTaskResult } from '../redux/actions';
import SkipTaskButton from '../components/SkipTaskButton';
import Header from '../components/Header';
import Button from '../components/Button';
import container from './styles/container';
import text from './styles/text';
import title from './styles/title';

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
      <>
        <Header />
        <View style={styles.container}>
          <Text style={styles.title}>{task.name}</Text>
          <Text style={styles.text}>{task.instruction}</Text>

          <ScrollView>
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
          </ScrollView>

          <Button
            title={t("CountersTask_001")}
            onPress={() => {
              if (task.byScore) {
                const result = {};
                task.elements.forEach((item, index) => result[item.code] = (parseInt(this.state.counters[index]) || 0) )
                this.props.setTaskResult(task.code, result, task.type);
                this.props.navigation.navigate('ResultByScore', { result: result });
              } else {
                if (task.byWeight) {
                  this.props.navigate("ResultByWeight", { result: this.state.counters })
                } else {
                  this.props.navigation.navigate("TaskResult");
                }
              }
            }}></Button>
          <SkipTaskButton navigate={this.props.navigation.navigate} optional={task.optional} />
          <View />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...container
  },
  text: {
    ...text
  },
  title: {
    ...title
  }
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
)(CountersTaskScreen);
