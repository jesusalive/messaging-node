import Redis from 'ioredis'

const redis = new Redis()

redis.on('connect', () => { console.log('oi') })
redis.xadd('st-test', '*', 'opa', 'lele')