import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Text, StyleSheet, Button, BackHandler, Picker, PermissionsAndroid } from 'react-native';
import * as RNFS from 'react-native-fs';
import { loadModel } from '../redux/actions';

class SelectFileScreen extends Component {
    loadJSON(that) {
        async function requestStoragePermission() {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE, {
                    'title': 'Permisos',
                    'message': 'Se necesita permiso para usar el almacenamiento'
                }
                )
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    const file = that.state.value;
                    RNFS.readFile(RNFS.ExternalStorageDirectoryPath + '/Prototipo2/configuracion/' + file).then(data => {
                        that.props.loadModel(JSON.parse(data));
                        that.props.navigation.navigate('Welcome');
                    })
                        .catch(err => {
                            console.log(err.message, err.code);
                        });
                } else {
                    console.log("permission denied");
                }
            } catch (err) {
                console.warn(err);
            }
        }
        requestStoragePermission()
    }
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
        this.state = {
            value: null
        };
    }

    render() {
        const files = this.props.navigation.getParam("files", [])
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Configuraciones disponibles</Text>
                <Text style={styles.text}>Elegí una configuración para empezar</Text>
                <View>
                    <Picker
                        selectedValue={this.state.value}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({ value: itemValue })}
                    >
                        {files.map((file, index) =>
                            <Picker.Item key={index} label={file} value={file} />
                        )}
                    </Picker>
                </View>

                <Button
                    title="Continuar"
                    onPress={() => {
                        if(this.state.value != null) {
                            this.loadJSON(this);
                        }
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
    const { } = state;
    return {};
};

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            loadModel
        },
        dispatch,
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SelectFileScreen);
