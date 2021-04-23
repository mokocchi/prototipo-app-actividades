import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Text, StyleSheet, BackHandler, ActivityIndicator } from 'react-native';
import * as RNFS from 'react-native-fs';
import { loadModel } from '../redux/actions';
import Header from '../components/Header';
import Button from '../components/Button';
import { Colors } from '../assets/styles'
import title from './styles/title';
import Select from '../components/Select';
import container from './styles/container';

class SelectFileScreen extends Component {
    async getNameFromJson(filename, t) {
        return await RNFS.readFile(RNFS.ExternalStorageDirectoryPath + '/Prototipo5/configuracion/' + filename).then(data => {
            parsedJSON = JSON.parse(data);
            const name = parsedJSON.educationalActivity ? parsedJSON.educationalActivity.name : ""
            const file = {
                name: name,
                filename: filename
            }
            return file;
        }).then(value => { return value }).catch(err => {
            console.log(err.message, err.code);
        });
    }

    loadJSON(that) {
        const file = that.state.value;
        RNFS.readFile(RNFS.ExternalStorageDirectoryPath + '/Prototipo5/configuracion/' + file).then(data => {
            parsedJSON = JSON.parse(data);
            that.props.loadModel(parsedJSON);
            that.props.screenProps.setLocale(parsedJSON.language);
            that.props.navigation.navigate('Welcome');
        })
            .catch(err => {
                console.log(err.message, err.code);
            });
    }

    loadNames = async () => {
        const files = this.props.navigation.getParam("files", [])
        const names = [];
        for (let index = 0; index < files.length; index++) {
            const name = await this.getNameFromJson(files[index]);
            names.push(name);
        }
        this.setState({
            names: names,
            loading: false
        })
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        this.loadNames();
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
            value: "",
            names: [],
            loading: true
        };
    }

    render() {
        let { t } = this.props.screenProps;
        const files = this.props.navigation.getParam("files", []);
        const activityNames = this.state.names;
        return (
            <>
                <Header />
                <View style={styles.container}>
                    <Text style={styles.title}>{t("SelectFile_001")}</Text>
                    {this.state.loading ?
                        <ActivityIndicator />
                        :
                        <Select items={this.state.names} labelField={"name"} valueField={"filename"} noItemsText={t("SelectFile_005")}
                            onChange={(itemValue) => this.setState({ value: itemValue })} placeholder={t("SelectFile_004")}
                            selectedValue={this.state.value} />

                    }

                    <Button
                        disabled={this.state.value === ""}
                        title={t("SelectFile_006")}
                        onPress={() => {
                            this.loadJSON(this, t);
                        }}/>
                    <View />
                </View>
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        ...container
    },
    title: {
        ...title,
    }
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
