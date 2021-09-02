import { Kafka } from 'kafkajs'

const kafka = new Kafka({
    clientId: 'other',
    brokers: ['localhost:9092']
})

const kafkaAdmin = kafka.admin()

const main = async () => {
    await kafkaAdmin.connect()
    console.log('connected')
    
    await kafkaAdmin.createTopics({
      topics: [
        {
          topic: 'test2',
          numPartitions: 2
        }
      ]
  })
  console.log('topics created')
}

main()
  .catch(err => console.log(err))