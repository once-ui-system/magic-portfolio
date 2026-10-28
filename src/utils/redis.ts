// Server-only store for read counts and likes. Upstash Redis in production; in `next dev` without
// Redis env, an in-memory copy with the same rules so the features can be tried locally.
import { Redis } from "@upstash/redis";

// Vercel's Upstash integration sets either pair of names
const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
const redis = url && token ? new Redis({ url, token }) : null;

/**
 * Only the production deployment writes. Vercel previews run with NODE_ENV=production and may
 * share the production Redis env, so on Vercel the deciding value is VERCEL_ENV.
 */
const isProduction = process.env.VERCEL_ENV
  ? process.env.VERCEL_ENV === "production"
  : process.env.NODE_ENV === "production";

export interface Store {
  /** False when this deployment may only read (dev or a preview against real Redis). */
  writable: boolean;
  /** Number stored at `key`, 0 when missing. */
  count(key: string): Promise<number>;
  /** Adds one to `key` and returns the new value. */
  increment(key: string): Promise<number>;
  /** Sets `key` for `seconds` unless it exists. True the first time (SET NX EX). */
  claim(key: string, seconds: number): Promise<boolean>;
  /** Counts a hit in a window of `seconds` and returns the hits so far (atomic INCR + EXPIRE). */
  hit(key: string, seconds: number): Promise<number>;
  /** Size of the set at `key`. */
  size(key: string): Promise<number>;
  /** Whether `member` is in the set at `key`. */
  has(key: string, member: string): Promise<boolean>;
  /** Adds `member` to the set at `key`, or removes it if present. True when it ends up added. */
  toggle(key: string, member: string): Promise<boolean>;
}

function redisStore(client: Redis): Store {
  return {
    writable: isProduction,
    count: async (key) => Number(await client.get(key)) || 0,
    increment: (key) => client.incr(key),
    claim: async (key, seconds) => (await client.set(key, 1, { nx: true, ex: seconds })) === "OK",
    hit: async (key, seconds) => {
      // One round trip, so the key can never be left without an expiry
      const [hits] = await client.multi().incr(key).expire(key, seconds).exec<[number, number]>();
      return hits;
    },
    size: (key) => client.scard(key),
    has: async (key, member) => (await client.sismember(key, member)) === 1,
    toggle: async (key, member) => {
      if ((await client.sadd(key, member)) === 1) return true;
      await client.srem(key, member);
      return false;
    },
  };
}

type Memory = {
  numbers: Map<string, number>;
  sets: Map<string, Set<string>>;
  expiries: Map<string, number>;
};

function memoryStore(): Store {
  // Kept on globalThis so hot reloads don't reset it
  const scope = globalThis as typeof globalThis & { __memoryStore?: Memory };
  scope.__memoryStore ??= { numbers: new Map(), sets: new Map(), expiries: new Map() };
  const { numbers, sets, expiries } = scope.__memoryStore;

  const read = (key: string) => {
    const expires = expiries.get(key);
    if (expires !== undefined && expires <= Date.now()) {
      numbers.delete(key);
      expiries.delete(key);
    }
    return numbers.get(key);
  };
  const add = (key: string) => {
    const value = (read(key) ?? 0) + 1;
    numbers.set(key, value);
    return value;
  };
  const members = (key: string) => {
    if (!sets.has(key)) sets.set(key, new Set());
    return sets.get(key) as Set<string>;
  };

  return {
    writable: true,
    count: async (key) => read(key) ?? 0,
    increment: async (key) => add(key),
    claim: async (key, seconds) => {
      if (read(key) !== undefined) return false;
      numbers.set(key, 1);
      expiries.set(key, Date.now() + seconds * 1000);
      return true;
    },
    hit: async (key, seconds) => {
      const hits = add(key);
      expiries.set(key, Date.now() + seconds * 1000);
      return hits;
    },
    size: async (key) => members(key).size,
    has: async (key, member) => members(key).has(member),
    toggle: async (key, member) => {
      const set = members(key);
      if (set.has(member)) {
        set.delete(member);
        return false;
      }
      set.add(member);
      return true;
    },
  };
}

/** The store, or null when there is none: production without Redis env renders nothing. */
export const store: Store | null = redis
  ? redisStore(redis)
  : process.env.NODE_ENV === "development"
    ? memoryStore()
    : null;
