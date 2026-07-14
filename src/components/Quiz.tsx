import { motion } from 'framer-motion';
import { Play, Hourglass } from 'lucide-react';

export default function Quiz() {
  return (
    <section id="quiz" className="relative py-28 sm:py-36">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[2rem] border border-gold-500/20 glass-card p-12 text-center sm:p-20"
        >
          {/* Floating hourglass */}
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="mx-auto mb-10 flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-gold-400/20 to-gold-600/10 ring-1 ring-gold-500/30"
          >
            <Hourglass className="h-12 w-12 text-gold-400" strokeWidth={1.5} aria-hidden="true" />
          </motion.div>

          <span className="text-xs font-medium uppercase tracking-[0.35em] text-gold-400">
            Test de personnalité
          </span>
          <h2 className="mt-6 font-display text-5xl font-semibold leading-[1.1] text-white sm:text-6xl">
            Quel voyageur temporel
            <br />
            <span className="text-gold-gradient">êtes-vous ?</span>
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-gray-300">
            Aventurier intrépide, esthète de la Renaissance ou explorateur des temps anciens ?
            Répondez à quelques questions et découvrez l'époque qui vous ressemble.
          </p>

          <button aria-label="Commencer le quiz temporel" className="btn-gold group mt-12 inline-flex items-center gap-2.5 rounded-full px-9 py-4 text-sm font-semibold shadow-xl shadow-gold-500/20">
            <Play className="h-5 w-5 fill-midnight-950 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
            Commencer le quiz
          </button>
        </motion.div>
      </div>
    </section>
  );
}
