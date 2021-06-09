import React, { useState } from 'react';
import { useWebSocket } from '../hooks/useWebSocket';
import { useSelector } from '../hooks/useSelector';

const App: React.FC = () => {
  const comment = useSelector(({ comment }) => comment);
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
      <div>{comment}</div>
    </>
  );
};

export { App };
