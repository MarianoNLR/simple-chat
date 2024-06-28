import { useState, useEffect } from 'react'
import socket from './socket'
import './App.css'

function App() {
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')

  const handleOnChangeMessage = (e) => {
    e.preventDefault()
    setMessage(e.target.value)
  }

  useEffect(() => {
    socket.on('chat message', (msg) => {
      setMessages([...messages, msg])
    })
  })

  const sendMessage = () => {
    socket.emit('chat message', message)
    setMessage('')
  }

  return (
      <>
        <h1>Home Page</h1>
        <ul>
            {messages.map((msg, index) => (
                <li key={index}>{msg}</li>
            ))}
        </ul>
        <input type="text" value={message} onChange={(e) => handleOnChangeMessage(e)}/>
        <button onClick={sendMessage}>Send</button>
      </>
  )
}

export default App
