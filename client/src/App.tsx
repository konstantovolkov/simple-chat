import React, { FormEventHandler, useEffect, useState } from 'react';

const webSocketUrl = process.env.NODE_ENV === 'production' ?
  `ws://${window.location.host}/chat`:
  'ws://localhost:8080/chat'

const ws = new WebSocket(webSocketUrl);

interface Message {
  text: string;
  id: string;
}

interface ChatData {
  data: {
    message: Message;
    history: Message[];
  }
}

function App() {
  const [chatData, setChatData] = useState<ChatData>();
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    ws.addEventListener('message', ({ data }) => {
      const parsedData = JSON.parse(data) as ChatData;
      setChatData(parsedData);
    })
  }, [])

  const sendMessage: FormEventHandler = (e) => {
    e.preventDefault();

    ws.send(JSON.stringify({
      message: newMessage
    }))

    setNewMessage('')
  }

  return (
    <div>
      {chatData?.data.history.map(({ text, id }) => <div key={id} >{text}</div>)}
      <form onSubmit={sendMessage}>
        <input value={newMessage} onChange={({ target: { value } }) => { setNewMessage(value) }} />
        <button type="submit">Send!</button>
      </form>
    </div>
  );
}

export default App;
