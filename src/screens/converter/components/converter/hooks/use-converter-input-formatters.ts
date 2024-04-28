import {useMemo} from 'react';
import {TextInputProps} from 'react-native';
import {formatNumberWithCommas, removeCommasFromString} from '../utils';

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
