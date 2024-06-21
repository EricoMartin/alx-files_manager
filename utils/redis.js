import { createClient } from 'redis';

class RedisClient {
  constructor() {
    this.client = createClient();
    this.client.on('error', (err) => {
      console.log(`Error in Connection: ${err}`);
    });
  }

  isAlive() {
    return this.client.connected;
  }

  async get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, val) => {
        if (err) {
          console.log('Error getting Key: $error');
          return reject(err);
        }
        return resolve(val);
      });
    });
  }

  async set(key, val, dur) {
    return new Promise((resolve, reject) => {
      this.client.set(key, val, 'EX', dur, (err, val) => {
        if (err) {
          console.log(`Error setting key ${key}: ${err.message}`);
          return reject(err);
        }
        return resolve(val);
      });
    });
  }

  async del(key) {
    return new Promise((resolve, reject) => {
      this.client.del(key, (err, val) => {
        if (err) {
          console.log(`Error deleting key ${key} from Redis: ${err.message}`);
          return reject(err);
        }
        return resolve(val);
      });
    });
  }
}

const redisClient = new RedisClient();
module.exports = redisClient;
