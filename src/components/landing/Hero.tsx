import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function Hero() {
  const [date, setDate] = useState<Date>();
  const [fromCity, setFromCity] = useState<string>("");
  const [toCity, setToCity] = useState<string>("");
  const navigate = useNavigate();

  const cities = [
    "New York",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Phoenix",
    "Philadelphia",
    "San Antonio",
    "San Diego",
    "Dallas",
    "San Jose",
  ];

  const handleSearch = () => {
    if (!fromCity || !toCity || !date) {
      // You could add a toast notification here for better UX
      alert("Please select departure city, arrival city, and travel date.");
      return;
    }

    // Create search parameters
    const searchParams = new URLSearchParams({
      from: fromCity,
      to: toCity,
      date: format(date, "yyyy-MM-dd"),
    });

    // Navigate to search results page
    navigate(`/search-results?${searchParams.toString()}`);
  };

  return (
    <section
      id="home"
      className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/80 min-h-screen flex items-center"
    >
      {/* Background Image Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className='absolute inset-0 bg-[url(&apos;data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E&apos;)] bg-repeat'></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Hero Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
              Your Journey
              <span className="text-accent"> Starts Here</span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/80 mb-8 leading-relaxed">
              Book your bus tickets online with E-Ticket. Fast, secure, and
              convenient travel booking at your fingertips.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-4 text-lg"
              >
                Get Started
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground text-primary hover:bg-primary-foreground hover:text-primary px-8 py-4 text-lg"
              >
                Learn More
              </Button>
            </div>
          </div>

          {/* Right Column - Search Form */}
          <div className="bg-card rounded-2xl shadow-2xl p-8 border">
            <h2 className="text-2xl font-bold text-card-foreground mb-6 text-center">
              Find Your Perfect Trip
            </h2>

            <div className="space-y-4">
              {/* Departure City */}
              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">
                  From
                </label>
                <Select value={fromCity} onValueChange={setFromCity}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select departure city" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Arrival City */}
              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">
                  To
                </label>
                <Select value={toCity} onValueChange={setToCity}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select arrival city" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities
                      .filter((city) => city !== fromCity)
                      .map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Travel Date */}
              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">
                  Travel Date
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Search Button */}
              <Button
                className="w-full py-3 mt-6"
                onClick={handleSearch}
                disabled={!fromCity || !toCity || !date}
              >
                <Search className="mr-2 h-5 w-5" />
                Search Buses
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
