import { ConsumeMessage } from 'amqplib/properties'
import { connectToRabbitMq } from './rabbitmq-helper'

connectToRabbitMq()
  .then(channel => {
    channel.consume('q.terciary', function (msg: ConsumeMessage) {
      const parsedMessage = JSON.parse(msg.content.toString('utf8'))
      console.log('message processsed: ', parsedMessage.collection[0])
      channel.reject(msg, true)
    }, {})
  })