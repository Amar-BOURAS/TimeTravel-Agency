import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Clock } from 'lucide-react';

const navLinks = [
  { label: 'Accueil', href: '#accueil' },
  { label: 'Destinations', href: '#destinations' },
  { label: 'Quiz', href: '#quiz' },
  { label: 'Réservation', href: '#reservation' },
  { label: 'FAQ', href: '#faq' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass border-b border-gold-500/10 py-3' : 'py-6 bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
        {/* Logo */}
        <a href="#accueil" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-gradient shadow-lg shadow-gold-500/30 transition-transform duration-300 group-hover:scale-110">
              <Clock className="h-5 w-5 text-midnight-950" strokeWidth={2.5} aria-hidden="true" />
            </div>
            <div className="absolute inset-0 rounded-full bg-gold-400/40 blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display text-xl font-semibold tracking-wide text-gold-gradient">
              TimeTravel
            </span>
            <span className="font-sans text-[0.65rem] uppercase tracking-[0.25em] text-gray-400">
              Agency
            </span>
          </div>
        </a>

        {/* Desktop nav */}
        <nav aria-label="Navigation principale" className="hidden items-center gap-9 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative text-sm font-medium text-gray-300 transition-colors duration-300 hover:text-gold-300"
            >
              {link.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold-gradient transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <a
          href="#reservation"
          className="btn-gold hidden lg:inline-flex items-center gap-2 rounded-full px-7 py-2.5 text-sm font-semibold shadow-lg shadow-gold-500/20"
        >
          Planifier mon voyage
        </a>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-11 w-11 items-center justify-center rounded-xl text-gold-300 transition-colors hover:bg-midnight-700/50 lg:hidden"
          aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
        >
          <AnimatePresence mode="wait">
            {mobileOpen ? (
              <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <X className="h-6 w-6" />
              </motion.div>
            ) : (
              <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <Menu className="h-6 w-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden glass border-t border-gold-500/10 lg:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-5">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="rounded-xl px-4 py-3.5 text-sm font-medium text-gray-300 transition-colors hover:bg-midnight-700/50 hover:text-gold-300"
                >
                  {link.label}
                </motion.a>
              ))}
              <a
                href="#reservation"
                onClick={() => setMobileOpen(false)}
                className="btn-gold mt-3 rounded-full px-6 py-3.5 text-center text-sm font-semibold"
              >
                Planifier mon voyage
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
