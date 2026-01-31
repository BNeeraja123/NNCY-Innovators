import React, { useState, useEffect, useRef } from 'react';
import {
  findAnswer,
  getGreeting,
  getFallbackMessage,
  getCategories,
  getFAQsByCategory
} from '../utils/chatbotLogic';

export default function FAQChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState('chat'); // 'chat' or 'browse'
  const [selectedCategory, setSelectedCategory] = useState(null);
  const messagesEndRef = useRef(null);

  // Initialize with greeting
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greeting = getGreeting();
      setMessages([{
        id: Date.now(),
        type: 'bot',
        text: greeting,
        timestamp: new Date()
      }]);
    }
  }, [isOpen]);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setLoading(true);

    // Simulate bot thinking time
    setTimeout(() => {
      const answer = findAnswer(inputValue);
      
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        text: answer ? answer.answer : getFallbackMessage(),
        question: answer?.question,
        category: answer?.category,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setLoading(false);
    }, 500);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setViewMode('browse');
  };

  const handleFAQClick = (faq) => {
    // Add question as user message
    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: faq.question,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Add answer as bot message
    const botMessage = {
      id: Date.now() + 1,
      type: 'bot',
      text: faq.answer,
      question: faq.question,
      timestamp: new Date()
    };

    setTimeout(() => {
      setMessages(prev => [...prev, botMessage]);
      setViewMode('chat');
    }, 300);
  };

  const categories = getCategories();
  const faqs = selectedCategory ? getFAQsByCategory(selectedCategory) : [];

  return (
    <>
      {/* Chat Button (Floating) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 w-16 h-16 rounded-full bg-gradient-to-br from-festival-orange to-festival-magenta text-white shadow-lg hover:shadow-xl transform hover:scale-110 transition-all flex items-center justify-center text-2xl"
          title="Open FAQ Chatbot"
        >
          💬
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-festival-orange via-festival-magenta to-festival-blue text-white p-4 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-lg">🎓 College Assistant</h3>
              <p className="text-sm text-white/80">Always here to help</p>
            </div>
            <button
              onClick={() => {
                setIsOpen(false);
                setViewMode('chat');
                setSelectedCategory(null);
              }}
              className="hover:bg-white/20 rounded-full p-2 transition"
            >
              ✕
            </button>
          </div>

          {/* Chat Area / Browse Area */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            {viewMode === 'chat' ? (
              <div className="space-y-4">
                {messages.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-2">👋</div>
                    <p className="text-gray-600">Start typing to ask a question!</p>
                  </div>
                ) : (
                  messages.map(msg => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          msg.type === 'user'
                            ? 'bg-gradient-to-r from-festival-orange to-festival-magenta text-white rounded-br-none'
                            : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none'
                        }`}
                      >
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                        {msg.category && (
                          <p className="text-xs mt-2 opacity-70">
                            Category: {msg.category.charAt(0).toUpperCase() + msg.category.slice(1)}
                          </p>
                        )}
                      </div>
                    </div>
                  ))
                )}
                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-gray-200 rounded-lg p-3 rounded-bl-none">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            ) : (
              <div className="space-y-3">
                {selectedCategory && (
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="w-full mb-3 flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                  >
                    ← Back to Categories
                  </button>
                )}

                {!selectedCategory ? (
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-gray-700 mb-3">Browse by Category:</p>
                    {categories.map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => handleCategorySelect(cat.id)}
                        className="w-full text-left px-4 py-3 bg-white border border-gray-200 rounded-lg hover:border-festival-orange hover:bg-orange-50 transition flex items-center justify-between group"
                      >
                        <div>
                          <p className="font-semibold text-gray-800">{cat.name}</p>
                          <p className="text-xs text-gray-500">{cat.count} FAQs</p>
                        </div>
                        <span className="text-gray-400 group-hover:text-festival-orange transition">→</span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {faqs.map((faq, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleFAQClick(faq)}
                        className="w-full text-left px-4 py-3 bg-white border border-gray-200 rounded-lg hover:border-festival-blue hover:bg-blue-50 transition"
                      >
                        <p className="font-semibold text-gray-800 text-sm">{faq.question}</p>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer / Input */}
          <div className="border-t border-gray-200 p-3 bg-white">
            {viewMode === 'chat' ? (
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask a question..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-festival-orange text-sm"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading || !inputValue.trim()}
                  className="px-4 py-2 bg-gradient-to-r from-festival-orange to-festival-magenta text-white rounded-full hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-sm"
                >
                  Send
                </button>
              </form>
            ) : (
              <button
                onClick={() => {
                  setViewMode('chat');
                  setSelectedCategory(null);
                }}
                className="w-full px-4 py-2 bg-festival-blue text-white rounded-full hover:bg-blue-700 transition font-semibold text-sm"
              >
                Back to Chat
              </button>
            )}
          </div>

          {/* Help Text */}
          <div className="bg-gray-100 px-3 py-2 text-xs text-gray-600 border-t border-gray-200">
            💡 Tip: Use the menu icon or type a question about admissions, events, exams, counseling, or contact details.
          </div>
        </div>
      )}
    </>
  );
}
