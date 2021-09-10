import amqp from 'amqplib'

// EXAMPLE USING DEADLETTER
// -----------------------------
// IF FAILS, ONLY SEND THE MESSAGE TO WAIT QUEUE AND
// AFTER TLL EXPIRATION TIME IT WILL BE SENDS BACK TO MAIN QUEUE
export const connectToRabbitMq = async (): Promise<any> => {
    const connection = await amqp.connect('amqp://user:bitnami@localhost:5672')
    const channel = await connection.createChannel()
    channel.assertExchange('e.main', 'topic', { durable: true })
        
    channel.assertQueue('q.main', { durable: true })
    channel.assertQueue('q.secondary', { durable: true, deadLetterExchange: 'e.main' })
    
    channel.bindQueue('q.main', 'e.main', 'route1')
    channel.bindQueue('q.secondary', 'e.main', 'route2')
    
    return channel
}