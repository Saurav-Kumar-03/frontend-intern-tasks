"use client";

import { useState } from "react";
import { mockDoctors } from "@/lib/mockData";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Search, Calendar as CalendarIcon, Clock, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function BookingFlow() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isBooked, setIsBooked] = useState(false);

  const filteredDoctors = mockDoctors.filter(doc => 
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    doc.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBooking = () => {
    setIsBooked(true);
    setTimeout(() => {
      // Reset after showing success for a while
      setIsBooked(false);
      setSelectedDoctor(null);
      setSelectedDate(null);
      setSelectedTime(null);
    }, 3000);
  };

  const doctor = mockDoctors.find(d => d.id === selectedDoctor);

  return (
    <div className="space-y-6">
      {!selectedDoctor && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search by name or specialty..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredDoctors.map(doc => (
              <Card key={doc.id} className="cursor-pointer hover:border-primary transition-colors" onClick={() => setSelectedDoctor(doc.id)}>
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={doc.avatar} alt={doc.name} className="w-20 h-20 rounded-full border-4 border-muted" />
                  <div>
                    <h3 className="font-semibold">{doc.name}</h3>
                    <p className="text-sm text-muted-foreground">{doc.specialty}</p>
                  </div>
                  <Button variant="outline" className="w-full">Select Doctor</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      )}

      {selectedDoctor && doctor && !isBooked && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6 max-w-2xl mx-auto">
          <Button variant="ghost" onClick={() => setSelectedDoctor(null)} className="mb-4">← Back to Doctors</Button>
          
          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center gap-4 border-b pb-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={doctor.avatar} alt={doctor.name} className="w-16 h-16 rounded-full" />
                <div>
                  <h3 className="text-xl font-semibold">{doctor.name}</h3>
                  <p className="text-muted-foreground">{doctor.specialty}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium flex items-center gap-2"><CalendarIcon className="w-4 h-4" /> Select Date</h4>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {["Today", "Tomorrow", "In 2 days", "In 3 days"].map(date => (
                    <Button 
                      key={date} 
                      variant={selectedDate === date ? "default" : "outline"} 
                      onClick={() => setSelectedDate(date)}
                    >
                      {date}
                    </Button>
                  ))}
                </div>
              </div>

              {selectedDate && (
                <div className="space-y-4 animate-in fade-in slide-in-from-top-4">
                  <h4 className="font-medium flex items-center gap-2"><Clock className="w-4 h-4" /> Select Time</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {doctor.availability.map(time => (
                      <Button 
                        key={time} 
                        variant={selectedTime === time ? "default" : "outline"} 
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-6 border-t mt-6">
                <Button 
                  className="w-full" 
                  size="lg" 
                  disabled={!selectedDate || !selectedTime}
                  onClick={handleBooking}
                >
                  Confirm Appointment
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      <AnimatePresence>
        {isBooked && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
          >
            <Card className="max-w-md w-full border-success/20 bg-success/5">
              <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
                <CheckCircle className="w-16 h-16 text-success" />
                <h2 className="text-2xl font-bold">Booking Confirmed!</h2>
                <p className="text-muted-foreground">
                  Your appointment with {doctor?.name} is scheduled for {selectedDate} at {selectedTime}.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
