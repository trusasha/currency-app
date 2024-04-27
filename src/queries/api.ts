import {API_KEY} from 'common/constants';

const baseUrl = 'https://api.cryptorank.io/';

const createQueryParams = (params: {[key: string]: any}): string => {
  const query = Object.entries(params)
    .filter(([_, value]) => value !== undefined)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
    )
    .join('&');
  return query ? `?${query}` : '';
};

export interface GetCurrenciesParams {
  limit?: number;
  offset?: number;
  sort?: 'price' | '-price' | 'rank' | '-rank';
  symbols?: string;
}

export const API = {
  getCurrencies: ({limit, offset, sort, symbols}: GetCurrenciesParams) => {
    const queryParams = createQueryParams({
      api_key: API_KEY,
      limit,
      offset,
      sort,
      symbols,
    });

    return `${baseUrl}v1/currencies${queryParams}`;
  },
};
