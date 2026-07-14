import { useState, useRef, useEffect, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Clock, Trash2 } from 'lucide-react';

type ChatMessage = {
  id: number;
  sender: 'bot' | 'user';
  text: string;
};

/* ------------------------------------------------------------------ */
/*  Knowledge base — purely local, no external API                    */
/* ------------------------------------------------------------------ */

type KnowledgeEntry = {
  keywords: string[];
  response: string;
};

const destinationsData = {
  paris: {
    title: 'Paris 1889',
    subtitle: "L'Exposition Universelle",
    description:
      "Vivez l'effervescence de la Belle Époque parisienne. Contemplez la Tour Eiffel naissante, flânez sur les Grands Boulevards et assistez à l'inauguration d'une époque qui a redéfini l'élégance.",
    highlights: ['Exposition Universelle', 'Tour Eiffel', 'Belle Époque'],
    duration: '5 jours',
    price: '8 900',
  },
  cretace: {
    title: 'Crétacé',
    subtitle: 'Le règne des géants',
    description:
      "Remontez 66 millions d'années en arrière. Marchez dans une jungle préhistorique grouillante de vie, observez les dinosaures dans leur habitat naturel et ressentez la puissance des volcans en activité.",
    highlights: ['Dinosaures', 'Jungle préhistorique', 'Volcans'],
    duration: '4 jours',
    price: '12 500',
  },
  florence: {
    title: 'Florence 1504',
    subtitle: "L'apogée de la Renaissance",
    description:
      "Plongez au cœur de la Renaissance italienne. Croisez Michel-Ange achevant son David, admirez la coupole du Duomo de Brunelleschi et imprégnez-vous de l'effervescence artistique qui a changé le monde.",
    highlights: ['Renaissance', 'Michel-Ange', 'Duomo'],
    duration: '5 jours',
    price: '9 800',
  },
};

const knowledgeBase: KnowledgeEntry[] = [
  // Paris 1889
  {
    keywords: ['paris', '1889', 'eiffel', 'belle époque', 'bel epoque', 'exposition universelle', 'boulevards'],
    response: `**Paris 1889 — L'Exposition Universelle**\n\n${destinationsData.paris.description}\n\n• Durée : ${destinationsData.paris.duration}\n• Prix : à partir de ${destinationsData.paris.price} €\n• Points forts : ${destinationsData.paris.highlights.join(', ')}`,
  },
  // Crétacé
  {
    keywords: ['crétacé', 'cretace', 'dinosaure', 'dinosaures', 'préhistorique', 'prehistorique', 'jungle', 'volcan', 'volcans', '66 million'],
    response: `**Crétacé — Le règne des géants**\n\n${destinationsData.cretace.description}\n\n• Durée : ${destinationsData.cretace.duration}\n• Prix : à partir de ${destinationsData.cretace.price} €\n• Points forts : ${destinationsData.cretace.highlights.join(', ')}`,
  },
  // Florence 1504
  {
    keywords: ['florence', '1504', 'renaissance', 'michel-ange', 'michel ange', 'michelange', 'david', 'duomo', 'brunelleschi', 'italie'],
    response: `**Florence 1504 — L'apogée de la Renaissance**\n\n${destinationsData.florence.description}\n\n• Durée : ${destinationsData.florence.duration}\n• Prix : à partir de ${destinationsData.florence.price} €\n• Points forts : ${destinationsData.florence.highlights.join(', ')}`,
  },
  // Prices
  {
    keywords: ['prix', 'tarif', 'tarifs', 'coût', 'cout', 'combien', 'cher', '€', 'euro', 'euros', 'prixs'],
    response:
      "Voici nos tarifs :\n\n• **Paris 1889** — à partir de 8 900 € (5 jours)\n• **Crétacé** — à partir de 12 500 € (4 jours)\n• **Florence 1504** — à partir de 9 800 € (5 jours)\n\nLe paiement en 3 fois sans frais est disponible. Souhaitez-vous réserver l'une de ces destinations ?",
  },
  // Booking
  {
    keywords: ['réserver', 'reserver', 'réservation', 'reservation', 'book', 'booking', 'réserve', 'reserve', 'partir', 'date', 'dates'],
    response:
      "Pour réserver, rendez-vous dans la section **Réservation** du site. Remplissez le formulaire avec votre nom, email, destination souhaitée, date et nombre de voyageurs. Notre équipe vous recontactera sous **48 heures** pour finaliser votre itinéraire. L'annulation est gratuite jusqu'à 30 jours avant le départ, et le paiement en 3 fois sans frais est disponible.",
  },
  // Safety
  {
    keywords: ['sécurité', 'securite', 'sécurisé', 'securise', 'sûr', 'sur', 'danger', 'risque', 'risques', 'protégé', 'protege'],
    response:
      "Les voyages temporels sont sécurisés. Chaque voyage est encadré par notre protocole de sécurité quantique de niveau militaire. Nos ingénieurs surveillent le continuum en temps réel et un champ de stasis protecteur vous accompagne à chaque instant. Aucun incident n'a jamais été recensé.",
  },
  // Luggage
  {
    keywords: ['bagage', 'bagages', 'emporter', 'affaires', 'valise', 'valises', 'kit', 'tenue', 'poids'],
    response:
      "Nous fournissons une tenue d'époque complète, un traducteur universel et un kit de survie adapté à votre destination. Apportez uniquement vos effets personnels indispensables et un carnet de notes. Le poids est limité à 5 kg pour préserver l'équilibre temporel.",
  },
  // Modification
  {
    keywords: ['modifier', 'modification', 'annuler', 'annulation', 'changer', 'change', 'rembourser', 'remboursement'],
    response:
      "Les modifications sont possibles jusqu'à 30 jours avant le départ, sans frais. Au-delà, des frais administratifs de 15 % du montant total peuvent s'appliquer. L'annulation est gratuite jusqu'à 30 jours avant la date de départ.",
  },
  // Children
  {
    keywords: ['enfant', 'enfants', 'mineur', 'mineurs', 'famille', 'familles', 'ados', 'jeune', 'jeunes'],
    response:
      "Les enfants de 10 ans et plus sont les bienvenus, accompagnés d'un adulte. Nous proposons des itinéraires adaptés aux familles avec des activités pédagogiques. Une décharge parentale est requise pour tout mineur.",
  },
  // Return
  {
    keywords: ['retour', 'revenir', 'rentrer', 'portail', 'rappel', 'urgence', 'urgences'],
    response:
      "Le retour s'effectue via le portail temporel déployé à votre destination. Il s'active automatiquement à la fin de votre séjour. En cas d'urgence, chaque voyageur dispose d'un rappel d'urgence qui ouvre un portail instantané vers notre base de départ.",
  },
  // Payment
  {
    keywords: ['paiement', 'payer', 'carte', 'visa', 'mastercard', 'amex', 'virement', 'financement', '3 fois', 'sans frais'],
    response:
      "Nous acceptons les cartes bancaires (Visa, Mastercard, Amex), les virements et le paiement en 3 fois sans frais. Pour les voyages premium, un financement personnalisé sur 12 mois est disponible. Le règlement s'effectue en euros contemporains.",
  },
  // Destinations overview
  {
    keywords: ['destination', 'destinations', 'voyage', 'voyages', 'offre', 'offres', 'aller', 'où', 'ou'],
    response:
      "Nous proposons trois destinations temporelles :\n\n• **Paris 1889** — L'Exposition Universelle (5 jours, dès 8 900 €)\n• **Crétacé** — Le règne des géants (4 jours, dès 12 500 €)\n• **Florence 1504** — L'apogée de la Renaissance (5 jours, dès 9 800 €)\n\nLaquelle vous intéresse le plus ?",
  },
  // Greetings
  {
    keywords: ['bonjour', 'salut', 'hello', 'coucou', 'bonsoir', 'hey', 'bonjour chronos'],
    response: "Bonjour ! Je suis Chronos, votre assistant temporel. Je peux vous renseigner sur nos trois destinations (Paris 1889, Crétacé, Florence 1504), les prix, la réservation, la sécurité et bien plus. Que souhaitez-vous savoir ?",
  },
  // Thanks
  {
    keywords: ['merci', 'thanks', 'thank you', 'super', 'génial', 'genial', 'parfait'],
    response: "Avec plaisir ! N'hésitez pas si vous avez d'autres questions. Et quand vous serez prêt, la section Réservation vous attend pour planifier votre voyage à travers le temps.",
  },
  // Help
  {
    keywords: ['aide', 'help', 'que peux-tu', 'que peux tu', 'comment', 'faq', 'question'],
    response:
      "Je peux vous renseigner sur :\n\n• Nos **destinations** (Paris 1889, Crétacé, Florence 1504)\n• Les **prix** et le **paiement**\n• La **réservation** et l'**annulation**\n• La **sécurité** des voyages\n• Les **bagages** et l'équipement\n• Les **enfants** et voyages en famille\n• Le **retour** et les urgences\n\nPosez-moi votre question !",
  },
];

const fallbackResponse =
  "Je ne suis pas certain d'avoir bien saisi votre question. Je peux vous renseigner sur nos destinations (Paris 1889, Crétacé, Florence 1504), les prix, la réservation, la sécurité, les bagages ou le retour. N'hésitez pas à reformuler !";

function findResponse(input: string): string {
  const lower = input.toLowerCase();
  let bestMatch: KnowledgeEntry | null = null;
  let bestScore = 0;

  for (const entry of knowledgeBase) {
    let score = 0;
    for (const kw of entry.keywords) {
      if (lower.includes(kw)) score += kw.length > 4 ? 2 : 1;
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }

  return bestMatch ? bestMatch.response : fallbackResponse;
}

/* ------------------------------------------------------------------ */
/*  Quick reply buttons                                               */
/* ------------------------------------------------------------------ */

const quickReplies = [
  'Paris 1889',
  'Crétacé',
  'Florence 1504',
  'Voir les prix',
  'Comment réserver ?',
  'Sécurité',
];

/* ------------------------------------------------------------------ */
/*  Initial message + history persistence                             */
/* ------------------------------------------------------------------ */

const initialMessage: ChatMessage = {
  id: 1,
  sender: 'bot',
  text: "Bonjour ! Je suis **Chronos**, votre assistant temporel. Je peux vous renseigner sur nos destinations, les prix, la réservation, la sécurité et bien plus. Comment puis-je vous aider ?",
};

const STORAGE_KEY = 'chronos-chat-history';

function loadHistory(): ChatMessage[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as ChatMessage[];
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    /* ignore */
  }
  return [initialMessage];
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(loadHistory);
  const [input, setInput] = useState('');
  const [unread, setUnread] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const typingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      /* ignore */
    }
  }, [messages]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open, isTyping]);

  // Cleanup pending typing timer on unmount
  useEffect(() => {
    return () => {
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    };
  }, []);

  const sendBotResponse = (text: string) => {
    const delay = Math.min(2200, Math.max(700, text.length * 12));
    setIsTyping(true);
    typingTimerRef.current = setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + Math.random(), sender: 'bot', text },
      ]);
      setIsTyping(false);
    }, delay);
  };

  const handleSend = (ev?: FormEvent) => {
    ev?.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isTyping) return;

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), sender: 'user', text: trimmed },
    ]);
    setInput('');
    sendBotResponse(findResponse(trimmed));
  };

  const handleQuickReply = (reply: string) => {
    if (isTyping) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), sender: 'user', text: reply },
    ]);
    sendBotResponse(findResponse(reply));
  };

  const toggleOpen = () => {
    setOpen(!open);
    if (!open) setUnread(false);
  };

  const clearHistory = () => {
    setMessages([initialMessage]);
    setIsTyping(false);
    if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
  };

  // Render bot text with simple **bold** parsing and line breaks
  const renderText = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="font-semibold text-gold-200">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return (
        <span key={i}>
          {part.split('\n').map((line, j, arr) => (
            <span key={j}>
              {line}
              {j < arr.length - 1 && <br />}
            </span>
          ))}
        </span>
      );
    });
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
            className="fixed bottom-24 right-4 z-50 flex h-[520px] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-gold-500/20 glass shadow-2xl shadow-black/50 sm:right-6"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-midnight-700 bg-midnight-800/40 px-4 py-4">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gold-gradient shadow-lg shadow-gold-500/20">
                <Clock className="h-5 w-5 text-midnight-950" strokeWidth={2} aria-hidden="true" />
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-midnight-900 bg-green-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-white">Chronos</p>
                <p className="text-xs text-gray-400">
                  {isTyping ? (
                    <span className="text-gold-300">écrit...</span>
                  ) : (
                    'Assistant temporel'
                  )}
                </p>
              </div>
              {messages.length > 1 && (
                <button
                  onClick={clearHistory}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-midnight-700 hover:text-red-400"
                  aria-label="Effacer l'historique"
                  title="Effacer l'historique"
                >
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                </button>
              )}
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
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'rounded-br-md bg-gold-gradient text-midnight-950'
                        : 'rounded-bl-md bg-midnight-700/60 text-gray-200'
                    }`}
                  >
                    {msg.sender === 'bot' ? renderText(msg.text) : msg.text}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md bg-midnight-700/60 px-4 py-3.5">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="h-2 w-2 rounded-full bg-gold-300/70"
                          animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
                          transition={{
                            duration: 0.9,
                            repeat: Infinity,
                            delay: i * 0.15,
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Quick replies */}
            <div className="flex flex-wrap gap-2 border-t border-midnight-700 bg-midnight-800/30 px-3 py-2.5">
              {quickReplies.map((reply) => (
                <button
                  key={reply}
                  onClick={() => handleQuickReply(reply)}
                  disabled={isTyping}
                  className="rounded-full border border-gold-500/20 bg-midnight-700/40 px-3 py-1.5 text-xs text-gold-200 transition-all hover:border-gold-500/50 hover:bg-gold-500/10 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {reply}
                </button>
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
                disabled={isTyping || !input.trim()}
                className="btn-gold flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full disabled:cursor-not-allowed disabled:opacity-40"
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
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-6 w-6 text-midnight-950" strokeWidth={2.5} aria-hidden="true" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
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
