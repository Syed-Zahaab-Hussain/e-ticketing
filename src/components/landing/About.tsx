import { Bus, Shield, Clock, Users } from 'lucide-react';

export default function About() {
  const features = [
    {
      icon: Bus,
      title: 'Wide Network',
      description: 'Access to hundreds of bus routes across the country with reliable operators.'
    },
    {
      icon: Shield,
      title: 'Secure Booking',
      description: 'Your personal information and payments are protected with industry-standard security.'
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Round-the-clock customer support to assist you with any travel-related queries.'
    },
    {
      icon: Users,
      title: 'Trusted Platform',
      description: 'Join millions of satisfied customers who trust E-Ticket for their travel needs.'
    }
  ];

  return (
    <section id="about" className="py-20 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            About E-Ticket
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            E-Ticket is your trusted companion for hassle-free bus travel. We connect you with 
            reliable bus operators nationwide, making your journey planning simple and secure.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="bg-card rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-card rounded-2xl p-8 md:p-12 shadow-lg border">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-card-foreground mb-4">
                Why Choose E-Ticket?
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                We've revolutionized bus travel booking by bringing all operators under one platform. 
                Whether you're traveling for business or leisure, E-Ticket ensures you get the best 
                routes, competitive prices, and reliable service.
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  Instant booking confirmation
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  Multiple payment options
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  Easy cancellation and refunds
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  Real-time bus tracking
                </li>
              </ul>
            </div>
            <div className="text-center">
              <div className="inline-block bg-primary text-primary-foreground rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold mb-2">1M+</div>
                    <div className="text-sm">Happy Customers</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold mb-2">500+</div>
                    <div className="text-sm">Bus Operators</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold mb-2">5000+</div>
                    <div className="text-sm">Routes</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold mb-2">99%</div>
                    <div className="text-sm">On-Time Performance</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}