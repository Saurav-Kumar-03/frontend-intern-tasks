import { MultiStepForm } from "@/components/forms/MultiStepForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4 md:p-8 font-[family-name:var(--font-geist-sans)]">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            Join Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Team</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Fill out the form below to apply. Our smart form will guide you through the process effortlessly.
          </p>
        </div>
        
        <MultiStepForm />
      </div>
    </main>
  );
}
