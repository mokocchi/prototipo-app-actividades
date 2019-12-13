import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  View,
  Text,
  StyleSheet,
  BackHandler,
  ScrollView,
} from 'react-native';
import { Button } from 'react-native-elements';
import { nextTask } from '../redux/actions';

class MyBagScreen extends Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton() {
    return true;
  }

  state = {
    codes: this.props.navigation.getParam("codes", []),
  };

  render() {
    const task = this.props.model.tasks[this.props.currentTask];
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{task.name}</Text>
        <Text style={{}}>{task.instruction}</Text>

        <ScrollView>{this.state.codes.map((code, index) => (
          <Text style={styles.text} key={index}>{task.elements.find(elem => elem.code == code).name}</Text>
        ))}</ScrollView>

        {this.state.codes.length > 0 ? (
          <Button
            title="Dejar elementos"
            onPress={() => {
              this.props.navigation.navigate('LeaveItems', { codes: this.state.codes });
            }}
          />
        ) : null}
        <View
          style={{
            flex: 2,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Button
            title="Volver"
            onPress={() => {
              this.props.navigation.navigate('CollectTask', {codes: this.state.codes});
            }}
          />
        </View>
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
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#2196F3',
    alignItems: 'center',
    padding: 12,
    marginTop: 14,
  },
});

const mapStateToProps = state => {
  const { model, currentTask } = state;
  return { model, currentTask };
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
)(MyBagScreen);
