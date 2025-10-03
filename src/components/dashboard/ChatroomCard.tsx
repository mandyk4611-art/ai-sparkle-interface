import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

interface ChatroomCardProps {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: string;
  unread?: boolean;
}

export function ChatroomCard({
  id,
  title,
  lastMessage,
  timestamp,
  unread,
}: ChatroomCardProps) {
  return (
    <Link to={`/chat/${id}`}>
      <motion.div
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="bg-card border border-border rounded-xl p-4 hover:border-primary/50 transition-smooth cursor-pointer shadow-sm hover:shadow-md"
      >
        <div className="flex items-start gap-3">
          <div className="h-12 w-12 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0 shadow-md">
            <MessageSquare className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-1">
              <h3 className="font-semibold text-foreground truncate">{title}</h3>
              {unread && (
                <span className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />
              )}
            </div>
            <p className="text-sm text-muted-foreground truncate">{lastMessage}</p>
            <p className="text-xs text-muted-foreground mt-1">{timestamp}</p>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
