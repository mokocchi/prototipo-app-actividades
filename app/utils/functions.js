export const mapScreen = type => {
  switch (type) {
    case 'simple':
      return 'SimpleTask';
    case 'textInput':
      return 'TextInputTask';
    case 'numberInput':
      return 'TextInputTask'
    case 'cameraInput':
      return 'CameraInputTask';
    case 'audioInput':
      return 'AudioInputTask';
    case 'select':
      return 'SelectInputTask';
    case 'multiple':
      return 'MultipleChoiceTask';
    case 'counters':
      return 'CountersTask';
    case 'collect':
      return 'PositionedTask'
    case 'deposit':
      return 'PositionedTask';
    case 'GPSInput':
      return 'SimpleTask'
    case 'choose':
      return 'ChooseTask';
    case 'results':
      return 'ActivityResults';
    case 'sendAnswers':
      return 'SendAnswers'
    default:
      return 'Welcome';
  }
};
