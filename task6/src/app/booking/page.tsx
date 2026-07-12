import { BookingFlow } from "@/components/booking/BookingFlow";

export default function BookingPage() {
  return (
    <div className="flex flex-col gap-6 p-6 md:p-10 max-w-7xl mx-auto">
      <div className="flex flex-col gap-2 mb-4">
        <h1 className="text-3xl font-bold tracking-tight">Book an Appointment</h1>
        <p className="text-muted-foreground">Find a doctor and schedule your visit.</p>
      </div>
      
      <BookingFlow />
    </div>
  );
}
