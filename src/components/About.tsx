import { motion } from 'framer-motion';
import { Shield, Compass, Sparkles } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Sécurité quantique',
    description:
      "Un champ de stasis protecteur et un protocole de niveau militaire vous accompagnent à chaque instant.",
  },
  {
    icon: Compass,
    title: 'Itinéraires sur mesure',
    description:
      "Chaque voyage est conçu selon vos envies. Nos guides temporels adaptent le parcours à vos rêves.",
  },
  {
    icon: Sparkles,
    title: 'Tenues d\'époque fournies',
    description:
      "Traducteur universel, tenues et kit de survie inclus. Vous arrivez prêt à vivre l'histoire.",
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto mb-20 max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-medium uppercase tracking-[0.35em] text-gold-400"
          >
            Pourquoi Chronos
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 font-display text-5xl font-semibold leading-[1.1] text-white sm:text-6xl"
          >
            L'art de voyager
            <br />
            <span className="text-gold-gradient">dans le temps</span>
          </motion.h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="rounded-2xl border border-midnight-600 glass-card p-8 transition-all duration-500 hover:border-gold-500/30"
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-gold-gradient shadow-lg shadow-gold-500/20">
                <feature.icon className="h-6 w-6 text-midnight-950" strokeWidth={1.5} aria-hidden="true" />
              </div>
              <h3 className="mb-3 font-display text-2xl font-medium text-white">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
