import {useRoute} from '@react-navigation/native';
import {BorderedList} from 'components/bordered-list';
import {Currency} from 'components/currency';
import {RouteParams} from 'navigation';
import React, {memo} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {mockDefaultCurrencies} from 'screens/converter/mock';
import {COLORS} from 'theme';
import {useConverterInputFormatters} from './hooks/use-converter-input-formatters';
import {useConverter} from './hooks/use-converter';

const initialValues = {from: '1', to: ''};
const initialCurrencies = {
  from: mockDefaultCurrencies[0],
  to: mockDefaultCurrencies[1],
};

export const Converter = () => {
  const route = useRoute<RouteParams<'app/converter'>>();

  const {selectedCurrency, inputId} = route.params || {};

  const {
    onChangeText,
    onPressCurrency,
    callbacks,
    currencies,
    values,
    setValue,
  } = useConverter({
    initialValues,
    initialCurrencies,
    inputId,
    selectedCurrency,
  });

  const {onFocus, onBlur} = useConverterInputFormatters({
    setToValue: setValue.to,
    setFromValue: setValue.from,
  });

  return (
    <BorderedList
      label="Converter"
      separatorElement={
        <SeparatorElement
          key="separator"
          onSwitch={callbacks.onSwitchCurrencies}
        />
      }>
      <View style={styles.itemContent}>
        <TextInput
          value={values.from}
          style={styles.currencyInput}
          onChangeText={onChangeText.from}
          onFocus={onFocus.from}
          onBlur={onBlur.from}
          placeholder="-"
        />
        <Currency
          name={currencies.from?.name || ''}
          type="selector"
          onPress={onPressCurrency.from}
        />
      </View>
      <View style={styles.itemContent}>
        <TextInput
          value={values.to}
          style={styles.currencyInput}
          onChangeText={onChangeText.to}
          onFocus={onFocus.to}
          onBlur={onBlur.to}
          placeholder="-"
        />
        <Currency
          name={currencies.to?.name || ''}
          type="selector"
          onPress={onPressCurrency.to}
        />
      </View>
    </BorderedList>
  );
};

const SeparatorElement = memo(({onSwitch}: {onSwitch: () => void}) => {
  return (
    <View style={styles.separator}>
      <TouchableOpacity style={styles.separatorSwitch} onPress={onSwitch} />
    </View>
  );
});

const styles = StyleSheet.create({
  itemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  currencyInput: {
    fontSize: 16,
    fontWeight: '600',
    paddingRight: 12,
    paddingVertical: 18,
  },

  separator: {
    width: '100%',
    height: 1,
    backgroundColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  separatorSwitch: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 40,
    backgroundColor: 'blue',
    borderWidth: 12,
    borderColor: COLORS.white,
  },
});
