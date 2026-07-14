import { Clock, Instagram, Twitter, Facebook, Linkedin } from 'lucide-react';

const quickLinks = [
  { label: 'Accueil', href: '#accueil' },
  { label: 'Destinations', href: '#destinations' },
  { label: 'Quiz', href: '#quiz' },
  { label: 'Réservation', href: '#reservation' },
  { label: 'FAQ', href: '#faq' },
];

const teamMembers = [
  'Alice Moreau',
  'Baptiste Lefèvre',
  'Chloé Dubois',
  'Damien Rousseau',
];

const socials = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-midnight-700 bg-midnight-900/40">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <h2 id="footer-heading" className="sr-only">Pied de page</h2>
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a href="#accueil" className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-gradient shadow-lg shadow-gold-500/20">
                <Clock className="h-5 w-5 text-midnight-950" strokeWidth={2.5} aria-hidden="true" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display text-xl font-semibold text-gold-gradient">
                  TimeTravel
                </span>
                <span className="font-sans text-[0.65rem] uppercase tracking-[0.25em] text-gray-400">
                  Agency
                </span>
              </div>
            </a>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-gray-400">
              L'art de voyager à travers les siècles. Trois époques, une expérience inoubliable.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-gold-400">
              Liens rapides
            </h3>
            <ul className="space-y-3.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-gold-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Team */}
          <div>
            <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-gold-400">
              L'équipe
            </h3>
            <ul className="space-y-3.5">
              {teamMembers.map((name) => (
                <li key={name} className="text-sm text-gray-400">
                  {name}
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-gold-400">
              Suivez-nous
            </h3>
            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-midnight-600 bg-midnight-800/40 text-gray-400 transition-all hover:border-gold-500/40 hover:text-gold-300 hover:scale-110"
                >
                  <s.icon className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-midnight-700 pt-8 sm:flex-row">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} TimeTravel Agency — Tous droits réservés.
          </p>
          <p className="text-xs text-gray-500">
            Projet pédagogique — Ynov Campus Bordeaux
          </p>
        </div>
      </div>
    </footer>
  );
}
