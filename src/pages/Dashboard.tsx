import { motion } from "framer-motion";
import { Plus, Inbox } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/Header";
import { ChatroomCard } from "@/components/dashboard/ChatroomCard";
import { Button } from "@/components/ui/button";

// Placeholder data
const chatrooms = [
  {
    id: "1",
    title: "Recipe Ideas",
    lastMessage: "Can you suggest some healthy breakfast options?",
    timestamp: "2 hours ago",
    unread: true,
  },
  {
    id: "2",
    title: "Travel Planning",
    lastMessage: "What are the best places to visit in Japan?",
    timestamp: "Yesterday",
  },
  {
    id: "3",
    title: "Code Help",
    lastMessage: "How do I optimize this React component?",
    timestamp: "2 days ago",
  },
  {
    id: "4",
    title: "Creative Writing",
    lastMessage: "Help me write a short story about...",
    timestamp: "3 days ago",
    unread: true,
  },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen gradient-subtle">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <h2 className="text-3xl font-bold mb-2">Your Conversations</h2>
          <p className="text-muted-foreground">
            Continue where you left off or start a new chat
          </p>
        </motion.div>

        {/* Chatrooms Grid */}
        {chatrooms.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {chatrooms.map((room, index) => (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <ChatroomCard {...room} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <Inbox className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No conversations yet</h3>
            <p className="text-muted-foreground mb-6">
              Start your first conversation with AI
            </p>
          </motion.div>
        )}

        {/* Floating Create Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="fixed bottom-8 right-8"
        >
          <Button
            size="lg"
            variant="gradient"
            className="h-14 w-14 rounded-full shadow-glow hover:scale-110 transition-smooth"
            aria-label="Create new chatroom"
          >
            <Plus className="h-6 w-6" />
          </Button>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
