import { useState, useRef, useEffect, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Clock } from 'lucide-react';

type ChatMessage = {
  id: number;
  sender: 'bot' | 'user';
  text: string;
};

const initialMessages: ChatMessage[] = [
  {
    id: 1,
    sender: 'bot',
    text: "Bonjour ! Je suis Chronos, votre assistant temporel. Comment puis-je vous aider aujourd'hui ?",
  },
];

const botResponses = [
  "Excellente question ! Notre équipe vous répondra en détail sous 48 heures. En attendant, n'hésitez pas à consulter notre section FAQ.",
  "Je note votre demande. Pour une réponse personnalisée, je vous invite à remplir le formulaire de réservation.",
  "Très bonne idée ! Cette destination est l'une de nos plus populaires. Souhaitez-vous en savoir plus sur l'itinéraire ?",
  "Je suis encore en phase de développement, mais je serai bientôt capable de répondre à toutes vos questions avec précision !",
];

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState('');
  const [unread, setUnread] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  const handleSend = (ev: FormEvent) => {
    ev.preventDefault();
    if (!input.trim()) return;
    const userMsg: ChatMessage = { id: Date.now(), sender: 'user', text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    setTimeout(() => {
      const botMsg: ChatMessage = {
        id: Date.now() + 1,
        sender: 'bot',
        text: botResponses[Math.floor(Math.random() * botResponses.length)],
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 800);
  };

  const toggleOpen = () => {
    setOpen(!open);
    if (!open) setUnread(false);
  };

  return (
    <>
      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-4 z-50 flex h-[440px] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-gold-500/20 glass shadow-2xl shadow-black/50 sm:right-6"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-midnight-700 bg-midnight-800/40 px-4 py-4">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gold-gradient shadow-lg shadow-gold-500/20">
                <Clock className="h-5 w-5 text-midnight-950" strokeWidth={2} aria-hidden="true" />
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-midnight-900 bg-green-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-white">Chronos</p>
                <p className="text-xs text-gray-400">Assistant temporel</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-midnight-700 hover:text-white"
                aria-label="Fermer"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-5">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                      msg.sender === 'user'
                        ? 'rounded-br-md bg-gold-gradient text-midnight-950'
                        : 'rounded-bl-md bg-midnight-700/60 text-gray-200'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <form
              onSubmit={handleSend}
              className="flex items-center gap-2 border-t border-midnight-700 bg-midnight-800/40 px-3 py-3"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Écrivez votre message..."
                className="flex-1 rounded-full border border-midnight-600 bg-midnight-900/50 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-gold-500/50 focus:outline-none"
              />
              <button
                type="submit"
                className="btn-gold flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full"
                aria-label="Envoyer le message"
              >
                <Send className="h-4 w-4" aria-hidden="true" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating bubble */}
      <motion.button
        onClick={toggleOpen}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="btn-gold fixed bottom-6 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-xl shadow-gold-500/30 sm:right-6"
        aria-label="Ouvrir le chat Chronos"
      >
        {!open && (
          <motion.span
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-full bg-gold-400/40"
          />
        )}
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <X className="h-6 w-6 text-midnight-950" strokeWidth={2.5} aria-hidden="true" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <MessageCircle className="h-6 w-6 text-midnight-950" strokeWidth={2.5} aria-hidden="true" />
            </motion.div>
          )}
        </AnimatePresence>
        {unread && !open && (
          <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[0.6rem] font-bold text-white">
            1
          </span>
        )}
      </motion.button>
    </>
  );
}
