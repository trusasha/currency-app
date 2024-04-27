import type {FC} from 'react';
import React from 'react';
import type {TouchableOpacityProps} from 'react-native';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import DropdownIcon from 'common/assets/icons/drop-down.svg';

interface Props extends Omit<TouchableOpacityProps, 'disabled'> {
  name: string;
  type?: 'selector';
  isDisabled?: boolean;
}

export const Currency: FC<Props> = ({
  name,
  type,
  isDisabled,
  onPress,
  style,
  ...rest
}) => {
  return (
    <TouchableOpacity
      disabled={isDisabled || !onPress}
      onPress={onPress}
      style={[styles.container, style]}
      {...rest}>
      <Text style={styles.currency}>{name}</Text>
      {getRightElement(type)}
    </TouchableOpacity>
  );
};

const getRightElement = (type: Props['type']) => {
  switch (type) {
    case 'selector':
      return <DropdownIcon />;
    default:
      return null;
  }
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currency: {
    fontSize: 16,
    fontWeight: '600',
  },
  ml4: {
    marginLeft: 4,
  },
});
