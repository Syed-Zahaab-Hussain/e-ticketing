import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-background shadow-lg sticky top-0 z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="text-2xl font-bold text-primary hover:text-primary/80 transition-colors">
                E-Ticket
              </Link>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('home')}
              className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              FAQs
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Contact
            </button>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link to="/register">Get Started</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <button
                onClick={() => scrollToSection('home')}
                className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-secondary rounded-md transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-secondary rounded-md transition-colors"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('faq')}
                className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-secondary rounded-md transition-colors"
              >
                FAQs
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-secondary rounded-md transition-colors"
              >
                Contact
              </button>
              <div className="pt-4 pb-3 border-t border-border">
                <div className="flex items-center px-3 space-x-3">
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button className="w-full" asChild>
                    <Link to="/register">Get Started</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}