"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { mockAppointments } from "@/lib/mockData";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { motion } from "framer-motion";

export function UpcomingAppointments() {
  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle>Upcoming Appointments</CardTitle>
        <CardDescription>
          Today's scheduled patient visits.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockAppointments.map((apt, idx) => (
            <motion.div 
              key={apt.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-full text-primary">
                  <CalendarIcon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium text-base">{apt.patientName}</h4>
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                    <Clock className="w-3 h-3" /> {apt.time} • {apt.doctor}
                  </p>
                </div>
              </div>
              <div className="text-right flex flex-col items-end gap-2">
                <Badge variant={apt.status === "Completed" ? "secondary" : "default"}>
                  {apt.status}
                </Badge>
                <span className="text-xs text-muted-foreground font-medium">{apt.type}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
