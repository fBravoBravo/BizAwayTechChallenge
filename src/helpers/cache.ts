
/**
 * Create a cache object
 * @returns {object} cache - cache object
 */
export function createCache() {
  const cache = {
    cache: new Map<string, unknown>(),
    set(key: string, value: unknown, ttl: number) {
      if (this.cache.has(key)) {
        return this.cache.get(key);
      }

      this.cache.set(key, value);

      setTimeout(() => {
        this.cache.delete(key);
      }, ttl);
    },
  };

  return cache;
}
