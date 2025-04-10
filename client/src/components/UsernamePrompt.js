import React, { useState } from 'react';

function UsernamePrompt({ setUsername }) {
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    if (input.trim()) {
      setUsername(input.trim());
    }
  };

  return (
    <div className="username-prompt">
      <h2>Welcome!</h2>
      <p>Please enter your username to start chatting:</p>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
        placeholder="Your username"
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default UsernamePrompt;