import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Text, StyleSheet, Button, BackHandler } from 'react-native';
import { setCurrentTask } from '../redux/actions';

class ChooseDepositScreen extends Component {
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
  }

  render() {
    const deposits = this.props.model.tasks.filter(item => item.type == "deposit");
    const task = this.props.model.tasks[this.props.currentTask];
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Depósitos</Text>
        <Text style={styles.text}>Elijan un depósito para dejar los elementos recolectados</Text>

        <View>
          {
            deposits.map((item, index) =>
              <Button
                key={index}
                title={item.name}
                onPress={() => {
                  this.props.navigation.navigate('PositionedTask');
                  nextTask = this.props.model.tasks.findIndex(task => task.code == item.code);
                  this.props.setCurrentTask(nextTask);
                }}></Button>
            )
          }
        </View>


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
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChooseDepositScreen);
