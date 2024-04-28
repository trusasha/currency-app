import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, ViewProps} from 'react-native';

interface Props {
  name: string;
  symbol: string;
  onPress: () => void;
  style?: ViewProps['style'];
}

export const CurrencyItem: FC<Props> = ({name, onPress, symbol, style}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.symbol}>{symbol}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  symbol: {
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 8,
    textTransform: 'uppercase',
    opacity: 0.5,
  },
});
