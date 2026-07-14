import { Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-midnight-700 py-12">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-gradient">
              <Clock className="h-4 w-4 text-midnight-950" strokeWidth={2} aria-hidden="true" />
            </div>
            <span className="font-display text-xl font-semibold text-white">Chronos Voyages</span>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-6">
            <a href="#destinations" className="text-sm text-gray-400 transition-colors hover:text-gold-300">Destinations</a>
            <a href="#quiz" className="text-sm text-gray-400 transition-colors hover:text-gold-300">Quiz</a>
            <a href="#reservation" className="text-sm text-gray-400 transition-colors hover:text-gold-300">Réservation</a>
            <a href="#faq" className="text-sm text-gray-400 transition-colors hover:text-gold-300">FAQ</a>
          </nav>

          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Chronos Voyages. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
