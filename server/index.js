import express from 'express'
import { Server } from 'socket.io'
import { createServer } from 'http'

const app = express()
const server = createServer(app)
const io = new Server(server)

const PORT = process.env.PORT ?? 3000

io.on('connection', (socket) => {
  console.log('An user has connected.')

  socket.on('chat message', async (msg) => {
    try {
        io.emit('chat message', msg)
    } catch (error) {
        console.error('Error al guardar el mensaje:', error)
    }
    })
})

server.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
})