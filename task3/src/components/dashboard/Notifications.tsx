"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Bell, AlertTriangle, Info } from "lucide-react";
import { motion } from "framer-motion";

export function Notifications() {
  const notifications = [
    { id: 1, type: "alert", message: "Low stock on vaccines", icon: AlertTriangle, color: "text-red-500", bg: "bg-red-500/10" },
    { id: 2, type: "reminder", message: "Dr. Singh's meeting at 2 PM", icon: Bell, color: "text-amber-500", bg: "bg-amber-500/10" },
    { id: 3, type: "info", message: "System update scheduled for midnight", icon: Info, color: "text-blue-500", bg: "bg-blue-500/10" },
  ];

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="w-5 h-5" /> Notifications
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {notifications.map((notif, idx) => (
          <motion.div 
            key={notif.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="flex items-start gap-3"
          >
            <div className={`p-2 rounded-full ${notif.bg} ${notif.color} shrink-0`}>
              <notif.icon className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-medium leading-none mt-1">{notif.message}</p>
              <p className="text-xs text-muted-foreground mt-1 text-transform capitalize">{notif.type}</p>
            </div>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
}
