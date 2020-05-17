import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {View, Text, StyleSheet, Button, BackHandler} from 'react-native';
import {ListItem} from 'react-native-elements';
import {setCurrentTask} from '../redux/actions';

class LeaveItemsScreen extends Component {
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
    const checked = this.props.navigation.getParam("codes", []).map(item => false);
    this.state = {
      checked: checked,
    };
  }

  render() {
    const t = this.props.screenProps.t;
    const task = this.props.model.tasks[this.props.currentTask];
    var codes = this.props.navigation.getParam("codes", []);
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Dejar elementos</Text>
        <Text style={styles.text}>{task.name}</Text>
        <View>
          { codes.map((code, index) => (
            <ListItem
              key={index}
              title={task.elements.find(elem => elem.code == code).name}
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
          title={t("LeaveItems_001")}
          onPress={()=>
            {
            codes = codes.filter((item, index) => !this.state.checked[index])
            this.props.navigation.navigate('MyBag', {codes: codes})
            }
          }/>

        <Button
          title={t("LeaveItems_002")}
          onPress={() => {
            this.props.navigation.navigate('MyBag', {codes: codes});
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
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LeaveItemsScreen);
