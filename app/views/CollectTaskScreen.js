import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  View,
  Text,
  Image,
  StyleSheet,
  BackHandler,
  TouchableOpacity,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import {Button} from 'react-native-elements';
import {nextTask, setTaskResult, addCollectedCode} from '../redux/actions';
import {CameraKitCameraScreen} from 'react-native-camera-kit';

class CollectTaskScreen extends Component {
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
    codes: this.props.navigation.getParam("codes", []),
  };

  startScanner(that) {
    async function requestCameraPermission() {
      const t = that.props.screenProps.t;
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: t("CollectTask_001"),
            message: t("CollectTask_002"),
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          that.setState({startScanner: true});
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
    this.setState({startScanner: false});
    if (!task.elements.find(item => item.code == code)) {
      Alert.alert(t("CollectTask_003"), t("CollectTask_004"))
    } else if (this.state.codes.includes(code)) {
      Alert.alert(t("CollectTask_005"), t("CollectTask_012"));
    } else {
      this.setState({
        codes: [...this.state.codes, code],
      });
    }
  }

  render() {
    const t = this.props.screenProps.t;
    const task = this.props.model.tasks[this.props.currentTask];
    if (this.state.startScanner) {
      return (
        <View style={{flex: 1}}>
          <CameraKitCameraScreen
            scanBarcode={true}
            onReadCode={event =>
              this.onQR_Code_Scan_Done(event.nativeEvent.codeStringValue, task)
            }
          />
          <Button
            title={t("CollectTask_006")}
            onPress={() => this.setState({startScanner: false})}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.topBar}>
            <TouchableOpacity style={styles.button}>
              <Text style={{color: '#FFF', fontSize: 14}}>{t("CollectTask_007")}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.props.navigation.navigate('MyBag', {codes: this.state.codes});
              }}>
              <Text style={{color: '#FFF', fontSize: 14}}>{t("CollectTask_008")}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={{color: '#FFF', fontSize: 14}}>{t("CollectTask_009")}</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.text}>{task.name}</Text>
          <Text style={{}}>{task.instruction}</Text>

          <Button
            title={t("CollectTask_010")}
            onPress={() => {
              this.startScanner(this);
            }}
          />

          <View
            style={{
              flex: 2,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Button
              title={t("CollectTask_011")}
              onPress={() => {
                this.props.setTaskResult(task.code, this.state.codes, task.type);
                this.state.codes.map(code => this.props.addCollectedCode(code));
                this.props.navigation.navigate('CollectTaskResult', {result:this.state.codes});
              }}
            />
          </View>
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
  const {model, currentTask} = state;
  return {model, currentTask};
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      nextTask,
      setTaskResult,
      addCollectedCode
    },
    dispatch,
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CollectTaskScreen);
