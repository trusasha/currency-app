import {Currency} from 'interfaces/currency';
import type {GetCurrenciesParams} from 'queries/api';
import {API} from 'queries/api';
import {QUERY_KEYS} from 'queries/query-key';
import {useInfiniteQuery} from 'react-query';
import {getRequest} from 'utils/request';

const getCurrencies = async ({pageParam = 1}) => {
  const {data} = await getRequest<{data: Currency[]; meta: {count: number}}>(
    API.getCurrencies({limit: 20, offset: (pageParam - 1) * 20}),
  );

  return {
    data: data.data,
    meta: data.meta,
    nextCursor: pageParam + 1,
    hasMore: true,
  };
};

export const useGetCurrencies = (
  {sort, symbols}: GetCurrenciesParams,
  config: {enabled?: boolean} = {enabled: true},
) => {
  return useInfiniteQuery([QUERY_KEYS.CURRENCIES, sort, symbols], {
    queryFn: getCurrencies,
    staleTime: 1000 * 60,
    getNextPageParam: lastPage => {
      if (lastPage?.hasMore) {
        return lastPage?.nextCursor;
      }
    },
    ...config,
  });
};
