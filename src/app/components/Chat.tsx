'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Virtuoso } from 'react-virtuoso';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const virtuosoRef = useRef(null);

  // Debounced scroll handler
  const scrollToBottom = useCallback(() => {
    if (virtuosoRef.current) {
      (virtuosoRef.current as unknown as { scrollToIndex: (opts: { index: number; behavior: string }) => void }).scrollToIndex({
        index: messages.length - 1,
        behavior: 'smooth',
      });
    }
  }, [messages.length]);

  useEffect(() => {
    const timeoutId = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timeoutId);
  }, [messages, scrollToBottom]);

  // Message renderer
  const renderMessage = (index: number): JSX.Element => {
    const message = messages[index];
    return (
      <div
        className={`flex ${
          message.role === 'user' ? 'justify-end' : 'justify-start'
        } animate-fade-in px-2 sm:px-4 mb-6`}
        role="article"
        aria-label={`${message.role} message`}
      >
        <div className="flex items-start gap-3">
          {message.role === 'assistant' && (
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white flex-shrink-0">
              AI
            </div>
          )}
          <div
            className={`max-w-[85%] rounded-2xl px-4 py-3 ${
              message.role === 'user'
                ? 'bg-blue-600 text-white rounded-br-none'
                : 'bg-gray-700 text-gray-100 rounded-bl-none'
            } shadow-lg prose prose-invert break-words whitespace-pre-wrap overflow-hidden`}
          >
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                a: (props: React.HTMLProps<HTMLAnchorElement>) => (
                  <a 
                    {...props} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-300 hover:text-blue-200 underline"
                  />
                ),
                code: ({ className, children, ...props }: React.HTMLProps<HTMLElement>) => {
                  const match = /language-(\w+)/.exec(className || '');
                  const isInline = !match;
                  return isInline ? (
                    <code className="bg-gray-800 px-1 py-0.5 rounded break-all" {...props}>
                      {children}
                    </code>
                  ) : (
                    <code className="block bg-gray-800 p-2 rounded overflow-x-auto scrollbar-hidden max-w-full" {...props}>
                      {children}
                    </code>
                  );
                },
                p: ({ children }: React.HTMLProps<HTMLParagraphElement>) => (
                  <p className="mb-2 last:mb-0">{children}</p>
                )
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
          {message.role === 'user' && (
            <div className="flex items-center justify-center flex-shrink-0">
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-full border border-blue-400 bg-gradient-to-r from-blue-700 to-blue-500 text-white font-bold shadow-md text-xs sm:text-sm animate-fade-in">
                <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4 sm:h-5 sm:w-5 text-blue-200' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth='2'><path strokeLinecap='round' strokeLinejoin='round' d='M5.121 17.804A9 9 0 1112 21a8.963 8.963 0 01-6.879-3.196z' /><path strokeLinecap='round' strokeLinejoin='round' d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' /></svg>
                Me
              </span>
            </div>
          )}
        </div>
      </div>
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: userMessage.content }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const rawText = await response.text();
      console.log('📦 Chat Component: Raw response:', rawText);
      
      let responseText: string;
      
      try {
        const jsonData = JSON.parse(rawText);
        responseText = jsonData.text || jsonData.error || 'No response text found';
        if (jsonData.error) {
          throw new Error(responseText);
        }
      } catch (e) {
        console.error('❌ Chat Component: Failed to parse response:', e);
        throw new Error('Failed to parse response from server');
      }
      
      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: responseText
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: 'Sorry, there was an error processing your request. Please try again.'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="flex flex-col card overflow-hidden h-[calc(100vh-12rem)]"
      role="region"
      aria-label="Chat conversation"
    >
      <div 
        className="flex-1 overflow-y-auto scrollbar-hidden"
        role="log"
        aria-live="polite"
      >
        {messages.length === 0 ? (
          <div className="text-center text-gray-400 py-8 h-full flex flex-col items-center justify-center" role="status">
            <div className="text-6xl mb-4 animate-pulse-glow" aria-hidden="true">👋</div>
            <h2 className="text-xl mb-2 font-semibold">
              <span className="text-gradient font-medium">Welcome! How can I help with your social media strategy?</span>
            </h2>
            <p className="text-sm">Ask me about content creation, audience growth, or engagement tactics!</p>
          </div>
        ) : (
          <Virtuoso
            ref={virtuosoRef}
            data={messages}
            itemContent={(index) => renderMessage(index)}
            className="h-full px-2 scrollbar-hidden"
            followOutput="smooth"
            increaseViewportBy={{ top: 100, bottom: 100 }}
            style={{ height: '100%' }}
            overscan={20}
            components={{
              Item: ({ children, ...props }) => (
                <div {...props} className="py-1">
                  {children}
                </div>
              ),
            }}
          />
        )}
        
        {isLoading && (
          <div 
            className="flex justify-start animate-fade-in p-4"
            role="status"
            aria-label="Loading response"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                AI
              </div>
              <div className="bg-gray-700 rounded-2xl px-4 py-3 rounded-bl-none">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <form 
        onSubmit={handleSubmit} 
        className="border-t border-gray-700 p-4 glass"
        role="form"
        aria-label="Message input form"
      >
        <div className="flex gap-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about social media growth strategies..."
            className="flex-1 px-4 py-2 rounded-full bg-gray-700 text-gray-100 border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 placeholder-gray-400"
            disabled={isLoading}
            aria-label="Message input"
            role="textbox"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full hover:from-blue-700 hover:to-blue-800 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            aria-label={isLoading ? "Sending message..." : "Send message"}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
} 