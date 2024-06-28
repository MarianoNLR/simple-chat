import express from 'express'
import { Server } from 'socket.io'
import { createServer } from 'http'
import cors from 'cors'

const app = express()
const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
        credentials: true
    }
})

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    optionsSuccessStatus: 200
}))

const PORT = process.env.PORT ?? 3000

io.on('connection', (socket) => {
  console.log('An user has connected.')

  socket.on('chat message', (msg) => {
    try {
        console.log(msg)
        io.emit('chat message', msg)
    } catch (error) {
        console.error('Error al guardar el mensaje:', error)
    }
    })
})

server.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
})