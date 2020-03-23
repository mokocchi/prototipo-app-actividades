import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import SplashScreen from '../views/SplashScreen'
import WelcomeScreen from '../views/WelcomeScreen';
import SimpleTaskScreen from '../views/SimpleTaskScreen';
import ChooseTaskScreen from '../views/ChooseTaskScreen';
import TextInputTaskScreen from '../views/TextInputTaskScreen';
import CameraInputTaskScreen from '../views/CameraInputTaskScreen';
import MultipleChoiceTaskScreen from '../views/MultipleChoiceTaskScreen';
import TaskResultScreen from '../views/TaskResultScreen';
import CountersTaskScreen from '../views/CountersTaskScreen';
import ResultByScoreScreen from '../views/ResultByScoreScreen';
import CollectTaskScreen from '../views/CollectTaskScreen';
import PositionedTaskScreen from '../views/PositionedTaskScreen';
import LeaveItemsScreen from '../views/LeaveItemsScreen';
import MyBagScreen from '../views/MyBagScreen';
import ChooseDepositScreen from '../views/_ChooseDepositScreen';
import DepositTaskScreen from '../views/DepositTaskScreen';
import ActivityResultsScreen from '../views/ActivityResultsScreen';
import CollectTaskFinishedScreen from '../views/_CollectTaskFinishedScreen';
import CollectTaskResultScreen from '../views/CollectTaskResultScreen';
import DepositTaskResultScreen from '../views/DepositTaskResultScreen';
import MultipleChoiceTaskResultScreen from '../views/MultipleChoiceTaskResultScreen';
import SendAnswersScreen from '../views/SendAnswersScreen';
import SelectInputTaskScreen from '../views/SelectInputTaskScreen';
import SelectFileScreen from '../views/SelectFileScreen';
import AudioInputTaskScreen from '../views/AudioInputTaskScreen';

export default createAppContainer(
  createSwitchNavigator(
    {
      Splash: SplashScreen,
      SelectFile: SelectFileScreen,
      Welcome: WelcomeScreen,
      ChooseTask: ChooseTaskScreen,
      TaskResult: TaskResultScreen,
      ResultByScore: ResultByScoreScreen,
      SimpleTask: SimpleTaskScreen,
      TextInputTask: TextInputTaskScreen,
      CameraInputTask: CameraInputTaskScreen,
      AudioInputTask: AudioInputTaskScreen,
      SelectInputTask: SelectInputTaskScreen,
      MultipleChoiceTask: MultipleChoiceTaskScreen,
      MultipleChoiceTaskResult: MultipleChoiceTaskResultScreen,
      CountersTask: CountersTaskScreen,
      PositionedTask: PositionedTaskScreen,
      CollectTask: CollectTaskScreen,
      LeaveItems: LeaveItemsScreen,
      MyBag: MyBagScreen,
      ChooseDeposit: ChooseDepositScreen,
      CollectTaskFinished: CollectTaskFinishedScreen,
      CollectTaskResult: CollectTaskResultScreen,
      DepositTask: DepositTaskScreen,
      DepositTaskResult: DepositTaskResultScreen,
      ActivityResults: ActivityResultsScreen,
      SendAnswers: SendAnswersScreen
   },
    {
      initialRouteName: 'Splash',
    }
  )
);