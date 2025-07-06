import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function FAQ() {
  const faqs = [
    {
      question: "How do I book a bus ticket on E-Ticket?",
      answer: "Booking is simple! Just select your departure city, destination, and travel date on our homepage. Browse available buses, choose your preferred seat, and complete the payment. You'll receive your e-ticket instantly."
    },
    {
      question: "Can I cancel or reschedule my booking?",
      answer: "Yes, you can cancel or reschedule your booking through your account dashboard. Cancellation and rescheduling policies vary by operator, and applicable fees may apply. Refunds are processed within 5-7 business days."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, debit cards, UPI, net banking, and digital wallets. All transactions are secured with industry-standard encryption for your safety."
    },
    {
      question: "How will I receive my ticket?",
      answer: "After successful payment, you'll receive an e-ticket via email and SMS. You can also access your ticket through the My Bookings section in your account. Simply show the QR code on your phone when boarding."
    },
    {
      question: "What if my bus is delayed or cancelled?",
      answer: "We'll notify you immediately via SMS and email about any delays or cancellations. In case of cancellation by the operator, you'll receive a full refund or can reschedule to another available bus at no extra cost."
    },
    {
      question: "Is it safe to book through E-Ticket?",
      answer: "Absolutely! E-Ticket uses bank-level security encryption to protect your personal and payment information. We're partnered with verified bus operators and have served millions of satisfied customers."
    },
    {
      question: "Can I choose my seat?",
      answer: "Yes, you can select your preferred seat from the available options during the booking process. Seat selection is subject to availability and may incur additional charges depending on the bus operator."
    },
    {
      question: "How early should I arrive at the boarding point?",
      answer: "We recommend arriving at least 15-30 minutes before departure time. This ensures you have enough time to locate your bus and complete the boarding process without rushing."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground">
            Find answers to common questions about booking, payments, and travel with E-Ticket.
          </p>
        </div>

        <div className="bg-secondary/30 rounded-2xl p-8 border">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-12 text-center">
          <div className="bg-primary rounded-2xl p-8 text-primary-foreground">
            <h3 className="text-2xl font-bold mb-4">Still Have Questions?</h3>
            <p className="text-primary-foreground/80 mb-6">
              Our customer support team is here to help you 24/7. Get in touch with us for any assistance.
            </p>
            <button className="bg-accent text-accent-foreground px-8 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}