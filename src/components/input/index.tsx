import React, {FC} from 'react';
import {
  TextInput as RNTextInput,
  StyleSheet,
  TextInputProps,
} from 'react-native';
import {COLORS} from 'theme';

export const TextInput: FC<TextInputProps> = ({style, ...rest}) => (
  <RNTextInput style={[styles.container, style]} {...rest} />
);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    backgroundColor: COLORS.border,
    borderRadius: 8,
    fontSize: 16,
    height: 48,
  },
});
