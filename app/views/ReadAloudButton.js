import React, { Component } from 'react';
import { Button } from 'react-native';
import Tts from "react-native-tts";

class ReadAloudButton extends Component {
    state = {
        voices: [],
        ttsStatus: "initiliazing",
        selectedVoice: null,
        speechRate: 0.5,
        speechPitch: 1,
        text: "This is an example text"
    };

    constructor(props) {
        super(props);
        Tts.setDefaultRate(this.state.speechRate);
        Tts.setDefaultPitch(this.state.speechPitch);
        Tts.getInitStatus().then(this.initTts);
    }

    initTts = async () => {
        const voices = await Tts.voices();
        const availableVoices = voices
            .filter(v => !v.networkConnectionRequired && !v.notInstalled)
            .map(v => {
                return { id: v.id, name: v.name, language: v.language };
            });
        let selectedVoice = voices.find(voice => voice.language.split("-")[0] === this.props.language);
        await Tts.setDefaultVoice(selectedVoice.id);
    };

    comp
    
    read = async () => {
        Tts.stop();
        Tts.speak(this.props.text);
    };
    render() {
        const { title } = this.props;
        return (
            <Button title={title} onPress={this.read} />
        )
    }
}
export default ReadAloudButton;