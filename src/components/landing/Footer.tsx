import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const paymentMethods = [
    'Visa', 'Mastercard', 'PayPal', 'UPI', 'Net Banking'
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' }
  ];

  return (
    <footer id="contact" className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-primary-foreground mb-4">E-Ticket</h3>
            <p className="text-primary-foreground/80 mb-6 leading-relaxed">
              E-Ticket is your trusted partner for hassle-free bus travel across the country. 
              We connect you with reliable bus operators, offering secure booking, competitive prices, 
              and exceptional customer service.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-accent" />
                <span className="text-primary-foreground/80">support@e-ticket.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-accent" />
                <span className="text-primary-foreground/80">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-accent" />
                <span className="text-primary-foreground/80">123 Travel Street, City, State 12345</span>
              </div>
            </div>
          </div>

          {/* Useful Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Useful Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">About Us</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">How It Works</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Refund Policy</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Payment Methods */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Payment Methods</h4>
            <div className="grid grid-cols-2 gap-2 mb-6">
              {paymentMethods.map((method, index) => (
                <div key={index} className="bg-primary/20 rounded-lg p-2 text-center text-sm border border-primary-foreground/20">
                  {method}
                </div>
              ))}
            </div>
            
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="bg-primary/20 p-2 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors border border-primary-foreground/20"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-primary-foreground/80 text-sm">
              © 2024 E-Ticket. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Terms</a>
              <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Privacy</a>
              <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}