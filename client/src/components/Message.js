import React from 'react';

function Message({ text, sender, timestamp }) {
  const formattedTime = new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  return (
    <div className={`message ${sender}`}>
      <p>{text}</p>
      <span className="timestamp">{formattedTime}</span>
    </div>
  );
}

export default Message;