import React, {FC} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import {COLORS} from 'theme';

interface Props extends TouchableOpacityProps {
  label: string;
  isSecondary?: boolean;
}

export const Button: FC<Props> = ({label, isSecondary, style, ...rest}) => (
  <TouchableOpacity
    style={[styles.container, isSecondary && styles.containerSecondary, style]}
    {...rest}>
    <Text style={[styles.text, isSecondary && styles.textSecondary]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    height: 48,
    borderRadius: 8,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  containerSecondary: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.border,
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.white,
  },
  textSecondary: {
    color: COLORS.primary,
  },
});
