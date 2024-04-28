import {Currency} from 'interfaces/currency';
import {SCREENS} from './screens';
import {RouteProp} from '@react-navigation/native';

export type ScreenParams = {
  [SCREENS.converter]:
    | {inputId?: 'to' | 'from'; selectedCurrency?: Currency}
    | undefined;
  [SCREENS.currencySelector]: {inputId: 'to' | 'from'};
};

export type RouteParams<T extends keyof ScreenParams> = RouteProp<
  ScreenParams,
  T
>;
