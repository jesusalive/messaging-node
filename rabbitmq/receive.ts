import { ConsumeMessage } from 'amqplib/properties'
import { connectToRabbitMq } from './rabbitmq-helper'

connectToRabbitMq()
  .then(channel => {
    channel.consume('q.webhook', function (msg: ConsumeMessage) {
      console.log('message processsed: ', msg.content.toString())
    }, { noAck: true })
  })