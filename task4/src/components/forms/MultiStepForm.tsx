"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, FormValues } from "@/lib/validation/formSchema";
import { ProgressIndicator } from "./ProgressIndicator";
import { PersonalDetailsStep } from "./PersonalDetailsStep";
import { ContactInfoStep } from "./ContactInfoStep";
import { SkillsExperienceStep } from "./SkillsExperienceStep";
import { FinalReviewStep } from "./FinalReviewStep";
import { AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

const steps = [
  { id: "personal", title: "Personal", fields: ["firstName", "lastName", "dateOfBirth"] as const },
  { id: "contact", title: "Contact", fields: ["email", "phone", "address"] as const },
  { id: "skills", title: "Skills", fields: ["role", "yearsOfExperience", "portfolioUrl"] as const },
  { id: "review", title: "Review" },
];

export function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onTouched",
    defaultValues: {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      email: "",
      phone: "",
      address: "",
      role: "",
      yearsOfExperience: "",
      portfolioUrl: "",
    },
  });

  const nextStep = async () => {
    const fields = steps[currentStep].fields;
    
    if (fields) {
      const output = await form.trigger(fields as unknown as (keyof FormValues)[], { shouldFocus: true });
      if (!output) return;
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep((step) => step + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((step) => step - 1);
    }
  };

  const onSubmit = async (data: FormValues) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log(data);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center p-10 space-y-6 bg-white rounded-3xl shadow-xl max-w-2xl w-full mx-auto text-center border border-gray-100">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Application Submitted!</h2>
        <p className="text-gray-500 max-w-sm">
          Thank you for applying. We have received your information and will be in touch shortly.
        </p>
        <button
          onClick={() => {
            form.reset();
            setCurrentStep(0);
            setIsSuccess(false);
          }}
          className="px-8 py-3 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition-colors mt-4"
        >
          Submit Another
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl max-w-3xl w-full mx-auto overflow-hidden border border-gray-100 flex flex-col min-h-[600px]">
      <div className="p-8 md:p-12 flex-grow flex flex-col">
        <ProgressIndicator currentStep={currentStep} steps={steps} />

        <div className="mt-8 flex-grow">
          <form onSubmit={form.handleSubmit(onSubmit)} className="h-full flex flex-col justify-between">
            <div className="flex-grow">
              <AnimatePresence mode="wait">
                {currentStep === 0 && <PersonalDetailsStep key="step1" form={form} />}
                {currentStep === 1 && <ContactInfoStep key="step2" form={form} />}
                {currentStep === 2 && <SkillsExperienceStep key="step3" form={form} />}
                {currentStep === 3 && <FinalReviewStep key="step4" form={form} />}
              </AnimatePresence>
            </div>

            <div className="mt-12 flex justify-between items-center pt-6 border-t border-gray-100">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 0}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all ${
                  currentStep === 0
                    ? "opacity-0 pointer-events-none"
                    : "text-gray-600 hover:bg-gray-100 bg-gray-50"
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              {currentStep < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center space-x-2 px-8 py-3 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition-all hover:shadow-lg hover:shadow-indigo-200"
                >
                  <span>Next</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="flex items-center space-x-2 px-8 py-3 bg-green-600 text-white rounded-full font-medium hover:bg-green-700 transition-all hover:shadow-lg hover:shadow-green-200 disabled:opacity-70"
                >
                  {form.formState.isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <span>Submit</span>
                  )}
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
