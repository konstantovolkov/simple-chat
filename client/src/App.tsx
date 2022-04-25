import React, { FormEventHandler, useEffect, useState } from 'react';

const webSocketUrl = process.env.NODE_ENV === 'production' ?
  `wss://${window.location.host}/chat` :
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
  const [isWsReady, setIsWsReady] = useState(false);
  const [chatData, setChatData] = useState<ChatData>();
  const [newMessage, setNewMessage] = useState('');

  const handleWsOpen = () => {
    setIsWsReady(true);
  };

  const handleWsMessage = ({ data }: MessageEvent) => {
    const parsedData = JSON.parse(data) as ChatData;
    setChatData(parsedData);
  };

  useEffect(() => {
    ws.addEventListener('message', handleWsMessage)

    ws.addEventListener('open', handleWsOpen)

    return () => {
      ws.removeEventListener('message', handleWsMessage);
      ws.removeEventListener('open', handleWsOpen);
    }
  }, [])

  const sendMessage: FormEventHandler = (e) => {
    e.preventDefault();

    ws.send(JSON.stringify({
      message: newMessage
    }))

    setNewMessage('')
  }

  if (!isWsReady) return null;

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
