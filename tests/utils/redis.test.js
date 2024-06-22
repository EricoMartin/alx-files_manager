/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-named-as-default */
/* eslint-disable jest/prefer-expect-assertions */
/* eslint-disable import/no-named-as-default */
/* eslint-disable jest/no-test-return-statement */
/* eslint-disable consistent-return */
/* eslint-disable jest/valid-expect */
/* eslint-disable no-undef */
import { expect } from 'chai';
import redisClient from '../../utils/redis';

describe('+ RedisClient utility', () => {
  before(function (done) {
    this.timeout(10000);
    setTimeout(done, 4000);
  });

  it('+ Client is alive', () => {
    expect(redisClient.isAlive()).to.equal(true);
  });

  it('+ Setting and getting a value', async () => {
    await redisClient.set('test_key', 345, 10);
    expect(await redisClient.get('test_key')).to.equal('345');
  });

  it('+ Setting and getting an expired value', async () => {
    await redisClient.set('test_key', 356, 1);
    setTimeout(async () => {
      expect(await redisClient.get('test_key')).to.not.equal('356');
    }, 2000);
  });

  it('+ Setting and getting a deleted value', async () => {
    await redisClient.set('test_key', 345, 10);
    await redisClient.del('test_key');
    setTimeout(async () => {
      console.log('del: test_key ->', await redisClient.get('test_key'));
      expect(await redisClient.get('test_key')).to.be.null;
    }, 2000);
  });
});
