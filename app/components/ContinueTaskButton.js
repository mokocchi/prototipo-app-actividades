import React from 'react';
import Button from './Button'

const ContinueTaskButton = (props) => (
    <Button
        title={t("ContinueTaskButton_001")}
        disabled={!props.condition}
        onPress={() => {
            props.setTaskResult(props.task.code, props.result, props.task.type)
            props.navigate("TaskResult", props.answer ? { answer: props.answer } : null);
        }}></Button>
);

export default ContinueTaskButton;