import React from 'react';
import Button from './Button'

const ContinueTaskButton = (props) => (
    <Button
        title={t("ContinueTaskButton_001")}
        onPress={() => {
            if (props.condition) {
                props.setTaskResult(props.task.code, props.result, props.task.type)
                props.navigate("TaskResult", props.answer ? { answer: props.answer } : null);
            }
        }}></Button>
);

export default ContinueTaskButton;