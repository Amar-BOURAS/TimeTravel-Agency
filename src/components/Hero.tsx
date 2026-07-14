import { motion } from 'framer-motion';
import { Compass, Sparkles, ChevronDown } from 'lucide-react';

export default function Hero() {
  return (
    <section
      id="accueil"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Background image with slow cinematic zoom */}
      <div className="absolute inset-0 z-0">
        <motion.img
          src="https://images.pexels.com/photos/110854/pexels-photo-110854.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Ciel étoilé et brumeux évoquant un voyage à travers le temps"
          className="h-full w-full object-cover"
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 12, ease: 'easeOut' }}
        />
        {/* Strong dark overlays for contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-midnight-950/85 via-midnight-950/70 to-midnight-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-midnight-950/90 via-midnight-950/30 to-midnight-950/70" />
        {/* Cinematic vignette */}
        <div className="absolute inset-0 vignette" />
      </div>

      {/* Animated floating particles */}
      <div className="absolute inset-0 z-10 overflow-hidden">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-gold-400/50"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0, 1, 0],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 mx-auto max-w-5xl px-5 text-center sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-gold-500/30 glass px-6 py-2.5"
        >
          <Sparkles className="h-4 w-4 text-gold-400" aria-hidden="true" />
          <span className="text-xs font-medium uppercase tracking-[0.25em] text-gold-200">
            Agence de voyage temporel de luxe
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-display text-6xl font-semibold leading-[1.05] tracking-tight text-white drop-shadow-2xl drop-shadow-black/50 sm:text-7xl md:text-8xl lg:text-9xl"
        >
          Voyagez au-delà
          <br />
          <span className="text-gold-gradient">du temps</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mx-auto mt-8 max-w-xl text-xl text-gray-200 sm:text-2xl"
        >
          Trois époques. Une expérience inoubliable.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="#destinations"
            className="btn-gold group inline-flex w-full items-center justify-center gap-2.5 rounded-full px-9 py-4 text-sm font-semibold shadow-xl shadow-gold-500/20 sm:w-auto"
          >
            <Compass className="h-5 w-5 transition-transform duration-500 group-hover:rotate-180" aria-hidden="true" />
            Explorer les destinations
          </a>
          <a
            href="#quiz"
            className="btn-ghost inline-flex w-full items-center justify-center gap-2 rounded-full px-9 py-4 text-sm font-semibold sm:w-auto"
          >
            Trouver mon époque
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 z-20 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-gold-400/70"
        >
          <span className="text-xs uppercase tracking-[0.25em]">Défiler</span>
          <ChevronDown className="h-5 w-5" aria-hidden="true" />
        </motion.div>
      </motion.div>
    </section>
  );
}
