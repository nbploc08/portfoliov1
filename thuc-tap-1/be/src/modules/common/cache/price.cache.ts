export interface CachedTokenPrice {
    tokenId: string;
    symbol: string;
    name: string;
    price: number;
    updatedAt: Date;
  }
  

export class PriceCache {
  private static prices = new Map<string, CachedTokenPrice>();

  static set(data: CachedTokenPrice) {
    this.prices.set(data.tokenId, data);
  }

  static get(tokenId: string): CachedTokenPrice | undefined {
    return this.prices.get(tokenId);
  }

  static getAll(): CachedTokenPrice[] {
    return Array.from(this.prices.values());
  }
}
