import {Currency} from 'interfaces/currency';
import type {GetCurrenciesParams} from 'queries/api';
import {API} from 'queries/api';
import {QUERY_KEYS} from 'queries/query-key';
import {QueryFunctionContext, useInfiniteQuery} from 'react-query';
import {getRequest} from 'utils/request';

const getCurrencies = async ({
  pageParam = 1,
  queryKey,
}: QueryFunctionContext<
  [QUERY_KEYS, 'price' | '-price' | 'rank' | '-rank', string | undefined]
>) => {
  const [_, sort, symbols] = queryKey;
  const {data} = await getRequest<{data: Currency[]; meta: {count: number}}>(
    API.getCurrencies({
      limit: 20,
      offset: (pageParam - 1) * 20,
      symbols: symbols || undefined,
      sort,
    }),
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
  const resolvedSort = sort || 'price';

  return useInfiniteQuery([QUERY_KEYS.CURRENCIES, resolvedSort, symbols], {
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
