import { useState, useEffect } from 'react'
import socket from './socket'
import './App.css'

function App() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.on("chat message", receiveMessage)

    return () => {
      socket.off("chat message", receiveMessage);
    };
  }, []);

  const receiveMessage = (message) =>
    setMessages(state => [message, ...state]);


  const handleSubmit = (event) => {
    event.preventDefault();
    const newMessage = {
      msg: message,
      from: "Me",
    };
    setMessages(state => [newMessage, ...state]);
    setMessage("");
    socket.emit("chat message", newMessage.msg);
  };

  const handleOnChangeMessage = (e) => {
    setMessage(e.target.value)

  }
  return (
      <>
        <div className='container'>
          <div className='front-camera-wrapper'>
            <div className='front-camera'></div>
            </div>

          <div className='screen-wrapper'>
            <div className='messages-wrapper'>
              <ul className='messages-list'>
                  {messages.map((msg, index) => (
                    <div className='message-wrapper' key={index}>
                      <li key={index} className={msg.from == 'Me' ? 'my-message': 'guest-message'}>{msg.from == 'Me' ? 'Me': 'Guest'}: {msg.msg}</li>
                    </div>
                  ))}
              </ul>
          </div>
          <div className='form-wrapper'>
            <form onSubmit={handleSubmit} className='form'>
            <input type="text" value={message} onChange={(e) => handleOnChangeMessage(e)} placeholder='Type a message' />
            <button type='submit' className='btn-send'>Send</button>
            </form>
          </div>
          </div>
        </div>
      </>
  )
}

export default App
