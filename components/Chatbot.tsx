import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";
import { ChatMessage } from '../types';
import { triggerHapticFeedback } from '../utils/haptics';

// Fix: Use process.env.API_KEY as per coding guidelines.
const API_KEY = process.env.API_KEY;
if (!API_KEY) {
    throw new Error("API_KEY environment variable is not set for the Chatbot.");
}
const ai = new GoogleGenAI({ apiKey: API_KEY });

const MITRA_SYSTEM_PROMPT = `You are 'Mitra', a warm, empathetic, and supportive AI companion from India. Your purpose is to provide a safe, non-judgmental space for users to express their feelings, explore their thoughts, and find moments of calm. You should use simple, encouraging language. You can gently guide users with reflective questions, but you are not a therapist and must not provide medical advice. If a user expresses any sentiment of crisis or self-harm, you must immediately and firmly guide them to seek professional help and provide the KIRAN helpline number (1800-599-0019). Your tone should be consistently gentle, patient, and understanding. You can use culturally relevant analogies from India if appropriate, but keep it accessible. Your name, 'Mitra', means 'friend' in Hindi - embody that.`;

const WelcomeMessage: React.FC = () => (
    <div className="text-center p-4 animate-fade-in max-w-sm">
        <div className="w-16 h-16 text-cyan-500 dark:text-cyan-400 mx-auto mb-4" style={{ filter: 'drop-shadow(0 0 8px currentColor)'}}>
             <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 2c-1.39 0-2.73.29-3.95.84l.89.89a6.5 6.5 0 018.12 0l.89-.89A7.96 7.96 0 0012 4zm0 14a6 6 0 01-4.24-1.76l-.89.89A8 8 0 0012 20a8 8 0 007.13-4.87l-.89-.89A6 6 0 0112 18z"></path><path d="M12 6a6 6 0 00-6 6 6 6 0 006 6 6 6 0 006-6 6 6 0 00-6-6zm0 2a4 4 0 110 8 4 4 0 010-8z"></path><circle cx="12" cy="12" r="2" fill="currentColor"></circle></svg>
        </div>
        <p className="text-slate-600 dark:text-slate-400">
            Welcome. I'm Mitra, your supportive companion. Feel free to share what's on your mind.
        </p>
    </div>
);

const MessageBubble: React.FC<{ message: ChatMessage }> = ({ message }) => {
    const isUser = message.role === 'user';
    return (
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
            <div
                className={`max-w-md px-4 py-3 rounded-2xl shadow-sm ${
                    isUser
                        ? 'bg-cyan-500 text-white rounded-br-lg'
                        : 'bg-slate-200/80 dark:bg-slate-700/80 text-slate-800 dark:text-slate-200 rounded-bl-lg'
                }`}
            >
                {message.text}
            </div>
        </div>
    );
};

export const Chatbot: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatRef = useRef<Chat | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const initializeChat = () => {
        chatRef.current = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: {
                systemInstruction: MITRA_SYSTEM_PROMPT,
                temperature: 0.7,
            },
        });
    };

    useEffect(() => {
        // Initialize the chat session
        initializeChat();
    }, []);

    useEffect(() => {
        // Scroll to the latest message
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    const handleSendMessage = async (e: FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading || !chatRef.current) return;
        
        triggerHapticFeedback('medium');
        const userMessage: ChatMessage = { role: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const stream = await chatRef.current.sendMessageStream({ message: input });
            let modelResponse = '';
            
            // Set up a placeholder for the model's response
            setMessages(prev => [...prev, { role: 'model', text: '...' }]);

            for await (const chunk of stream) {
                modelResponse += chunk.text;
                // Update the last message (the placeholder) with the streamed content
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1].text = modelResponse;
                    return newMessages;
                });
            }
        } catch (error) {
            console.error("Error sending message:", error);
            setMessages(prev => [...prev, { role: 'model', text: "Sorry, I'm having a little trouble right now. Please try again in a moment." }]);
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleClearChat = () => {
        if (window.confirm("Are you sure you want to clear this chat? This action cannot be undone.")) {
            triggerHapticFeedback('heavy');
            setMessages([]);
            initializeChat();
        }
    };
    
    const chatContainerClasses = `flex-grow overflow-y-auto p-4 ${messages.length === 0 ? 'flex items-center justify-center' : 'space-y-4'}`;

    return (
        <div className="w-full h-[65vh] md:h-[70vh] flex flex-col animate-fade-in-up">
            <div className="flex-shrink-0 p-4 border-b border-slate-300/50 dark:border-slate-700/50 flex justify-between items-center">
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">Mindful Chat with Mitra</h2>
                {messages.length > 0 && (
                    <button
                        onClick={handleClearChat}
                        className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors rounded-md px-3 py-1 hover:bg-red-500/10 dark:hover:bg-red-400/10"
                        aria-label="Clear chat history"
                    >
                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4" aria-hidden="true"><path fillRule="evenodd" d="M5 3.25V4H2.75a.75.75 0 0 0 0 1.5h.5V12A2.5 2.5 0 0 0 5.75 14.5h4.5A2.5 2.5 0 0 0 12.75 12V5.5h.5a.75.75 0 0 0 0-1.5H11V3.25A1.75 1.75 0 0 0 9.25 1.5h-2.5A1.75 1.75 0 0 0 5 3.25Zm2.5 1.25V3.25a.25.25 0 0 1 .25-.25h2.5a.25.25 0 0 1 .25.25V4.5h-3Z" clipRule="evenodd" /></svg>
                        Clear Chat
                    </button>
                )}
            </div>
            <div className={chatContainerClasses} aria-live="polite" aria-atomic="false">
                {messages.length === 0 ? (
                    <WelcomeMessage />
                ) : (
                    messages.map((msg, index) => <MessageBubble key={index} message={msg} />)
                )}
                 {isLoading && messages.length > 0 && messages[messages.length - 1].role === 'user' && (
                    <div className="flex justify-start">
                        <div className="px-4 py-3 rounded-2xl bg-slate-200 dark:bg-slate-700 rounded-bl-lg">
                            <div className="flex items-center gap-2" role="status" aria-label="Mitra is typing">
                                <span className="w-2 h-2 bg-slate-400 rounded-full animate-pulse"></span>
                                <span className="w-2 h-2 bg-slate-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></span>
                                <span className="w-2 h-2 bg-slate-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></span>
                            </div>
                        </div>
                    </div>
                 )}
                <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t border-slate-300/50 dark:border-slate-700/50">
                <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                    <label htmlFor="chat-input" className="sr-only">Your message</label>
                    <input
                        type="text"
                        id="chat-input"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message..."
                        disabled={isLoading}
                        className="w-full bg-slate-100/70 dark:bg-slate-800/70 border border-slate-300 dark:border-slate-700 rounded-full py-3 px-5 focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all"
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !input.trim()}
                        className="w-12 h-12 flex-shrink-0 bg-gradient-to-r from-cyan-500 to-fuchsia-600 text-white rounded-full flex items-center justify-center transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-110"
                        aria-label="Send message"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6" aria-hidden="true">
                            <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.949a.75.75 0 00.95.539l2.842-.947a.75.75 0 01.38.38l-.947 2.842a.75.75 0 00.54.95l4.95 1.414a.75.75 0 00.95-.826l-2.289-8.01a.75.75 0 00-.95-.54l-8.01 2.289z" />
                            <path d="M9.496 11.414a.75.75 0 01.38.38l-.947 2.842a.75.75 0 00.54.95l4.95 1.414a.75.75 0 00.95-.826l-2.289-8.01a.75.75 0 00-.95-.54l-8.01 2.289a.75.75 0 00.54.95l2.842-.947a.75.75 0 01.38.38z" />
                        </svg>
                    </button>
                </form>
            </div>
        </div>
    );
};