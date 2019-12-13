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
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Permisos',
            message: 'Se necesita permiso para usar la cámara',
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
      alert('Lo siento, el código no es el correcto');
    }
  }

  render() {
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
          <Button title="Volver" onPress={() => this.setState({ startScanner: false })} />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>
            En el mapa se les muestra el lugar donde deberán ir para continuar
            con la actividad
          </Text>

          <Text style={styles.text}>Ir a la tarea: {task.name}</Text>
          <Button
            title="Abrir escáner"
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
