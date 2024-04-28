import {useMemo} from 'react';
import {TextInputProps} from 'react-native';
import {formatNumberWithCommas, removeCommasFromString} from '../utils';

export const useConverterInputFormatters = ({
  setToValue,
  setFromValue,
}: {
  setToValue: React.Dispatch<React.SetStateAction<string>>;
  setFromValue: React.Dispatch<React.SetStateAction<string>>;
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
        to: ({nativeEvent: {text}}) => setToValue(removeCommasFromString(text)),
        from: ({nativeEvent: {text}}) =>
          setFromValue(removeCommasFromString(text)),
      },
      onBlur: {
        to: ({nativeEvent: {text}}) => setToValue(formatNumberWithCommas(text)),
        from: ({nativeEvent: {text}}) =>
          setFromValue(formatNumberWithCommas(text)),
      },
    }),
    [setFromValue, setToValue],
  );

  return formatCallbacks;
};
