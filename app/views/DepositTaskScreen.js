import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {View, Text, StyleSheet, Button, BackHandler} from 'react-native';
import {ListItem} from 'react-native-elements';
import {setCurrentTask, setTaskResult, removeCollectedCode} from '../redux/actions';

class DepositTaskScreen extends Component {
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
    const checked = this.props.collectedCodes.map(item => false);
    this.state = {
      checked: checked,
      codes: this.props.collectedCodes
    };
  }

  render() {
    const task = this.props.model.tasks[this.props.currentTask];
    const codenames = this.props.model.tasks.filter(task => task.type == "collect").map(task => task.elements).flat();
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Dejar elementos</Text>
        <Text style={styles.text}>{task.name}</Text>
        <View>
          { this.props.collectedCodes.map((code, index) => (
            <ListItem
              key={index}
              title={codenames.find(elem => elem.code == code).name}
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
          title="Dejar los elementos seleccionados"
          onPress={()=>
            {
            const codes = this.props.collectedCodes.filter((item, index) => this.state.checked[index])
            this.props.setTaskResult(task.code, codes, task.type);
            codes.map(code => this.props.removeCollectedCode(code));
            this.props.navigation.navigate('DepositTaskResult', {result:codes})
            }
          }/>

        <Button
          title="No dejar nada"
          onPress={() => {
            this.props.setTaskResult(task.code, [], task.type);
            this.props.navigation.navigate("DepositTaskResult", {result:this.props.collectedCodes});
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
  const {model, currentTask, collectedCodes} = state;
  return {model, currentTask, collectedCodes};
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setCurrentTask,
      setTaskResult,
      removeCollectedCode
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DepositTaskScreen);
