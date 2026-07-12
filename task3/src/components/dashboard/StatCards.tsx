"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Users, UserCheck, Calendar, AlertCircle, DollarSign } from "lucide-react";
import { mockStats } from "@/lib/mockData";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export function StatCards() {
  const stats = [
    { title: "Total Patients", value: mockStats.totalPatients, icon: Users, growth: mockStats.growth.patients, color: "text-blue-500" },
    { title: "Active Doctors", value: mockStats.activeDoctors, icon: UserCheck, growth: null, color: "text-emerald-500" },
    { title: "Appointments", value: mockStats.totalAppointments, icon: Calendar, growth: mockStats.growth.appointments, color: "text-purple-500" },
    { title: "Emergency Cases", value: mockStats.emergencyCases, icon: AlertCircle, growth: null, color: "text-red-500" },
    { title: "Revenue", value: mockStats.revenue, icon: DollarSign, growth: mockStats.growth.revenue, color: "text-amber-500" }
  ];

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid gap-4 md:grid-cols-2 lg:grid-cols-5"
    >
      {stats.map((stat, i) => (
        <motion.div key={i} variants={item}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              {stat.growth && (
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.growth} from last month
                </p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
