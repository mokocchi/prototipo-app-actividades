import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  BackHandler,
  PermissionsAndroid,
} from 'react-native';
import { CameraKitCameraScreen } from 'react-native-camera-kit';
import SkipTaskButton from '../components/SkipTaskButton';

class PositionedTaskScreen extends Component {
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
    startScanner: false,
  };

  startScanner(that) {
    async function requestCameraPermission() {
      t = that.props.screenProps.t;
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: t("PositionedTask_001"),
            message: t("PositionedTask_002"),
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          that.setState({ startScanner: true });
        } else {
          console.log('permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
    requestCameraPermission();
  }

  onQR_Code_Scan_Done(code, task) {
    const t = this.props.screenProps.t;
    this.setState({
      startScanner: false,
    });
    if (code == task.code) {
      if (task.type == 'collect') {
        this.props.navigation.navigate('CollectTask');
      } else {
        this.props.navigation.navigate('DepositTask');
      }
    } else {
      alert(t("PositionedTask_003"));
    }
  }

  render() {
    const t = this.props.screenProps.t;
    const task = this.props.model.tasks[this.props.currentTask];
    if (this.state.startScanner) {
      return (
        <View style={{ flex: 1 }}>
          <CameraKitCameraScreen
            scanBarcode={true}
            onReadCode={event =>
              this.onQR_Code_Scan_Done(event.nativeEvent.codeStringValue, task)
            }
          />
          <Button title={t("PositionedTask_004")} onPress={() => this.setState({ startScanner: false })} />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>
            {t("PositionedTask_005")}
          </Text>
          <Image source={{uri:'file:///storage/emulated/0/Prototipo4/imagenes/' + task.code + '.png'}} style={{height:200, width:320, resizeMode: "contain", alignSelf: "center"}} />
          <Text style={styles.text}>{t("PositionedTask_006")} {task.name}</Text>
          <Button
            title={t("PositionedTask_007")}
            onPress={() => {
              this.startScanner(this);
            }}
          />
          <Button title="SKIP" onPress={() => {
            if (task.type == 'collect') {
              this.props.navigation.navigate('CollectTask');
            } else {
              this.props.navigation.navigate('DepositTask');
            }
          }} />
          <SkipTaskButton navigate={this.props.navigation.navigate} optional={task.optional}/>
        </View>
      );
    }
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
});

const mapStateToProps = state => {
  const { model, currentTask } = state;
  return { model, currentTask };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      
    },
    dispatch,
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PositionedTaskScreen);
