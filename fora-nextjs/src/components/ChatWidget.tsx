'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPaperPlane, faSpinner, faComments, faUser } from '@fortawesome/free-solid-svg-icons';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

const defaultResponses: Record<string, string> = {
  'привет': 'Здравствуйте! Чем могу помочь?',
  'цена': 'Для получения актуальных цен заполните форму запроса КП или позвоните нам: +7 (909) 297-41-44',
  'доставка': 'Мы осуществляем доставку по всей России транспортными компаниями. Отгрузка со склада в течение 24 часов.',
  'срок': 'Типовой срок изготовления - 1 неделя. Для срочных заказов свяжитесь с нами.',
  'каталог': 'Вы можете скачать каталог продукции в формате PDF на главной странице или в разделе Документация.',
  'заказ': 'Для оформления заказа добавьте товары в корзину и заполните форму запроса КП.',
  'default': 'Спасибо за ваше сообщение! Наш менеджер свяжется с вами в ближайшее время. Для срочных вопросов звоните: +7 (909) 297-41-44',
};

export default function ChatWidget({ isOpen, onClose }: ChatWidgetProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Здравствуйте! Я виртуальный помощник ООО "Фора". Чем могу помочь?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isSending, setIsSending] = useState(false);

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    for (const [keyword, response] of Object.entries(defaultResponses)) {
      if (keyword !== 'default' && lowerMessage.includes(keyword)) {
        return response;
      }
    }
    
    return defaultResponses.default;
  };

  const handleSend = async () => {
    if (!inputText.trim() || isSending) return;
    
    const userMessage: Message = {
      id: Date.now(),
      text: inputText.trim(),
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsSending(true);
    
    // Simulate response delay
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        text: getBotResponse(userMessage.text),
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botResponse]);
      setIsSending(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="chat-widget">
      <div className="chat-header">
        <div className="chat-header-info">
          <FontAwesomeIcon icon={faComments} />
          <span>Онлайн-чат</span>
        </div>
        <button className="chat-close" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      
      <div className="chat-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`chat-message ${msg.sender}`}>
            <div className="message-avatar">
              {msg.sender === 'bot' ? (
                <span className="avatar-bot">F</span>
              ) : (
                <FontAwesomeIcon icon={faUser} />
              )}
            </div>
            <div className="message-content">
              <div className="message-text">{msg.text}</div>
              <div className="message-time">
                {msg.timestamp.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        {isSending && (
          <div className="chat-message bot">
            <div className="message-avatar">
              <span className="avatar-bot">F</span>
            </div>
            <div className="message-content">
              <div className="message-text typing">
                <span></span><span></span><span></span>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="chat-input-area">
        <input
          type="text"
          placeholder="Введите сообщение..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button 
          className="chat-send-btn" 
          onClick={handleSend}
          disabled={!inputText.trim() || isSending}
        >
          {isSending ? (
            <FontAwesomeIcon icon={faSpinner} spin />
          ) : (
            <FontAwesomeIcon icon={faPaperPlane} />
          )}
        </button>
      </div>
    </div>
  );
}
