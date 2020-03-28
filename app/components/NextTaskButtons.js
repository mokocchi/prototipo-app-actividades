import React from 'react';
import { View, Button } from 'react-native';
import ContinueTaskButton from './ContinueTaskButton';
import SkipTaskButton from './SkipTaskButton';

const NextTaskButtons = (props) =>
    (<View>
        <ContinueTaskButton navigate={props.navigate} setTaskResult={props.setTaskResult}
        condition={props.condition} result={props.result} task={props.task} answer={props.answer} />
        <SkipTaskButton navigate={props.navigate} optional={props.task.optional} />
    </View>)

export default NextTaskButtons;