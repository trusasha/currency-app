import type {NavigationHelpers} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import {ScreenParams} from 'navigation';

export const useNavigate = () => {
  const {navigate} = useNavigation<NavigationHelpers<ScreenParams>>();

  return navigate;
};
