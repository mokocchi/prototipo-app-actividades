import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Text, StyleSheet, Button, BackHandler, Picker, PermissionsAndroid } from 'react-native';
import * as RNFS from 'react-native-fs';
import { loadModel } from '../redux/actions';

class SelectFileScreen extends Component {
    async getNameFromJson(filename, t) {
        await RNFS.readFile(RNFS.ExternalStorageDirectoryPath + '/Prototipo3/configuracion/' + filename).then(data => {
            parsedJSON = JSON.parse(data);
            const name = parsedJSON.educationalActivity ? parsedJSON.educationalActivity.name : ""
            const names = this.state.names;
            names[filename] = name;
            this.setState({
                names: names
            })
        }).catch(err => {
            console.log(err.message, err.code);
        });
    }

    loadJSON(that) {
        const file = that.state.value;
        RNFS.readFile(RNFS.ExternalStorageDirectoryPath + '/Prototipo3/configuracion/' + file).then(data => {
            parsedJSON = JSON.parse(data);
            that.props.loadModel(parsedJSON);
            that.props.screenProps.setLocale(parsedJSON.language);
            that.props.navigation.navigate('Welcome');
        })
            .catch(err => {
                console.log(err.message, err.code);
            });
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
        const files = this.props.navigation.getParam("files", [])
        if (files.length > 0) {
            this.state = {
                value: files[0]
            };
        } else {
            this.state = {
                value: ""
            };
        }
        this.state.names = {}
        files.forEach(filename => {
            this.getNameFromJson(filename);
        });

    }

    render() {
        let { t } = this.props.screenProps;
        const files = this.props.navigation.getParam("files", []);
        const activityNames = this.state.names;
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{t("SelectFile_001")}</Text>
                <Text style={styles.text}>{t("SelectFile_004")}</Text>
                <View>
                    <Picker
                        selectedValue={this.state.value}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({ value: itemValue })}
                    >
                        {Object.keys(activityNames).map((key, index) =>
                            <Picker.Item key={index} label={activityNames[key]} value={key} />
                        )}
                    </Picker>
                    {
                        files.length > 0 ? null : <Text>{t("SelectFile_005")}</Text>
                    }
                </View>

                <Button
                    title={t("SelectFile_006")}
                    onPress={() => {
                        if (this.state.value != "") {
                            this.loadJSON(this, t);
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
