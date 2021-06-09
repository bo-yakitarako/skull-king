import React, { useState } from 'react';
import { useWebSocket } from '../hooks/useWebSocket';

const App: React.FC = () => {
  const [message, setMessage] = useState('');
  const { sendMessage } = useWebSocket();
  return (
    <>
      <textarea
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      />
      <br />
      <button onClick={() => sendMessage(message)}>送信</button>
    </>
  );
};

export { App };
