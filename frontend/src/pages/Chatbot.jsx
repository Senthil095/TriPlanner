// Chatbot Page - AI Travel Assistant with modern chat UI
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles, Loader2, Trash2 } from 'lucide-react';
import { chatApi } from '../services/api';
import AnimatedPage from '../components/ui/AnimatedPage';

const suggestions = [
  '🗼 Best time to visit Paris?',
  '💰 Budget tips for Tokyo',
  '🏖️ Hidden beaches in Thailand',
  '🧘 Wellness retreats in Bali',
  '🍜 Best street food cities',
  '🏔️ Solo trekking guide for Nepal',
];

function Chatbot() {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Hey there! 👋 I'm your AI travel assistant. Ask me anything about destinations, planning tips, safety advice, or local recommendations. Where are you thinking of going?",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text) => {
    if (!text.trim() || isLoading) return;

    const userMsg = { id: Date.now(), role: 'user', content: text.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await chatApi.send({ message: text.trim() });
      setMessages(prev => [
        ...prev,
        { id: Date.now() + 1, role: 'assistant', content: response.response || response.message || 'I can help you plan your trip!' },
      ]);
    } catch {
      setMessages(prev => [
        ...prev,
        { id: Date.now() + 1, role: 'assistant', content: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  const clearChat = () => {
    setMessages([messages[0]]);
  };

  return (
    <AnimatedPage className="flex flex-col h-[calc(100vh-4rem)] max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-surface-200 dark:border-surface-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-md shadow-violet-500/20">
            <Bot size={20} className="text-white" />
          </div>
          <div>
            <h1 className="font-semibold text-surface-900 dark:text-surface-100">AI Travel Assistant</h1>
            <p className="text-xs text-emerald-500 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Online
            </p>
          </div>
        </div>
        <button onClick={clearChat} title="Clear chat"
          className="p-2 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-400 hover:text-surface-600 dark:hover:text-surface-300 transition-colors">
          <Trash2 size={18} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Bot size={16} className="text-white" />
                </div>
              )}
              <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${msg.role === 'user'
                ? 'bg-primary-500 text-white rounded-br-md'
                : 'glass-card rounded-bl-md'
                }`}>
                <p className={msg.role === 'user' ? 'text-white' : 'text-surface-700 dark:text-surface-200'}>
                  {msg.content}
                </p>
              </div>
              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-500/20 flex items-center justify-center flex-shrink-0">
                  <User size={16} className="text-primary-600 dark:text-primary-400" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center flex-shrink-0">
              <Bot size={16} className="text-white" />
            </div>
            <div className="glass-card px-5 py-3 rounded-2xl rounded-bl-md">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-primary-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 rounded-full bg-primary-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 rounded-full bg-primary-400 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </motion.div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Suggestions */}
      {messages.length <= 1 && (
        <div className="px-4 pb-3">
          <p className="text-xs text-surface-400 mb-2 font-medium">Quick suggestions:</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((s, i) => (
              <motion.button key={i} whileTap={{ scale: 0.95 }}
                onClick={() => sendMessage(s.replace(/^[^\s]+\s/, ''))}
                className="px-3 py-1.5 rounded-full bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-300 text-xs font-medium hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors"
              >
                {s}
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-surface-200 dark:border-surface-700">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            className="input-field flex-1"
            placeholder="Ask me anything about travel..."
            disabled={isLoading}
          />
          <button type="submit" disabled={!input.trim() || isLoading}
            className="p-3 rounded-xl bg-primary-500 text-white hover:bg-primary-600 transition-colors disabled:opacity-40 shadow-md shadow-primary-500/20"
          >
            <Send size={18} />
          </button>
        </div>
      </form>
    </AnimatedPage>
  );
}

export default Chatbot;
