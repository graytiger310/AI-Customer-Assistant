import React, { useState, useEffect, useRef } from 'react';
import { sendMessage } from '../api';

const ChatWindow = ({ username }) => {
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentMenu, setCurrentMenu] = useState('main');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) scrollToBottom();
    if (isOpen && messages.length === 0) showMainOptions();
  }, [isOpen]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const showMainOptions = () => {
    setMessages((prev) => [
      ...prev,
      {
        text: 'Hi! How can I assist you today? Pick an option:\n1. About Products\n2. Order Statuses\n3. Refunds\n4. Store Policies',
        sender: 'bot',
        timestamp: new Date(),
        clickableOptions: [
          { text: '1. About Products', action: () => setCurrentMenu('products') },
          { text: '2. Order Statuses', action: () => setCurrentMenu('orders') },
          { text: '3. Refunds', action: () => setCurrentMenu('refunds') },
          { text: '4. Store Policies', action: () => setCurrentMenu('policies') },
        ],
      },
    ]);
    setCurrentMenu('main');
  };

  const handleOptionClick = (option) => {
    setMessages((prev) => [...prev, { text: option.text, sender: 'user', timestamp: new Date() }]);
    option.action();

    if (currentMenu === 'main') {
      if (option.text === '1. About Products') {
        setMessages((prev) => [
          ...prev,
          {
            text: 'Choose an option:\n1. Past Ordered Products\n2. Cancelled Products\nBack to Main Options',
            sender: 'bot',
            timestamp: new Date(),
            clickableOptions: [
              { text: '1. Past Ordered Products', action: fetchPastOrders },
              { text: '2. Cancelled Products', action: fetchCancelledOrders },
              { text: 'Back to Main Options', action: showMainOptions },
            ],
          },
        ]);
      } else if (option.text === '2. Order Statuses') {
        setMessages((prev) => [
          ...prev,
          { text: 'Fetching your past orders...', sender: 'bot', timestamp: new Date() },
        ]);
        fetchOrderStatuses();
      } else if (option.text === '3. Refunds') {
        setMessages((prev) => [
          ...prev,
          {
            text: 'Refund Policy: Refunds within 30 days with receipt. Pick an order:\n1. Order #ORD001\n2. Order #ORD002\nBack to Main Options',
            sender: 'bot',
            timestamp: new Date(),
            clickableOptions: [
              { text: '1. Order #ORD001', action: () => handleRefund('ORD001') },
              { text: '2. Order #ORD002', action: () => handleRefund('ORD002') },
              { text: 'Back to Main Options', action: showMainOptions },
            ],
          },
        ]);
      } else if (option.text === '4. Store Policies') {
        setMessages((prev) => [
          ...prev,
          {
            text: 'Choose a policy:\n1. Shipping\n2. Returns\nBack to Main Options',
            sender: 'bot',
            timestamp: new Date(),
            clickableOptions: [
              { text: '1. Shipping', action: () => setMessages((prev) => [...prev, { text: 'Shipping: Free over ₹500, 3-5 days delivery.\nBack to Main Options', sender: 'bot', timestamp: new Date(), clickableOptions: [{ text: 'Back to Main Options', action: showMainOptions }] }]) },
              { text: '2. Returns', action: () => setMessages((prev) => [...prev, { text: 'Returns: 30 days with receipt, contact support.\nBack to Main Options', sender: 'bot', timestamp: new Date(), clickableOptions: [{ text: 'Back to Main Options', action: showMainOptions }] }]) },
              { text: 'Back to Main Options', action: showMainOptions },
            ],
          },
        ]);
      }
    }
  };

  const fetchPastOrders = async () => {
    try {
      const response = await sendMessage({ message: 'past_orders', username });
      setMessages((prev) => [
        ...prev,
        {
          text: `${response.reply}\nBack to Main Options`,
          sender: 'bot',
          timestamp: new Date(),
          clickableOptions: [{ text: 'Back to Main Options', action: showMainOptions }],
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          text: 'Error fetching past orders.\nBack to Main Options',
          sender: 'bot',
          timestamp: new Date(),
          clickableOptions: [{ text: 'Back to Main Options', action: showMainOptions }],
        },
      ]);
    }
  };

  const fetchCancelledOrders = async () => {
    try {
      const response = await sendMessage({ message: 'cancelled_orders', username });
      setMessages((prev) => [
        ...prev,
        {
          text: `${response.reply}\nBack to Main Options`,
          sender: 'bot',
          timestamp: new Date(),
          clickableOptions: [{ text: 'Back to Main Options', action: showMainOptions }],
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          text: 'Error fetching cancelled orders.\nBack to Main Options',
          sender: 'bot',
          timestamp: new Date(),
          clickableOptions: [{ text: 'Back to Main Options', action: showMainOptions }],
        },
      ]);
    }
  };

  const fetchOrderStatuses = async () => {
    try {
      const response = await sendMessage({ message: 'order_statuses', username });
      setMessages((prev) => [
        ...prev,
        {
          text: `${response.reply}\nPick an order:\n1. Order #ORD001\n2. Order #ORD002\nBack to Main Options`,
          sender: 'bot',
          timestamp: new Date(),
          clickableOptions: [
            { text: '1. Order #ORD001', action: () => fetchOrderStatus('ORD001') },
            { text: '2. Order #ORD002', action: () => fetchOrderStatus('ORD002') },
            { text: 'Back to Main Options', action: showMainOptions },
          ],
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          text: 'Error fetching order statuses.\nBack to Main Options',
          sender: 'bot',
          timestamp: new Date(),
          clickableOptions: [{ text: 'Back to Main Options', action: showMainOptions }],
        },
      ]);
    }
  };

  const fetchOrderStatus = async (orderId) => {
    try {
      const response = await sendMessage({ message: `status_${orderId}`, username });
      setMessages((prev) => [
        ...prev,
        {
          text: `${response.reply}\nBack to Main Options`,
          sender: 'bot',
          timestamp: new Date(),
          clickableOptions: [{ text: 'Back to Main Options', action: showMainOptions }],
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          text: 'Error fetching order status.\nBack to Main Options',
          sender: 'bot',
          timestamp: new Date(),
          clickableOptions: [{ text: 'Back to Main Options', action: showMainOptions }],
        },
      ]);
    }
  };

  const handleRefund = (orderId) => {
    setMessages((prev) => [
      ...prev,
      {
        text: `Refund for Order #${orderId}: Contact support with receipt within 30 days.\nBack to Main Options`,
        sender: 'bot',
        timestamp: new Date(),
        clickableOptions: [{ text: 'Back to Main Options', action: showMainOptions }],
      },
    ]);
  };

  const toggleChat = () => setIsOpen(!isOpen);

  const renderMessageText = (msg) => {
    if (!msg.clickableOptions) {
      return <p style={styles.messageText}>{msg.text}</p>;
    }
    const lines = msg.text.split('\n');
    return lines.map((line, index) => {
      const option = msg.clickableOptions.find((opt) => opt.text === line);
      return (
        <p
          key={index}
          style={option ? { ...styles.messageText, ...styles.clickableText } : styles.messageText}
          onClick={option ? () => handleOptionClick(option) : null}
        >
          {line}
        </p>
      );
    });
  };

  return (
    <>
      {!isOpen ? (
        <div style={styles.minimized} onClick={toggleChat} className="chat-minimized">
          <span style={styles.logo}>💬</span>
        </div>
      ) : (
        <div style={styles.chatContainer} className="chat-container">
          <div style={styles.header}>
            <span>Chat with Vinay Store</span>
            <button onClick={toggleChat} style={styles.closeButton}>×</button>
          </div>
          <div style={styles.messages}>
            {messages.map((msg, index) => (
              <div
                key={index}
                style={msg.sender === 'user' ? styles.userMessage : styles.botMessage}
              >
                {renderMessageText(msg)}
                <span style={styles.timestamp}>{new Date(msg.timestamp).toLocaleTimeString()}</span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
      )}
    </>
  );
};

const styles = {
  minimized: { position: 'fixed', bottom: '20px', right: '20px', width: '50px', height: '50px', background: '#00c4cc', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 1000, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' },
  logo: { fontSize: '24px', color: '#fff' },
  chatContainer: { position: 'fixed', bottom: '80px', right: '20px', width: '320px', height: '450px', background: '#fff', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', zIndex: 1000 },
  header: { padding: '12px', background: '#2c3e50', color: '#fff', borderRadius: '10px 10px 0 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '16px', fontWeight: 'bold' },
  closeButton: { background: 'none', border: 'none', color: '#fff', fontSize: '20px', cursor: 'pointer' },
  messages: { flex: 1, overflowY: 'auto', padding: '10px', background: '#fff' },
  botMessage: { textAlign: 'left', margin: '8px 0', maxWidth: '75%', background: '#e0f7fa', borderRadius: '8px', padding: '8px', color: '#333' },
  userMessage: { textAlign: 'right', margin: '8px 0', maxWidth: '75%', background: '#00c4cc', borderRadius: '8px', padding: '8px', color: '#fff', marginLeft: 'auto' },
  messageText: { margin: '0', padding: '0', lineHeight: '1.3', fontSize: '14px' },
  clickableText: { cursor: 'pointer', textDecoration: 'underline', color: '#007bff' },
  timestamp: { fontSize: '10px', color: '#777', display: 'block', marginTop: '2px' },
};

export default ChatWindow;