import { Kafka } from 'kafkajs'

const kafka = new Kafka({
    clientId: 'consumer2',
    brokers: ['localhost:9092']
})

const consumer = kafka.consumer({
    groupId: 'consumer2'
})

const main = async () => {
    await consumer.connect()
    await consumer.subscribe({
        topic: 'test2'
    })
    console.log('consumer 2 connected')

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