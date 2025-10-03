import { useState, useRef, KeyboardEvent } from "react";
import { Send, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function MessageInput() {
  const [message, setMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() && !selectedImage) return;

    console.log("Message sent:", message);
    setMessage("");
    setSelectedImage(null);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="border-t border-border bg-card/50 backdrop-blur-lg p-4">
      <form onSubmit={handleSubmit} className="container mx-auto max-w-4xl">
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-2 relative inline-block"
          >
            <img
              src={selectedImage}
              alt="Selected"
              className="h-20 rounded-lg border border-border"
            />
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center text-xs"
              aria-label="Remove image"
            >
              ×
            </button>
          </motion.div>
        )}

        <div className="flex gap-2 items-end">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
            aria-label="Upload image"
          />

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => fileInputRef.current?.click()}
            className="flex-shrink-0"
            aria-label="Attach image"
          >
            <ImageIcon className="h-5 w-5" />
          </Button>

          <div className="flex-1 relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message... (Shift+Enter for new line)"
              className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm resize-none transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-primary min-h-[52px] max-h-32"
              rows={1}
              style={{
                height: "auto",
                minHeight: "52px",
              }}
              onInput={(e) => {
                e.currentTarget.style.height = "auto";
                e.currentTarget.style.height = Math.min(
                  e.currentTarget.scrollHeight,
                  128
                ) + "px";
              }}
            />
          </div>

          <Button
            type="submit"
            variant="gradient"
            size="icon"
            disabled={!message.trim() && !selectedImage}
            className="flex-shrink-0 h-[52px] w-[52px] shadow-md hover:shadow-glow"
            aria-label="Send message"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </form>
    </div>
  );
}
