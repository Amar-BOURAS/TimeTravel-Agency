import { motion } from 'framer-motion';
import { ShieldCheck, BookOpen, Crown } from 'lucide-react';

const advantages = [
  {
    icon: ShieldCheck,
    title: 'Sécurité temporelle',
    description:
      "Nos ingénieurs quantiques garantissent une stabilité parfaite du continuum. Chaque voyage est encadré par un protocole de sécurité de niveau militaire.",
  },
  {
    icon: BookOpen,
    title: 'Guides historiques experts',
    description:
      "Des historiens passionnés vous accompagnent à chaque étape. Ils connaissent chaque secret, chaque ruelle, chaque moment clé de l'époque que vous visitez.",
  },
  {
    icon: Crown,
    title: 'Expérience de voyage premium',
    description:
      "Hébergements d'exception, transport privé à travers les âges, gastronomie d'époque. Le luxe n'a pas de limite, pas même celle du temps.",
  },
];

export default function About() {
  return (
    <section className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Intro text */}
        <div className="mx-auto mb-24 max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-medium uppercase tracking-[0.35em] text-gold-400"
          >
            Notre agence
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
            <span className="text-gold-gradient">à travers les siècles</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-gray-300"
          >
            Depuis plus de cinquante ans — ou peut-être depuis toujours —, TimeTravel Agency
            conçoit des expériences temporelles d'exception. Nous ouvrons les portes d'époques
            mythiques, de la préhistoire à la Renaissance, pour vous offrir un voyage où chaque
            instant devient mémoire.
          </motion.p>
        </div>

        {/* Advantages */}
        <div className="grid gap-7 md:grid-cols-3">
          {advantages.map((adv, i) => (
            <motion.div
              key={adv.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group relative overflow-hidden rounded-3xl border border-midnight-600 glass-card p-10 transition-all duration-500 hover:border-gold-500/40"
            >
              {/* Glow effect */}
              <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gold-500/5 blur-3xl transition-all duration-500 group-hover:bg-gold-500/15" />

              <div className="relative">
                <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-midnight-600 to-midnight-800 ring-1 ring-gold-500/20 transition-all duration-500 group-hover:ring-gold-500/50 group-hover:scale-110">
                  <adv.icon className="h-8 w-8 text-gold-400" strokeWidth={1.5} aria-hidden="true" />
                </div>
                <h3 className="mb-4 font-display text-3xl font-semibold text-white">
                  {adv.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-400">{adv.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
