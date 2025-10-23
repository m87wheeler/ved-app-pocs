import { createClient, type RedisClientType } from "redis";

interface IRedisClient<T> {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  get(item: string): Promise<T | null>;
  set(item: string, value: T): Promise<boolean>;
}

export class RedisClient<T> implements IRedisClient<T> {
  private instance: RedisClientType | null = null;
  private url: string;

  constructor(url: string) {
    this.url = url;
  }

  public async connect() {
    if (!this.url) {
      throw new Error("Redis URL is not provided");
    }

    if (!this.instance) {
      this.instance = createClient({ url: this.url });
      await this.instance.connect();
    }
  }

  public async disconnect() {
    if (this.instance) {
      this.instance.destroy();
      this.instance = null;
    }
  }

  public async get(item: string): Promise<T | null> {
    if (!this.instance) {
      throw new Error("Redis client not initialized");
    }

    try {
      const data = await this.instance.get(item);
      if (!data) {
        return null;
      }

      return JSON.parse(data) as T;
    } catch (error) {
      console.error("Error retrieving item from Redis:", error);
      return null;
    }
  }

  public async set(item: string, value: T): Promise<boolean> {
    if (!this.instance) {
      throw new Error("Redis client not initialized");
    }

    try {
      await this.instance.set(item, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error("Error setting item in Redis:", error);
      return false;
    }
  }
}
