export interface Currency {
  id: number;
  rank: number;
  slug: string;
  name: string;
  symbol: string;
  category: string;
  type: string;
  volume24hBase: number;
  circulatingSupply: number;
  totalSupply: number;
  maxSupply: number;
  values: Record<
    string,
    {
      price: number;
      volume24h: number;
      high24h: number;
      low24h: number;
      marketCap: number;
      percentChange24h: number;
      percentChange7d: number;
      percentChange30d: number;
      percentChange3m: number;
      percentChange6m: number;
    }
  >;
  lastUpdated: string;
  tokens: {
    tokenAddress: string;
    platform: {id: number; name: string; slug: string};
  }[];
}
