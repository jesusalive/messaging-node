import amqp from 'amqplib/callback_api'

// EXAMPLE USING DEADLETTER
// -----------------------------
// IF FAILS, ONLY SEND THE MESSAGE TO WAIT QUEUE AND
// AFTER TLL EXPIRATION TIME IT WILL BE SENDS BACK TO MAIN QUEUE
export const connectToRabbitMq = async (): Promise<any> => {
    return new Promise(resolve => {
        amqp.connect('amqp://user:bitnami@localhost:5672', function(error0, connection) {
            if (error0) {
                console.log('connection error')
                throw error0;
            }

            connection.createChannel(function(error1, channel) {
                channel.assertExchange('e.main', 'topic', { durable: true })
                channel.assertExchange('e.wait', 'topic', { durable: true })
                
                channel.assertQueue('q.main', { durable: true })
                channel.assertQueue('q.wait', { durable: true, deadLetterExchange: 'e.main' })
                
                channel.bindQueue('q.main', 'e.main', 'default_route')
                channel.bindQueue('q.wait', 'e.wait', 'default_route')

                setTimeout(() => resolve(channel), 500)
            });
        })
    })
}