import React from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {Converter} from './components/converter';
// import {MultiConverter} from './components/multi-converter';

export const ConverterScreen = () => {
  return (
    <SafeAreaView style={styles.content}>
      <Converter />
      {/* <MultiConverter /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
});
