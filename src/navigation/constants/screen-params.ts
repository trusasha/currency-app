import {SCREENS} from './screens';
import {RouteProp} from '@react-navigation/native';

export type ScreenParams = {
  [SCREENS.converter]: undefined;
  [SCREENS.currencySelector]: undefined;
};

export type RouteParams<T extends keyof ScreenParams> = RouteProp<
  ScreenParams,
  T
>;
