import {useMemo} from 'react';
import {TextInputProps} from 'react-native';
import {formatNumberWithCommas, removeCommasFromString} from '../../../utils';

interface FormatterProps<K extends string> {
  setValues: React.Dispatch<React.SetStateAction<Record<K, string>>>;
  valuesRef: React.MutableRefObject<Record<K, string>>;
}

/**
 * Hook to create input formatters for currency values.
 * Provides onFocus and onBlur handlers for each input field, identified by keys in the `valuesRef` object.
 * It dynamically handles the formatting and parsing of currency inputs.
 *
 * @template K - Type of the keys used for identifying each input field.
 * @param {FormatterProps<K>} params - The parameters for configuring the hook, including setters for values and a reference to the current values.
 * @returns {Object} - An object containing onFocus and onBlur handlers for all fields specified in valuesRef.
 */
export const useCurrencyFormatter = <K extends string>({
  setValues,
  valuesRef,
}: FormatterProps<K>) => {
  const formatCallbacks = useMemo((): {
    onFocus: Record<K, TextInputProps['onFocus']>;
    onBlur: Record<K, TextInputProps['onBlur']>;
  } => {
    const keys = Object.keys(valuesRef.current) as K[];

    return keys.reduce(
      (acc: any, key: K) => {
        const onFocus: TextInputProps['onFocus'] = ({nativeEvent: {text}}) =>
          setValues(state => ({
            ...state,
            [key]: removeCommasFromString(text || valuesRef.current?.[key]),
          }));

        const onBlur: TextInputProps['onBlur'] = ({nativeEvent: {text}}) =>
          setValues(state => ({
            ...state,
            [key]: formatNumberWithCommas(text || valuesRef.current?.[key]),
          }));

        acc.onFocus[key] = onFocus;
        acc.onBlur[key] = onBlur;

        return acc;
      },
      {
        onFocus: {},
        onBlur: {},
      },
    );
  }, [setValues, valuesRef]);

  return formatCallbacks;
};
