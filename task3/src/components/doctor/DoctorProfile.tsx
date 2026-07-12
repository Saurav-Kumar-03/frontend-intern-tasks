"use client";

import { mockDoctors } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Star, MessageSquare, Calendar, Video, MapPin, Award } from "lucide-react";

export function DoctorProfile({ doctorId = "D001" }: { doctorId?: string }) {
  const doctor = mockDoctors.find(d => d.id === doctorId) || mockDoctors[0];

  return (
    <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
      {/* Sidebar Profile Info */}
      <Card className="md:col-span-1 border-t-4 border-t-primary">
        <CardContent className="p-6 flex flex-col items-center text-center space-y-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={doctor.avatar} alt={doctor.name} className="w-32 h-32 rounded-full border-4 border-muted shadow-md" />
          
          <div>
            <h2 className="text-2xl font-bold">{doctor.name}</h2>
            <p className="text-primary font-medium">{doctor.specialty}</p>
            <div className="flex items-center justify-center gap-1 mt-2 text-amber-500 font-medium">
              <Star className="w-4 h-4 fill-amber-500" />
              <span>{doctor.rating}</span>
              <span className="text-muted-foreground text-sm font-normal">({doctor.reviews} reviews)</span>
            </div>
          </div>

          <div className="flex gap-2 w-full">
            <Button className="flex-1" gap-2><MessageSquare className="w-4 h-4" /> Message</Button>
            <Button variant="outline" size="icon"><Video className="w-4 h-4 text-primary" /></Button>
          </div>

          <div className="w-full space-y-3 pt-4 border-t text-sm text-left">
            <div className="flex items-center gap-3 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>MedcareX General Hospital, Block A</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <Award className="w-4 h-4" />
              <span>{doctor.experience} Experience</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Area */}
      <div className="md:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>About Doctor</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              {doctor.about}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Availability Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                 <Badge variant="default" className="px-4 py-1 text-sm">Today</Badge>
                 <Badge variant="outline" className="px-4 py-1 text-sm">Tomorrow</Badge>
                 <Badge variant="outline" className="px-4 py-1 text-sm">Wednesday</Badge>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {doctor.availability.map(time => (
                  <Button key={time} variant="outline" className="w-full bg-background hover:bg-primary/5 hover:text-primary hover:border-primary transition-all">
                    {time}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
