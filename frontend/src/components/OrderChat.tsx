import React, { useState } from 'react';

const OrderChatBox = () => {
  const [messages, setMessages] = useState([
    { from: 'editor', text: 'Order Placed', time: '2:51 PM' },
    { from: 'client', text: 'Thanks for your Order', time: '2:51 PM' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() === '') return;
    setMessages([...messages, { from: 'client', text: input, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    setInput('');
  };

  return (
    <div className="bg-black rounded-2xl text-white p-3 space-y-2 min-h-[200px]">
      <div className="space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.from === 'client' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] text-sm px-3 py-2 rounded-xl ${
                msg.from === 'client' ? 'bg-blue-500 text-white' : 'bg-gray-700'
              }`}
            >
              {msg.text}
              <div className="text-[10px] text-gray-300 mt-1 text-right">{msg.time}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-2">
        <input
          type="text"
          placeholder="Type a message"
          className="flex-1 px-4 py-2 rounded-full text-black text-sm outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button
          onClick={handleSend}
          className="text-sm font-semibold bg-white text-black px-4 py-1 rounded-full"
        >
          ➤
        </button>
      </div>
    </div>
  );
};

export default OrderChatBox;
