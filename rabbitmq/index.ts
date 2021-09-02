import cors from 'cors'
import express, { json } from 'express'
import { connectToRabbitMq } from './rabbitmq-helper'

const app = express()
app.use(cors())
app.use(json())

app.get('/send-message', (req, res) => {
  connectToRabbitMq()
    .then(channel => {
      channel.publish('e.agreement.created', '', Buffer.from('dsa'), { persistent: true })
      console.log(`[x] Sent - ${new Date().toString()}`)

      return res.status(204).json()
    })
})

app.listen(3000, () => console.log('ready for send messages'))