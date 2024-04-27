import type {FC} from 'react';
import React from 'react';
import type {ViewProps} from 'react-native';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS} from 'theme';

interface Props extends ViewProps {
  label?: string;
  separatorElement?: JSX.Element;
}

export const BorderedList: FC<Props> = ({
  label,
  separatorElement,
  children,
  style,
  ...rest
}) => {
  const childrenArray = React.Children.toArray(children);

  const childrenWitSeparators = childrenArray.reduce(
    (acc: React.ReactNode[], child, index) => {
      acc.push(child);

      if (index < childrenArray.length - 1) {
        acc.push(
          separatorElement || <View style={styles.separator} key={index} />,
        );
      }

      return acc;
    },
    [],
  );

  return (
    <View style={[styles.container, style]} {...rest}>
      {label && <Text style={styles.label}>{label}</Text>}
      {childrenWitSeparators}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    borderColor: COLORS.border,
    borderWidth: 1,
  },
  separator: {
    width: '100%',
    backgroundColor: COLORS.border,
    height: 1,
    marginVertical: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
});
