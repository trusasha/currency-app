import React from 'react';
import type {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SCREENS} from 'navigation/constants/screens';
import {ConverterScreen} from 'screens/converter';
import {CurrencySelectorScreen} from 'screens/currency-selector';

const Stack = createNativeStackNavigator();

const options: NativeStackNavigationOptions = {
  headerShown: false,
  animation: 'fade',
};

export const MainStack = () => (
  <Stack.Navigator initialRouteName={SCREENS.converter} screenOptions={options}>
    <Stack.Screen
      name={SCREENS.converter}
      options={{title: 'Converter'}}
      component={ConverterScreen}
    />
    <Stack.Screen
      name={SCREENS.currencySelector}
      options={{headerShown: true, title: 'Currency'}}
      component={CurrencySelectorScreen}
    />
  </Stack.Navigator>
);
