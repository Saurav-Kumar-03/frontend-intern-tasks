import { DoctorProfile } from "@/components/doctor/DoctorProfile";

export default function DoctorPage() {
  return (
    <div className="flex flex-col gap-6 p-6 md:p-10 max-w-7xl mx-auto">
      <div className="flex flex-col gap-2 mb-4">
        <h1 className="text-3xl font-bold tracking-tight">Doctor Profile</h1>
        <p className="text-muted-foreground">Professional details and availability.</p>
      </div>
      
      <DoctorProfile />
    </div>
  );
}
