import { StatCards } from "@/components/dashboard/StatCards";
import { PatientList } from "@/components/dashboard/PatientList";
import { Timeline } from "@/components/dashboard/Timeline";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6 p-6 md:p-10 max-w-7xl mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Patient Dashboard</h1>
        <p className="text-muted-foreground">Overview of healthcare statistics and recent activities.</p>
      </div>
      
      {/* Module D: Healthcare Statistics Section */}
      <StatCards />

      {/* Module A: Patient Dashboard Content */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <PatientList />
        <Timeline />
      </div>
    </div>
  );
}
