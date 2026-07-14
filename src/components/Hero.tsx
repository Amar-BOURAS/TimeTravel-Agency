import { motion } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-midnight-950 via-midnight-900 to-midnight-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.08),transparent_60%)]" />

      <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-gold-gradient shadow-2xl shadow-gold-500/30"
        >
          <Clock className="h-10 w-10 text-midnight-950" strokeWidth={1.5} aria-hidden="true" />
        </motion.div>

        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xs font-medium uppercase tracking-[0.35em] text-gold-400"
        >
          Agence de voyages temporels
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 font-display text-6xl font-semibold leading-[1.05] text-white sm:text-7xl md:text-8xl"
        >
          Voyagez à travers
          <br />
          <span className="text-gold-gradient">le temps</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-gray-300"
        >
          Remontez aux dinosaures, assistez à la naissance de la Renaissance ou
          contemplez la Tour Eiffel naissante. Trois époques, trois rêves, une
          aventure inoubliable.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="#destinations"
            className="btn-gold group inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-semibold"
          >
            Découvrir les destinations
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </a>
          <a
            href="#quiz"
            className="inline-flex items-center gap-2 rounded-full border border-midnight-600 px-8 py-4 text-sm font-semibold text-gray-300 transition-all hover:border-gold-500/40 hover:text-gold-300"
          >
            Faire le quiz
          </a>
        </motion.div>
      </div>
    </section>
  );
}
