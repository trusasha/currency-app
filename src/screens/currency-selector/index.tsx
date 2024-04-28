import {SCREENS, type RouteParams} from 'navigation';
import {useRoute} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigate} from 'hooks/use-navigate';
import {useGetCurrencies} from 'queries/get/getCurrencies';
import {FlashList, ListRenderItem} from '@shopify/flash-list';
import {Currency} from 'interfaces/currency';
import {CurrencyItem} from './components/currency-item';
import {TextInput} from 'components/input';
import {useDebounce} from 'use-debounce';
import {SortPicker} from './components/sort-picker';

export const CurrencySelectorScreen = () => {
  const navigate = useNavigate();
  const {params} = useRoute<RouteParams<'app/currencySelector'>>();

  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<
    'price' | '-price' | 'rank' | '-rank' | undefined
  >();

  const [debouncedSearch] = useDebounce(search, 800);

  const inputId = params?.inputId;

  const {
    data: currencyData,
    hasNextPage: hasNextCurrencies,
    isFetching: isCurrenciesFetching,
    fetchNextPage: fetchNextCurrencies,
  } = useGetCurrencies({symbols: debouncedSearch, sort});

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
        keyExtractor={({id}) => String(id)}
        onEndReached={() => {
          if (hasNextCurrencies && !isCurrenciesFetching) {
            fetchNextCurrencies();
          }
        }}
        ListHeaderComponent={
          <View style={styles.header}>
            <TextInput
              value={search}
              onChangeText={setSearch}
              style={styles.searchInput}
              placeholder="Search"
            />
            <SortPicker value={sort || 'Sort by'} setSort={setSort} />
          </View>
        }
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
  searchInput: {
    marginBottom: 12,
  },
  header: {
    marginHorizontal: 16,
    marginBottom: 12,
  },
  button: {
    flex: 1,
  },
  headerButtonContainer: {
    flexDirection: 'row',
  },
});
