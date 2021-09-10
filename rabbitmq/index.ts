import cors from 'cors'
import express, { json } from 'express'
import { connectToRabbitMq } from './rabbitmq-helper-DL'

const app = express()
app.use(cors())
app.use(json())

app.get('/send-message', async (req, res) => {
  const channel = await connectToRabbitMq()
  const jsonMessage = {
    name: 'Matheus',
    id: '123456789',
    webhook: 'Xa8iCLSNcn64dB7LCOsS_',
    collection: [
      {
        leason: '12333',
        timestamp: new Date()
      }
    ]
  }
  channel.sendToQueue('queue.hermes', Buffer.from(JSON.stringify(jsonMessage)))
  
  return res.status(204).json()
})

app.listen(3001, () => console.log('ready for send messages'))
