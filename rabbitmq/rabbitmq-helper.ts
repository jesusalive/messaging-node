import amqp from 'amqplib/callback_api'

export const connectToRabbitMq = async (): Promise<any> => {
    return new Promise(resolve => {
        amqp.connect('amqp://user:bitnami@localhost:5672', function(error0, connection) {
            if (error0) {
                console.log('connection error')
                throw error0;
            }

            connection.createChannel(function(error1, channel) {
                channel.assertExchange('e.agreement.created', 'fanout', { durable: true })
                
                //serviço webhook
                channel.assertQueue('q.webhook', { durable: true })
                channel.bindQueue('q.webhook', 'e.agreement.created', '')

                //qualquer serviço
                channel.assertQueue('q.other-service', { durable: true })
                channel.bindQueue('q.other-service', 'e.agreement.created', '')

                setTimeout(() => resolve(channel), 500)
            })
        })
    })
}