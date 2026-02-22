import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { toast } from 'sonner';

const LOGO_IMAGE = '/logo.png';

// ── QUICK LINKS ──
const quickLinks = [
  { label: 'About Us',  href: '#about' },
  { label: 'Pet Care',  href: '#pet-care' },
  { label: 'Adopt',     href: '/adopt' },
  { label: 'Volunteer', href: '/volunteer' },
  { label: 'Community', href: '/community' },
  { label: 'Donate',    href: '#donate' },
];

// ── UPDATE THESE WITH YOUR REAL SOCIAL LINKS ──
const socialLinks = [
  { icon: Facebook,  label: 'Facebook',  href: 'https://www.facebook.com/AnbuFur' },
  { icon: Twitter,   label: 'Twitter/X', href: 'https://x.com/AnbuFur' },
  { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/AnbuFur' },
  { icon: Linkedin,  label: 'LinkedIn',  href: 'https://www.linkedin.com/company/AnbuFur' },
];

export function Footer() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) { toast.error('Please enter your email address'); return; }
    toast.success("Thank you for subscribing! You'll receive our latest updates.");
    setEmail('');
  };

  const scrollToAnchor = (hash: string) => {
    const el = document.querySelector(hash);
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const handleLink = (href: string) => {
    if (href.startsWith('/')) {
      // page route — navigate and scroll to top
      navigate(href);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // anchor on home page
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => scrollToAnchor(href), 350);
      } else {
        scrollToAnchor(href);
      }
    }
  };

  return (
    <footer className="bg-[#3A2E2A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center">
                <div className="navbar-logo-img-wrap">
                  <img src={LOGO_IMAGE} alt="AnbuFur logo" />
                </div>
              </div>
              <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '1.5rem' }}>
                AnbuFur
              </span>
            </div>
            <p className="text-white/80 mb-4" style={{ fontFamily: 'Inter, sans-serif', lineHeight: 1.6 }}>
              Dedicated to rescuing, rehabilitating, and rehoming stray and abandoned animals. Every paw deserves love and care.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '1.25rem' }}>
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleLink(link.href)}
                    className="text-white/80 hover:text-[#FF914D] transition-colors text-left"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '1.25rem' }}>
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Mail className="w-5 h-5 mt-1 flex-shrink-0" />
                <span className="text-white/80" style={{ fontFamily: 'Inter, sans-serif' }}>info@AnbuFur.org</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-5 h-5 mt-1 flex-shrink-0" />
                <span className="text-white/80" style={{ fontFamily: 'Inter, sans-serif' }}>+91 9XXXX XXXXX</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                <span className="text-white/80" style={{ fontFamily: 'Inter, sans-serif' }}>Tamil Nadu, India</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="mb-4" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '1.25rem' }}>
              Stay Updated
            </h4>
            <p className="text-white/80 mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
              Subscribe to our newsletter for updates and stories
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="flex-1 px-4 py-2 rounded-full bg-white/10 border border-white/20 focus:outline-none focus:border-[#FF914D] text-white placeholder-white/50"
                style={{ fontFamily: 'Inter, sans-serif' }}
              />
              <button type="submit" className="px-4 py-2 bg-[#FF914D] rounded-full hover:bg-[#FF7A2E] transition-all">
                <Mail className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/60" style={{ fontFamily: 'Inter, sans-serif' }}>
            © 2026 AnbuFur. All rights reserved.
          </p>
          <div className="flex gap-4">
            {socialLinks.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#FF914D] transition-all hover:scale-110"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}