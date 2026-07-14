import { motion } from 'framer-motion';
import { Clock, ArrowRight, MapPin } from 'lucide-react';

const destinations = [
  {
    title: 'Paris 1889',
    subtitle: "L'Exposition Universelle",
    description:
      "Vivez l'effervescence de la Belle Époque parisienne. Contemplez la Tour Eiffel naissante, flânez sur les Grands Boulevards et assistez à l'inauguration d'une époque qui a redéfini l'élégance.",
    highlights: ['Exposition Universelle', 'Tour Eiffel', 'Belle Époque'],
    duration: '5 jours',
    price: '8 900',
    image: '/images/paris-1889.png',
  },
  {
    title: 'Crétacé',
    subtitle: 'Le règne des géants',
    description:
      "Remontez 66 millions d'années en arrière. Marchez dans une jungle préhistorique grouillante de vie, observez les dinosaures dans leur habitat naturel et ressentez la puissance des volcans en activité.",
    highlights: ['Dinosaures', 'Jungle préhistorique', 'Volcans'],
    duration: '4 jours',
    price: '12 500',
    image: '/images/cretace.png',
  },
  {
    title: 'Florence 1504',
    subtitle: "L'apogée de la Renaissance",
    description:
      "Plongez au cœur de la Renaissance italienne. Croisez Michel-Ange achevant son David, admirez la coupole du Duomo de Brunelleschi et imprégnez-vous de l'effervescence artistique qui a changé le monde.",
    highlights: ['Renaissance', 'Michel-Ange', 'Duomo'],
    duration: '5 jours',
    price: '9 800',
    image: '/images/florence-1504.png',
  },
];

export default function Destinations() {
  return (
    <section id="destinations" className="relative py-28 sm:py-36">
      <div className="mx-auto mb-20 max-w-3xl px-5 text-center sm:px-8">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs font-medium uppercase tracking-[0.35em] text-gold-400"
        >
          Nos destinations
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 font-display text-5xl font-semibold leading-[1.1] text-white sm:text-6xl"
        >
          Trois époques,
          <br />
          <span className="text-gold-gradient">trois rêves</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 text-lg text-gray-300"
        >
          Chaque destination est une fenêtre ouverte sur un moment charnière de l'humanité.
        </motion.p>
      </div>

      <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-3">
        {destinations.map((dest, i) => (
          <motion.article
            key={dest.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="group relative overflow-hidden rounded-3xl border border-midnight-600 glass-card transition-all duration-500 hover:border-gold-500/40 hover:shadow-2xl hover:shadow-gold-500/10"
          >
            <div className="relative h-72 overflow-hidden">
              <img
                src={dest.image}
                alt={`Illustration du voyage temporel : ${dest.title} — ${dest.subtitle}`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight-950 via-midnight-950/40 to-transparent" />
              <div className="absolute right-4 top-4 rounded-full glass border border-gold-500/30 px-4 py-1.5">
                <span className="text-xs font-semibold text-gold-200">
                  À partir de {dest.price} €
                </span>
              </div>
              <div className="absolute bottom-5 left-5 right-5">
                <span className="text-xs uppercase tracking-[0.2em] text-gold-300">
                  {dest.subtitle}
                </span>
                <h3 className="mt-1 font-display text-4xl font-semibold text-white drop-shadow-lg drop-shadow-black/50">
                  {dest.title}
                </h3>
              </div>
            </div>

            <div className="p-8">
              <p className="mb-6 text-sm leading-relaxed text-gray-300">{dest.description}</p>

              <div className="mb-6 flex flex-wrap gap-2">
                {dest.highlights.map((h) => (
                  <span
                    key={h}
                    className="inline-flex items-center gap-1.5 rounded-full border border-midnight-600 bg-midnight-700/40 px-3.5 py-1.5 text-xs text-gray-300 transition-colors group-hover:border-gold-500/20"
                  >
                    <MapPin className="h-3 w-3 text-gold-400" aria-hidden="true" />
                    {h}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between border-t border-midnight-600 pt-6">
                <span className="inline-flex items-center gap-2 text-sm text-gray-300">
                  <Clock className="h-4 w-4 text-gold-400" aria-hidden="true" />
                  {dest.duration}
                </span>
                <button aria-label={`Découvrir le voyage ${dest.title}`} className="btn-gold group/btn inline-flex items-center gap-1.5 rounded-full px-6 py-2.5 text-sm font-semibold">
                  Découvrir
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" aria-hidden="true" />
                </button>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
