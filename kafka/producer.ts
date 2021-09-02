import { Kafka } from 'kafkajs'

const kafka = new Kafka({
    clientId: 'producer',
    brokers: ['localhost:9092']
})
const producer = kafka.producer()

const main = async () => {
    await producer.connect()
    console.log('producer connected')
    
    await producer.send({
        topic: 'test2',
        messages: [
          { value: 'Mensagem 1!' },
        ],
      })

      await producer.send({
        topic: 'test2',
        messages: [
          { value: 'Mensagem 2!' },
        ],
      })
    console.log('messages sent')
}

main()