import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Text, StyleSheet, Button, BackHandler, PermissionsAndroid, Alert, TextInput } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { setTaskResult } from '../redux/actions';
import MapView, { Marker } from 'react-native-maps';
import { Input } from 'react-native-elements';
import SkipTaskButton from '../components/SkipTaskButton';

class GPSInputTaskScreen extends Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton)
  }
  handlePress = () => {
    Alert.alert(
      t("GPSInputTask_001"),
      t("GPSInputTask_002"),
      [
        { text: t("GPSInputTask_003"), onPress: () => this.setState({ select: true }), style: 'cancel' },
        { text: t("GPSInputTask_004"), onPress: () => this.requestGPSPermission() },
      ],
      { cancelable: false }
    )
    this.setState({
      read: true
    })
  }

  async requestGPSPermission() {
    t = this.props.screenProps.t;
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: t("GPSInputTask_005"),
          message: t("GPSInputTask_006"),
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        try {
          Geolocation.getCurrentPosition((pos) => {
            this.setState({
              location: pos, granted: true,
              region: {
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0,
              }
            })
          },
            error => {
              console.log(error.message);
              Geolocation.getCurrentPosition((pos) => {
                this.setState({
                  location: pos, granted: true,
                  region: {
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0,
                  }
                })
              }, null, { enableHighAccuracy: false, timeout: 5000 })
            }
            ,
            { enableHighAccuracy: true, timeout: 10000 }
          );
        } catch (error) {
          console.log(error.message)
        }
      } else {
        console.log('permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton() {
    return true;
  }

  constructor(props) {
    super(props);
    const task = this.props.model.tasks[this.props.currentTask];
    const result = this.props.taskResults.find((item) => task.code == item.code);
    if (result != null) { console.log(result.result.uri); }
    this.state = {
      read: false,
      select: false,
      granted: false,
      location: null,
      coordinate: null,
      write: false,
      addressButton: t("GPSInputTask_007"),
      region: {
        latitude: -34.9036428,
        longitude: -57.9377245,
        latitudeDelta: 0.0020,
        longitudeDelta: 0,
      },
      address: ""
    }
    this.requestGPSPermission = this.requestGPSPermission.bind(this);
  }

  handleLongPress = (e) => {
    const region = e.nativeEvent.coordinate;
    region.latitudeDelta = 0.005;
    region.longitudeDelta = 0;
    this.setState({
      coordinate: region
    })
  }

  handleChange = (text) => {
    this.setState({
      address: text
    });
  }

  handleTogglePress = () => {
    if (this.state.write) {
      this.setState({ write: false, addressButton: t("GPSInputTask_007") })
    } else {
      this.setState({ write: true, addressButton: t("GPSInputTask_008") })
    }
  }

  render() {
    const t = this.props.screenProps.t;
    const task = this.props.model.tasks[this.props.currentTask];
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{task.name}</Text>
        <Text style={styles.text}>{task.instruction}</Text>

        <Button title={this.state.addressButton} onPress={this.handleTogglePress}></Button>

        {!this.state.write ?
          <>
            {!this.state.read && <Button title={t("GPSInputTask_009")} onPress={this.handlePress} />}
            {this.state.select && <Text>{t("GPSInputTask_011")}</Text>}
            {this.state.read && !this.state.select && !this.state.granted && <Text>{t("GPSInputTask_012")}</Text>}
            <View>
              <MapView
                provider={"google"}
                style={styles.map}
                scrollEnabled={true}
                zoomEnabled={true}
                pitchEnabled={false}
                rotateEnabled={true}
                region={this.state.coordinate || this.state.region}
                initialRegion={this.state.region}
                onLongPress={this.handleLongPress}
              >
                {(this.state.select || this.state.granted) &&
                  <Marker
                    title={t("GPSInputTask_010")}
                    coordinate={this.state.coordinate || this.state.region}
                  />
                }
              </MapView>
            </View>
              {this.state.read && !this.state.select && <Text>{t("GPSInputTask_013")}</Text>}
          </>
          :
          <TextInput placeholder={t("GPSInputTask_014")} onChangeText={this.handleChange} />}

        <Button
          title={t("GPSInputTask_015")}
          onPress={() => {
            if ((this.state.write && this.state.address) || (this.state.granted && this.state.region) || (this.state.select && this.state.coordinate)) {
              this.props.setTaskResult(task.code, { type: this.state.write ? "address" : "coords", data: this.state.write ? this.state.address : (this.state.location ? this.state.location.coords : this.state.coordinate) }, task.type)
            }
            this.props.navigation.navigate("TaskResult");
          }}></Button>
          <SkipTaskButton navigate={this.props.navigation.navigate} optional={task.optional} />
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
  map: {
    width: 250,
    height: 250,
    alignSelf: "center"
  },
});

const mapStateToProps = state => {
  const { model, currentTask, taskResults } = state;
  return { model, currentTask, taskResults };
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
)(GPSInputTaskScreen);
