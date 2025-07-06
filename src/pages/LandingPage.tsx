import Hero from '@/components/landing/Hero';
import Navbar from '@/components/landing/Navbar';
import About from '@/components/landing/About';
import BookingSteps from '@/components/landing/BookingSteps';
import WhyChooseUs from '@/components/landing/WhyChooseUs';
import FAQ from '@/components/landing/FAQ';
import Footer from '@/components/landing/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <BookingSteps />
      <WhyChooseUs />
      <FAQ />
      <Footer />
    </div>
  );
}