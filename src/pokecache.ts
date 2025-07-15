export class Cache {
  #cache = new Map<string, CacheEntry<any>>();
  #reapIntervalId: NodeJS.Timeout | undefined = undefined;
  #interval: number;

  constructor(interval: number) {
    this.#interval = interval; // ms
    this.#startReapLoop();
  }

  add<T>(key: string, val: T) {
    const cacheEntry: CacheEntry<T> = {
      createdAt: Date.now(),
      val: val,
    };
    this.#cache.set(key, cacheEntry);
  }
  get<T>(key: string) {
    const entry = this.#cache.get(key);
    if (entry !== undefined) {
      return entry.val as T;
    }
    return undefined;
  }
  #startReapLoop() {
    this.#reapIntervalId = setInterval(() => {
      this.#reap();
    }, this.#interval);
  }
  #reap() {
    const now = Date.now();
    for (const [key, entry] of this.#cache) {
      if (now - entry.createdAt > this.#interval) {
        this.#cache.delete(key);
      }
    }
  }
  stopReapLoop() {
    if (this.#reapIntervalId) {
      clearInterval(this.#reapIntervalId);
      this.#reapIntervalId = undefined;
    }
  }
}
export type CacheEntry<T> = {
  createdAt: number;
  val: T;
};
