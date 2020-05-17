import React from 'react';
import { Button } from 'react-native';

const SkipTaskButton = (props) => (
    props.optional ? <Button title={t("SkipTaskButton_001")} onPress={() => props.navigate("TaskResult")} /> : null
)

export default SkipTaskButton;