import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChatHeader } from "@/components/chat/ChatHeader";
import { MessageBubble } from "@/components/chat/MessageBubble";
import { TypingIndicator } from "@/components/chat/TypingIndicator";
import { MessageInput } from "@/components/chat/MessageInput";

// Placeholder messages
const mockMessages = [
  {
    id: "1",
    role: "user" as const,
    content: "Hello! Can you help me with some React questions?",
    timestamp: "10:30 AM",
  },
  {
    id: "2",
    role: "ai" as const,
    content:
      "Of course! I'd be happy to help you with React. What specific questions do you have?",
    timestamp: "10:30 AM",
  },
  {
    id: "3",
    role: "user" as const,
    content: "How do I optimize performance in a large React application?",
    timestamp: "10:31 AM",
  },
  {
    id: "4",
    role: "ai" as const,
    content: `Great question! Here are some key strategies for optimizing React performance:

1. Use React.memo() for component memoization
2. Implement useMemo and useCallback hooks
3. Code splitting with React.lazy()
4. Virtualize long lists with libraries like react-window
5. Avoid inline function definitions in JSX

Would you like me to elaborate on any of these points?`,
    timestamp: "10:31 AM",
  },
];

const Chatroom = () => {
  const { id } = useParams();
  const [messages] = useState(mockMessages);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Simulate typing indicator
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTyping(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col h-screen gradient-subtle">
      <ChatHeader title="Recipe Ideas" />

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto max-w-4xl px-4 py-6 space-y-6">
          {messages.map((message) => (
            <MessageBubble key={message.id} {...message} />
          ))}

          <AnimatePresence>
            {isTyping && <TypingIndicator />}
          </AnimatePresence>

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <MessageInput />
    </div>
  );
};

export default Chatroom;
