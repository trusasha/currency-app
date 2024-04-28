import {Button} from 'components/button';
import React, {FC, memo, useRef, useState} from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS} from 'theme';

interface Props {
  value: string;
  setSort: (
    value: React.SetStateAction<
      'price' | '-price' | 'rank' | '-rank' | undefined
    >,
  ) => void;
}

const options = [
  {value: 'price', label: 'Price'},
  {value: '-price', label: '- Price'},
  {value: 'rank', label: 'Rank'},
  {value: '-rank', label: '- Rank'},
] as const;

export const SortPicker: FC<Props> = memo(({value, setSort}) => {
  const [isVisible, setIsVisible] = useState(false);

  const modalRef = useRef<Modal>(null);

  const selectedValue =
    options.find(item => item.value === value)?.label || value;

  return (
    <>
      <Button onPress={() => setIsVisible(true)} label={selectedValue} />
      <Modal
        animationType="fade"
        transparent
        visible={isVisible}
        ref={modalRef}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.backdrop}
            onPress={() => setIsVisible(false)}
          />
          <View style={styles.container}>
            <Text style={styles.title}>Sort by</Text>
            {options.map((item, index) => {
              const isLast = index === options.length - 1;

              return (
                <Button
                  style={!isLast && styles.button}
                  label={item.label}
                  key={item.value}
                  onPress={() => {
                    setSort(item.value);

                    setIsVisible(false);
                  }}
                />
              );
            })}
          </View>
        </View>
      </Modal>
    </>
  );
});

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  container: {
    backgroundColor: COLORS.white,
    width: '90%',
    borderRadius: 12,
    alignSelf: 'center',
    padding: 16,
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    marginBottom: 12,
    fontWeight: '600',
  },
});
