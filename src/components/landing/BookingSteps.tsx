import { Search, CreditCard, Ticket } from "lucide-react";

export default function BookingSteps() {
  const steps = [
    {
      icon: Search,
      title: "Search",
      description:
        "Find your perfect bus route by selecting departure city, destination, and travel date.",
      step: "01",
    },
    {
      icon: CreditCard,
      title: "Select & Pay",
      description:
        "Choose your preferred seat and complete secure payment with multiple payment options.",
      step: "02",
    },
    {
      icon: Ticket,
      title: "Travel",
      description:
        "Receive your digital ticket with QR code and enjoy a comfortable journey.",
      step: "03",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Booking in Just 3 Steps
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience the simplest way to book your bus tickets online. Our
            streamlined process gets you from search to boarding in minutes.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center group">
              <div className="relative mb-8">
                {/* Icon Container */}
                <div className="bg-gradient-to-br from-secondary/50 to-secondary rounded-2xl p-8 group-hover:shadow-lg transition-shadow border">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-full mb-6 group-hover:scale-110 transition-transform">
                    <step.icon className="h-10 w-10 text-primary-foreground" />
                  </div>
                </div>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-px bg-border transform -translate-y-1/2"></div>
                )}
              </div>

              <h3 className="text-2xl font-semibold text-foreground mb-4">
                {step.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary to-primary/90 rounded-2xl p-8 text-primary-foreground">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Start Your Journey?
            </h3>
            <p className="text-primary-foreground/80 mb-6">
              Join thousands of travelers who choose E-Ticket for their bus
              travel needs.
            </p>
            <button className="bg-accent text-accent-foreground px-8 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors">
              Book Your First Trip
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
