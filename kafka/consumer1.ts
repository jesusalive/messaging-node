import { Kafka } from 'kafkajs'

const kafka = new Kafka({
    clientId: 'consumer1',
    brokers: ['localhost:9092']
})

const consumer = kafka.consumer({
    groupId: 'consumer1'
})

const main = async () => {
    await consumer.connect()
    await consumer.subscribe({
        topic: 'test2'
    })
    console.log('consumer 1 connected')

    consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log({
                key: message.key,
                value: message.value.toString('utf8'),
                headers: message.headers,
            })
        }
    })
}

main()