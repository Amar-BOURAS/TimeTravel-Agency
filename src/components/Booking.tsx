import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, MapPin, Calendar, Users, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

type FormData = {
  nom: string;
  email: string;
  destination: string;
  date: string;
  voyageurs: string;
  message: string;
};

type Errors = Partial<Record<keyof FormData, string>>;

const destinations = ['Paris 1889', 'Crétacé', 'Florence 1504'];

const fieldConfig: { field: keyof FormData; label: string; type: string; icon: typeof User; placeholder: string }[] = [
  { field: 'nom', label: 'Nom complet', type: 'text', icon: User, placeholder: 'Votre nom complet' },
  { field: 'email', label: 'Adresse email', type: 'email', icon: Mail, placeholder: 'Votre email' },
  { field: 'voyageurs', label: 'Nombre de voyageurs', type: 'number', icon: Users, placeholder: 'Nombre de voyageurs' },
];

export default function Booking() {
  const [form, setForm] = useState<FormData>({
    nom: '',
    email: '',
    destination: '',
    date: '',
    voyageurs: '',
    message: '',
  });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const e: Errors = {};
    if (!form.nom.trim()) e.nom = 'Veuillez indiquer votre nom';
    if (!form.email.trim()) {
      e.email = 'Veuillez indiquer votre email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = 'Format email invalide';
    }
    if (!form.destination) e.destination = 'Veuillez choisir une destination';
    if (!form.date) e.date = 'Veuillez choisir une date';
    if (!form.voyageurs) e.voyageurs = 'Veuillez indiquer le nombre de voyageurs';
    else if (Number(form.voyageurs) < 1) e.voyageurs = 'Au moins un voyageur requis';
    if (!form.message.trim()) e.message = 'Veuillez ajouter un message';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    if (validate()) {
      setSubmitted(true);
      setForm({ nom: '', email: '', destination: '', date: '', voyageurs: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  const inputClass = (field: keyof FormData) =>
    `w-full rounded-xl border bg-midnight-900/50 px-4 py-3.5 pl-12 text-sm text-white placeholder-gray-500 transition-all focus:outline-none focus:ring-2 ${
      errors[field]
        ? 'border-red-500/50 focus:ring-red-500/20'
        : 'border-midnight-600 focus:border-gold-500/50 focus:ring-gold-500/20'
    }`;

  return (
    <section id="reservation" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <span className="text-xs font-medium uppercase tracking-[0.35em] text-gold-400">
              Réservation
            </span>
            <h2 className="mt-6 font-display text-4xl font-semibold leading-[1.1] text-white sm:text-5xl md:text-6xl">
              Planifiez votre voyage
              <br />
              <span className="text-gold-gradient">à travers le temps</span>
            </h2>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-gray-300">
              Remplissez le formulaire ci-dessous et notre équipe vous recontactera sous 48 heures
              pour finaliser votre itinéraire temporel. Chaque voyage est sur mesure.
            </p>

            <div className="mt-12 space-y-5">
              {[
                { label: 'Réponse sous 48h', value: 'Garanti' },
                { label: 'Annulation', value: "Jusqu'à 30 jours avant" },
                { label: 'Paiement', value: 'En 3 fois sans frais' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between border-b border-midnight-700 pb-4"
                >
                  <span className="text-sm text-gray-400">{item.label}</span>
                  <span className="text-sm font-semibold text-gold-200">{item.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <form
              onSubmit={handleSubmit}
              noValidate
              aria-label="Formulaire de réservation"
              className="rounded-[2rem] border border-midnight-600 glass-card p-6 sm:p-8 md:p-10"
            >
              <div className="space-y-6">
                {fieldConfig.map(({ field, label, type, icon: Icon, placeholder }) => (
                  <div key={field}>
                    <label htmlFor={`field-${field}`} className="sr-only">
                      {label}
                    </label>
                    <div className="relative">
                      <Icon className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" aria-hidden="true" />
                      <input
                        id={`field-${field}`}
                        type={type}
                        min={field === 'voyageurs' ? 1 : undefined}
                        placeholder={placeholder}
                        value={form[field]}
                        onChange={(e) => handleChange(field, e.target.value)}
                        aria-invalid={!!errors[field]}
                        aria-describedby={errors[field] ? `error-${field}` : undefined}
                        className={inputClass(field)}
                      />
                    </div>
                    {errors[field] && (
                      <p id={`error-${field}`} className="mt-2 pl-1 text-xs text-red-400" role="alert">
                        {errors[field]}
                      </p>
                    )}
                  </div>
                ))}

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="field-destination" className="sr-only">
                      Destination
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" aria-hidden="true" />
                      <select
                        id="field-destination"
                        value={form.destination}
                        onChange={(e) => handleChange('destination', e.target.value)}
                        aria-invalid={!!errors.destination}
                        aria-describedby={errors.destination ? 'error-destination' : undefined}
                        className={inputClass('destination')}
                      >
                        <option value="">Destination</option>
                        {destinations.map((d) => (
                          <option key={d} value={d} className="bg-midnight-800">
                            {d}
                          </option>
                        ))}
                      </select>
                    </div>
                    {errors.destination && (
                      <p id="error-destination" className="mt-2 pl-1 text-xs text-red-400" role="alert">
                        {errors.destination}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="field-date" className="sr-only">
                      Date souhaitée
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" aria-hidden="true" />
                      <input
                        id="field-date"
                        type="date"
                        value={form.date}
                        onChange={(e) => handleChange('date', e.target.value)}
                        aria-invalid={!!errors.date}
                        aria-describedby={errors.date ? 'error-date' : undefined}
                        className={inputClass('date')}
                      />
                    </div>
                    {errors.date && (
                      <p id="error-date" className="mt-2 pl-1 text-xs text-red-400" role="alert">
                        {errors.date}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="field-message" className="sr-only">
                    Message
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-4 h-4 w-4 text-gray-500" aria-hidden="true" />
                    <textarea
                      id="field-message"
                      rows={4}
                      placeholder="Votre message, vos attentes, vos rêves..."
                      value={form.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'error-message' : undefined}
                      className={`${inputClass('message')} resize-none pt-3.5`}
                    />
                  </div>
                  {errors.message && (
                    <p id="error-message" className="mt-2 pl-1 text-xs text-red-400" role="alert">
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn-gold group flex w-full items-center justify-center gap-2.5 rounded-xl px-6 py-4 text-sm font-semibold shadow-lg shadow-gold-500/20"
                >
                  <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                  Envoyer ma demande
                </button>
              </div>
            </form>

            <AnimatePresence>
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute -top-4 left-0 right-0 mx-auto flex max-w-sm items-center gap-3 rounded-xl border border-green-500/30 bg-green-500/10 px-5 py-4 backdrop-blur-md"
                  role="status"
                >
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-green-400" aria-hidden="true" />
                  <p className="text-sm text-green-200">
                    Demande envoyée ! Nous vous recontacterons sous 48h.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
