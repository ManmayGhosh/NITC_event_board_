import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const events = [
    {
      name: "Tech Fest 2025",
      date: "March 10, 2025",
      time: "10:00 AM - 5:00 PM",
      venue: "Main Auditorium",
      head: "Dr. Ananya Roy",
      banner: "https://images.unsplash.com/photo-1556767576-cfba3cbd1ab7?auto=format&fit=crop&w=800&q=60",
    },
    {
      name: "Cultural Night",
      date: "April 2, 2025",
      time: "6:30 PM - 9:30 PM",
      venue: "Open Air Theatre",
      head: "Prof. Rajesh Kumar",
      banner: "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=800&q=60",
    },
    {
      name: "Startup Conclave",
      date: "May 18, 2025",
      time: "9:00 AM - 4:00 PM",
      venue: "Innovation Centre",
      head: "Mr. Neelesh Bhatia",
      banner: "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?auto=format&fit=crop&w=800&q=60",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center p-5 shadow-sm bg-white">
        <h1 className="text-2xl font-bold text-blue-600 tracking-tight">
          NITC Event Board
        </h1>
        <div className="space-x-3">
          <Button variant="outline">Guest View</Button>
          <Button>Sign In</Button>
        </div>
      </header>

      {/* Event Section */}
      <main className="flex-1 p-6 grid gap-6 md:grid-cols-3 sm:grid-cols-1 justify-center">
        {events.map((event, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
          >
            <Card className="shadow-lg rounded-2xl overflow-hidden bg-white hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                {loading ? (
                  // Skeleton loader
                  <div className="animate-pulse">
                    <div className="h-40 bg-gray-300"></div>
                    <div className="p-4 space-y-3">
                      <div className="h-5 bg-gray-300 w-3/4 rounded"></div>
                      <div className="h-4 bg-gray-300 w-1/2 rounded"></div>
                      <div className="h-4 bg-gray-300 w-2/3 rounded"></div>
                      <div className="h-4 bg-gray-300 w-1/3 rounded"></div>
                    </div>
                  </div>
                ) : (
                  <>
                    <img
                      src={event.banner}
                      alt={event.name}
                      className="h-40 w-full object-cover"
                    />
                    <div className="p-4">
                      <h2 className="text-lg font-semibold text-gray-800">
                        {event.name}
                      </h2>
                      <p className="text-sm text-gray-500">{event.date}</p>
                      <p className="text-sm text-gray-500">{event.time}</p>
                      <p className="text-sm text-gray-500">{event.venue}</p>
                      <p className="text-sm text-gray-500">
                        Head: {event.head}
                      </p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} NITC Event Board. All rights reserved.
      </footer>
    </div>
  );
}
