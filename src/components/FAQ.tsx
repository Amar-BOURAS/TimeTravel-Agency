import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';

const faqItems = [
  {
    question: 'Les voyages temporels sont-ils sécurisés ?',
    answer:
      "Absolument. Chaque voyage est encadré par notre protocole de sécurité quantique de niveau militaire. Nos ingénieurs surveillent le continuum en temps réel et un champ de stasis protecteur vous accompagne à chaque instant. Aucun incident n'a jamais été recensé depuis la création de l'agence.",
  },
  {
    question: 'Que dois-je emporter ?',
    answer:
      "Nous fournissons une tenue d'époque complète, un traducteur universel et un kit de survie adapté à votre destination. Nous vous recommandons d'apporter uniquement vos effets personnels indispensables et un carnet de notes. Le poids est limité à 5 kg pour préserver l'équilibre temporel.",
  },
  {
    question: 'Puis-je modifier ma réservation ?',
    answer:
      "Oui, les modifications sont possibles jusqu'à 30 jours avant la date de départ, sans frais. Au-delà de ce délai, des frais administratifs de 15% du montant total peuvent s'appliquer. Contactez notre équipe pour toute demande de modification.",
  },
  {
    question: 'Les enfants peuvent-ils voyager ?',
    answer:
      "Les enfants de 10 ans et plus sont les bienvenus, accompagnés d'un adulte. Nous proposons des itinéraires adaptés aux familles avec des activités pédagogiques spécialement conçues pour les jeunes voyageurs. Une décharge parentale est requise pour tout mineur.",
  },
  {
    question: 'Comment fonctionne le retour ?',
    answer:
      "Le retour s'effectue via le portail temporel que nous déployons à votre destination. Il s'active automatiquement à la fin de votre séjour. En cas d'urgence, chaque voyageur dispose d'un rappel d'urgence qui ouvre un portail instantané vers notre base de départ.",
  },
  {
    question: 'Quels moyens de paiement acceptez-vous ?',
    answer:
      "Nous acceptons les cartes bancaires (Visa, Mastercard, Amex), les virements bancaires et le paiement en 3 fois sans frais. Pour les voyages premium, nous proposons également un financement personnalisé sur 12 mois. Le règlement s'effectue en euros contemporains.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <div className="mb-20 text-center">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-medium uppercase tracking-[0.35em] text-gold-400"
          >
            Questions fréquentes
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 font-display text-5xl font-semibold leading-[1.1] text-white sm:text-6xl"
          >
            Tout ce que vous
            <br />
            <span className="text-gold-gradient">devez savoir</span>
          </motion.h2>
        </div>

        <div className="space-y-4">
          {faqItems.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? 'border-gold-500/30 glass-card'
                    : 'border-midnight-600 bg-midnight-800/30 hover:border-midnight-500'
                }`}
              >
                <h3>
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    className="flex w-full items-center justify-between gap-4 px-7 py-6 text-left"
                  >
                    <span className={`font-display text-xl font-medium transition-colors ${isOpen ? 'text-gold-200' : 'text-white'}`}>
                      {item.question}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full transition-colors ${
                        isOpen ? 'bg-gold-gradient text-midnight-950' : 'bg-midnight-700 text-gray-400'
                      }`}
                      aria-hidden="true"
                    >
                      <Plus className="h-4 w-4" strokeWidth={2.5} />
                    </motion.div>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${i}`}
                      role="region"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="px-7 pb-6 text-sm leading-relaxed text-gray-400">{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
