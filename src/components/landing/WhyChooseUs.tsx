import { Shield, Clock, DollarSign, Headphones, MapPin, Star } from 'lucide-react';

export default function WhyChooseUs() {
  const benefits = [
    {
      icon: Shield,
      title: 'Secure & Safe',
      description: 'Your data and payments are protected with bank-level security encryption.'
    },
    {
      icon: Clock,
      title: 'Real-Time Updates',
      description: 'Get live updates on bus locations, delays, and schedule changes.'
    },
    {
      icon: DollarSign,
      title: 'Best Prices',
      description: 'Compare prices across operators and find the best deals for your journey.'
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Our customer support team is available round the clock to assist you.'
    },
    {
      icon: MapPin,
      title: 'Extensive Network',
      description: 'Access to thousands of routes connecting major cities and towns.'
    },
    {
      icon: Star,
      title: 'Trusted by Millions',
      description: 'Join our community of satisfied travelers who trust E-Ticket.'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-secondary/30 to-secondary/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose E-Ticket?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're committed to making your bus travel experience seamless, 
            secure, and convenient. Here's what sets us apart from the rest.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow group border">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-card-foreground mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-card rounded-2xl p-8 md:p-12 shadow-lg border">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-card-foreground mb-6">
                Experience the Difference
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-muted-foreground">Instant confirmation and e-tickets</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-muted-foreground">Easy cancellation and refund process</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-muted-foreground">Mobile-friendly booking platform</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-muted-foreground">Multiple payment options available</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-primary to-primary/90 rounded-2xl p-8 text-primary-foreground">
                <div className="text-4xl font-bold mb-2">4.8/5</div>
                <div className="text-primary-foreground/80 mb-4">Average Rating</div>
                <div className="flex justify-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current text-accent" />
                  ))}
                </div>
                <div className="text-sm text-primary-foreground/80">
                  Based on 50,000+ customer reviews
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}