import {useMemo} from 'react';
import {TextInputProps} from 'react-native';
import {formatNumberWithCommas, removeCommasFromString} from '../../../utils';

/**
 * Custom React hook that provides input formatting functionalities for currency conversion fields.
 * It specifically handles formatting for two input fields, 'to' and 'from'. This hook sets up onFocus
 * and onBlur event handlers for each field. The onFocus handler removes commas for clear numeric editing,
 * and the onBlur handler adds commas back to enhance readability of the numeric values.
 */
export const useConverterInputFormatters = ({
  setToValue,
  setFromValue,
  currencyValuesRef,
}: {
  setToValue: React.Dispatch<React.SetStateAction<string>>;
  setFromValue: React.Dispatch<React.SetStateAction<string>>;
  currencyValuesRef: React.MutableRefObject<{
    from: string;
    to: string;
  }>;
}) => {
  const formatCallbacks = useMemo(
    (): {
      onFocus: {
        to: TextInputProps['onFocus'];
        from: TextInputProps['onFocus'];
      };
      onBlur: {
        to: TextInputProps['onBlur'];
        from: TextInputProps['onBlur'];
      };
    } => ({
      onFocus: {
        to: ({nativeEvent: {text}}) =>
          setToValue(
            removeCommasFromString(text || currencyValuesRef.current?.to),
          ),
        from: ({nativeEvent: {text}}) =>
          setFromValue(
            removeCommasFromString(text || currencyValuesRef.current?.from),
          ),
      },
      onBlur: {
        to: ({nativeEvent: {text}}) =>
          setToValue(
            formatNumberWithCommas(text || currencyValuesRef.current?.to),
          ),
        from: ({nativeEvent: {text}}) =>
          setFromValue(
            formatNumberWithCommas(text || currencyValuesRef.current?.from),
          ),
      },
    }),
    [currencyValuesRef, setFromValue, setToValue],
  );

  return formatCallbacks;
};
