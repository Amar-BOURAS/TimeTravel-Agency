import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, RotateCcw } from 'lucide-react';

type Question = {
  text: string;
  options: { label: string; value: string }[];
};

const questions: Question[] = [
  {
    text: 'Quelle ambiance vous attire le plus ?',
    options: [
      { label: 'L\'effervescence urbaine', value: 'paris' },
      { label: 'La nature sauvage', value: 'cretace' },
      { label: 'L\'art et la culture', value: 'florence' },
    ],
  },
  {
    text: 'Quel type d\'expérience recherchez-vous ?',
    options: [
      { label: 'Assister à un événement historique', value: 'paris' },
      { label: 'Voir des créatures disparues', value: 'cretace' },
      { label: 'Rencontrer des génies artistiques', value: 'florence' },
    ],
  },
  {
    text: 'Quelle époque vous fascine le plus ?',
    options: [
      { label: 'La Belle Époque', value: 'paris' },
      { label: 'La préhistoire', value: 'cretace' },
      { label: 'La Renaissance', value: 'florence' },
    ],
  },
];

const results: Record<string, { title: string; description: string }> = {
  paris: {
    title: 'Paris 1889',
    description: "L'Exposition Universelle vous attend ! Contemplez la Tour Eiffel naissante et vivez la Belle Époque.",
  },
  cretace: {
    title: 'Crétacé',
    description: 'Le règne des géants vous appelle ! Observez les dinosaures dans leur habitat naturel.',
  },
  florence: {
    title: 'Florence 1504',
    description: "L'apogée de la Renaissance ! Croisez Michel-Ange achevant son David.",
  },
};

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      setShowResult(true);
    }
  };

  const reset = () => {
    setCurrent(0);
    setAnswers([]);
    setShowResult(false);
  };

  const winningValue = () => {
    const counts: Record<string, number> = {};
    answers.forEach((a) => { counts[a] = (counts[a] || 0) + 1; });
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
  };

  const result = showResult ? results[winningValue()] : null;

  return (
    <section id="quiz" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-2xl px-5 sm:px-8">
        <div className="mb-16 text-center">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-medium uppercase tracking-[0.35em] text-gold-400"
          >
            Quiz temporel
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 font-display text-5xl font-semibold leading-[1.1] text-white sm:text-6xl"
          >
            Quelle époque
            <br />
            <span className="text-gold-gradient">est faite pour vous ?</span>
          </motion.h2>
        </div>

        <div className="rounded-3xl border border-midnight-600 glass-card p-8 sm:p-12">
          <AnimatePresence mode="wait">
            {!showResult ? (
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
              >
                <div className="mb-6 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-gold-400" aria-hidden="true" />
                  <span className="text-xs uppercase tracking-wider text-gold-400">
                    Question {current + 1} / {questions.length}
                  </span>
                </div>
                <h3 className="mb-8 font-display text-2xl font-medium text-white">
                  {questions[current].text}
                </h3>
                <div className="space-y-3">
                  {questions[current].options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleAnswer(option.value)}
                      className="group flex w-full items-center justify-between rounded-xl border border-midnight-600 bg-midnight-800/40 px-5 py-4 text-left text-sm text-gray-300 transition-all hover:border-gold-500/40 hover:text-white"
                    >
                      {option.label}
                      <ArrowRight className="h-4 w-4 text-gray-600 transition-all group-hover:translate-x-1 group-hover:text-gold-400" aria-hidden="true" />
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <span className="text-xs uppercase tracking-[0.2em] text-gold-400">
                  Votre destination idéale
                </span>
                <h3 className="mt-4 font-display text-4xl font-semibold text-gold-gradient">
                  {result!.title}
                </h3>
                <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-gray-300">
                  {result!.description}
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <a
                    href="#reservation"
                    className="btn-gold inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
                  >
                    Réserver ce voyage
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                  <button
                    onClick={reset}
                    className="inline-flex items-center gap-2 rounded-full border border-midnight-600 px-6 py-3 text-sm font-semibold text-gray-300 transition-all hover:border-gold-500/40 hover:text-gold-300"
                  >
                    <RotateCcw className="h-4 w-4" aria-hidden="true" />
                    Recommencer
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
