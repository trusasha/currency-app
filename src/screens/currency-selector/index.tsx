import {SCREENS, type RouteParams} from 'navigation';
import {useRoute} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigate} from 'hooks/use-navigate';
import {useGetCurrencies} from 'queries/get/getCurrencies';
import {FlashList, ListRenderItem} from '@shopify/flash-list';
import {Currency} from 'interfaces/currency';
import {CurrencyItem} from './components/currency-item';

export const CurrencySelectorScreen = () => {
  const navigate = useNavigate();
  const {params} = useRoute<RouteParams<'app/currencySelector'>>();

  const inputId = params?.inputId;

  const {
    data: currencyData,
    hasNextPage: hasNextCurrencies,
    isFetching: isCurrenciesFetching,
    fetchNextPage: fetchNextCurrencies,
  } = useGetCurrencies({});

  const currenciesList = currencyData?.pages?.reduce(
    (acc: Currency[], item) => [...acc, ...item?.data],
    [],
  );

  const renderItem: ListRenderItem<Currency> = useCallback(
    ({item}) => {
      const {name, symbol} = item;

      const onPress = () =>
        navigate(SCREENS.converter, {selectedCurrency: item, inputId});

      return (
        <CurrencyItem
          onPress={onPress}
          name={name}
          symbol={symbol}
          style={styles.item}
        />
      );
    },
    [inputId, navigate],
  );

  return (
    <View style={styles.container}>
      <FlashList
        estimatedItemSize={48}
        data={currenciesList}
        contentContainerStyle={styles.content}
        renderItem={renderItem}
        onEndReachedThreshold={2}
        onEndReached={() => {
          if (hasNextCurrencies && !isCurrenciesFetching) {
            fetchNextCurrencies();
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingTop: 16,
    paddingBottom: 16,
  },
  item: {
    marginBottom: 8,
  },
});
