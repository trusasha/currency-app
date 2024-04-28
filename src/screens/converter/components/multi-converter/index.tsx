import {useRoute} from '@react-navigation/native';
import {RouteParams} from 'navigation';
import React from 'react';
import {BorderedList} from 'components/bordered-list';
import {Currency} from 'components/currency';
import {StyleSheet, TextInput, View} from 'react-native';
import {COLORS} from 'theme';
import {useConverterValues} from 'screens/converter/components/multi-converter/hooks/use-converter-values';
import {useCurrencyFormatter} from './hooks/use-converter-input-formatters';
import {mockDefaultCurrencies} from 'screens/converter/mock';

const initialValues = {first: '1', second: '', third: ''};
const initialCurrencies = {
  first: mockDefaultCurrencies[0],
  second: mockDefaultCurrencies[1],
  third: mockDefaultCurrencies[2],
};

type ValueFields = keyof typeof initialValues;

/**
 * A React component for a multi-field currency converter.
 * This component integrates with custom hooks to manage currency values and input formatting.
 * It supports dynamic addition of currency fields, making it flexible for various conversion scenarios.
 *
 * The `MultiConverter` utilizes the `useConverterValues` hook to handle state and logic for currency
 * conversion values, and `useCurrencyFormatter` for input formatting. This setup provides a robust
 * solution for converting between multiple currencies simultaneously.
 *
 * Features include:
 * - Dynamic field rendering based on initial values provided.
 * - Each field has its own currency selector and input handlers.
 * - Integration with a navigation system to handle passing of selected currencies.
 *
 * @returns {React.Component} Renders a bordered list of currency input fields, each paired with a currency selector.
 *
 * Note: This component is designed as a template and can be extended to handle unlimited number of converter fields.
 * It currently uses mock data for demonstration purposes and should be integrated with actual data in a production environment.
 */
export const MultiConverter = () => {
  const route = useRoute<RouteParams<'app/converter'>>();

  const {selectedCurrency, inputId} = route.params || {};

  const inputIdTyped = inputId as 'first' | 'second' | 'third';

  const {
    values,
    currencies,
    currencyHandlers,
    onChangeHandlers,
    setters: {setValues},
    currencyValuesRef,
  } = useConverterValues({
    initialValues,
    initialCurrencies,
    inputId: inputIdTyped,
    selectedCurrency,
  });

  const keys = Object.keys(initialValues) as ValueFields[];

  const {onFocus, onBlur} = useCurrencyFormatter({
    setValues,
    valuesRef: currencyValuesRef,
  });

  return (
    <BorderedList label="Converter">
      {keys.map((key: ValueFields) => {
        return (
          <View style={styles.itemContent} key={key}>
            <TextInput
              value={values[key]}
              style={styles.currencyInput}
              onChangeText={onChangeHandlers[key]}
              placeholder="-"
              onFocus={onFocus[key]}
              onBlur={onBlur[key]}
            />
            <Currency
              name={currencies[key]?.name || ''}
              type="selector"
              onPress={currencyHandlers[key]}
            />
          </View>
        );
      })}
    </BorderedList>
  );
};

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
