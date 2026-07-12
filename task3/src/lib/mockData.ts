export const mockPatients = [
  { id: "P001", name: "Sarah Jenkins", age: 34, lastVisit: "2026-06-15", condition: "Healthy", status: "Active" },
  { id: "P002", name: "Michael Chang", age: 45, lastVisit: "2026-07-02", condition: "Hypertension", status: "Active" },
  { id: "P003", name: "Emma Rodriguez", age: 28, lastVisit: "2026-05-20", condition: "Asthma", status: "Inactive" },
];

export const mockAppointments = [
  { id: "A001", patientName: "Sarah Jenkins", date: "2026-07-15", time: "10:00 AM", doctor: "Dr. Alan Smith", type: "General Checkup", status: "Upcoming" },
  { id: "A002", patientName: "Michael Chang", date: "2026-07-16", time: "02:30 PM", doctor: "Dr. Emily Chen", type: "Cardiology Review", status: "Upcoming" },
  { id: "A003", patientName: "John Doe", date: "2026-07-10", time: "11:15 AM", doctor: "Dr. Alan Smith", type: "Follow-up", status: "Completed" },
];

export const mockDoctors = [
  {
    id: "D001",
    name: "Dr. Alan Smith",
    specialty: "General Practice",
    experience: "15 Years",
    rating: 4.8,
    reviews: 124,
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    about: "Experienced general practitioner dedicated to holistic patient care and preventative medicine.",
    availability: ["09:00 AM", "10:00 AM", "11:30 AM", "02:00 PM", "04:00 PM"]
  },
  {
    id: "D002",
    name: "Dr. Emily Chen",
    specialty: "Cardiology",
    experience: "12 Years",
    rating: 4.9,
    reviews: 89,
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    about: "Specializes in cardiovascular health with a focus on non-invasive diagnostics.",
    availability: ["01:00 PM", "02:30 PM", "03:30 PM", "05:00 PM"]
  },
  {
    id: "D003",
    name: "Dr. Marcus Johnson",
    specialty: "Neurology",
    experience: "20 Years",
    rating: 4.7,
    reviews: 210,
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    about: "Expert in neurodegenerative disorders and migraine management.",
    availability: ["10:00 AM", "11:00 AM", "01:00 PM"]
  }
];

export const mockStats = {
  totalPatients: 1245,
  activeDoctors: 48,
  totalAppointments: 3892,
  emergencyCases: 15,
  revenue: "$45,200",
  growth: {
    patients: "+12%",
    appointments: "+8%",
    revenue: "+15%"
  }
};

export const mockTimeline = [
  { id: "T1", time: "10:30 AM", event: "Patient Sarah Jenkins checked in." },
  { id: "T2", time: "09:15 AM", event: "Dr. Chen updated medical records for Michael Chang." },
  { id: "T3", time: "Yesterday", event: "System maintenance completed successfully." }
];
