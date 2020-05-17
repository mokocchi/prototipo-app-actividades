import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Text, StyleSheet, Button, BackHandler, PermissionsAndroid, Alert, TextInput, ActivityIndicator } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { setTaskResult } from '../redux/actions';
import MapView, { Marker } from 'react-native-maps';
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
        { text: t("GPSInputTask_003"), onPress: () => this.setState({ currentLocation: false }), style: 'cancel' },
        { text: t("GPSInputTask_004"), onPress: () => this.requestGPSPermission() },
      ],
      { cancelable: false }
    )
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
          this.setState({
            loading: true
          })
          Geolocation.getCurrentPosition((pos) => {
            this.setState({
              location: pos, currentLocation: true,
              region: {
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0,
                loading: false
              }
            })
          },
            error => {
              console.log(error.message);
              Geolocation.getCurrentPosition((pos) => {
                this.setState({
                  location: pos, currentLocation: true,
                  region: {
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0,
                  },
                  loading: false
                })
              }, () => {this.setState({ loading: false }); Alert.alert(t("GPSInputTask_017"),t("GPSInputTask_018"))}, { enableHighAccuracy: false, timeout: 5000 })
        }
            ,
        { enableHighAccuracy: true, timeout: 10000 }
          );
      } catch (error) {
        console.log(error.message)
        this.setState({ loading: false })
      }
    } else {
      this.setState({ loading: false })
      console.log('permission denied');
    }
  } catch(err) {
    console.warn(err);
    this.setState({ loading: false })
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
    useInternet: false,
    currentLocation: false,
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
    address: "",
    loading: false
  }
  this.requestGPSPermission = this.requestGPSPermission.bind(this);
}

handleLongPress = (e) => {
  const region = e.nativeEvent.coordinate;
  region.latitudeDelta = 0.005;
  region.longitudeDelta = 0;
  this.setState({
    coordinate: region,
    currentLocation: false
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

handleToggleInternet = () => this.setState({ useInternet: !this.state.useInternet, select: true })

render() {
  const t = this.props.screenProps.t;
  const task = this.props.model.tasks[this.props.currentTask];
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{task.name}</Text>
      <Text style={styles.text}>{task.instruction}</Text>

      {!this.state.write ?
        (!this.state.useInternet ?
          <Button title={t("GPSInputTask_016")} onPress={this.handleToggleInternet}></Button>
          :
          <>
            {!this.state.read && (this.state.loading ? <ActivityIndicator /> : <Button title={t("GPSInputTask_009")} onPress={this.handlePress} />)}
            {this.state.select && <Text>{t("GPSInputTask_011")}</Text>}
            {this.state.read && !this.state.select && !this.state.currentLocation && <Text>{t("GPSInputTask_012")}</Text>}
            <View>
              <MapView
                provider={"google"}
                style={styles.map}
                scrollEnabled={true}
                zoomEnabled={true}
                pitchEnabled={false}
                rotateEnabled={true}
                region={this.state.currentLocation ? this.state.region : this.state.coordinate}
                initialRegion={this.state.region}
                onLongPress={this.handleLongPress}
              >
                {(this.state.coordinate || (this.state.currentLocation && this.state.region)) &&
                  <Marker
                    title={t("GPSInputTask_010")}
                    coordinate={this.state.currentLocation ? this.state.region : this.state.coordinate}
                  />
                }
              </MapView>
            </View>
            {this.state.read && !this.state.select && <Text>{t("GPSInputTask_013")}</Text>}
          </>
        )
        :
        <TextInput placeholder={t("GPSInputTask_014")} onChangeText={this.handleChange} />}
      <Button title={this.state.addressButton} onPress={this.handleTogglePress}></Button>

      <Button
        title={t("GPSInputTask_015")}
        onPress={() => {
          if ((this.state.write && this.state.address) || (this.state.currentLocation && this.state.region) || (this.state.select && this.state.coordinate)) {
            this.props.setTaskResult(task.code, { type: this.state.write ? "address" : "coords", data: this.state.write ? this.state.address : (this.state.location ? this.state.location.coords : this.state.coordinate) }, task.type)
            this.props.navigation.navigate("TaskResult");
          }
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
