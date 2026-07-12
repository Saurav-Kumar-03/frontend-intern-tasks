"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { mockPatients } from "@/lib/mockData";
import { User } from "lucide-react";
import { motion } from "framer-motion";

export function PatientList() {
  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle>Recent Patients</CardTitle>
        <CardDescription>
          Overview of recently visited patients.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockPatients.map((patient, idx) => (
            <motion.div 
              key={patient.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-primary/10 rounded-full text-primary">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium">{patient.name}</h4>
                  <p className="text-sm text-muted-foreground">ID: {patient.id} • Age: {patient.age}</p>
                </div>
              </div>
              <div className="text-right">
                <Badge variant={patient.status === "Active" ? "success" : "secondary"}>
                  {patient.status}
                </Badge>
                <p className="text-xs text-muted-foreground mt-1">Last visit: {patient.lastVisit}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
