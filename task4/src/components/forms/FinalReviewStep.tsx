import { UseFormReturn } from "react-hook-form";
import { FormValues } from "@/lib/validation/formSchema";
import { motion } from "framer-motion";

interface StepProps {
  form: UseFormReturn<FormValues>;
  onEdit: (stepIndex: number) => void;
  isConfirmed: boolean;
  setIsConfirmed: (value: boolean) => void;
}

export function FinalReviewStep({ form, onEdit, isConfirmed, setIsConfirmed }: StepProps) {
  const { getValues } = form;
  const values = getValues();

  const sections = [
    {
      title: "Personal Details",
      stepIndex: 0,
      data: {
        "First Name": values.firstName,
        "Last Name": values.lastName,
        "Date of Birth": values.dateOfBirth,
      },
    },
    {
      title: "Contact Information",
      stepIndex: 1,
      data: {
        "Email": values.email,
        "Phone": values.phone,
        "Address": values.address,
      },
    },
    {
      title: "Skills & Experience",
      stepIndex: 2,
      data: {
        "Role": values.role,
        "Years of Experience": values.yearsOfExperience,
        "Portfolio URL": values.portfolioUrl || "N/A",
      },
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">Final Review</h2>
        <p className="text-gray-500">Please review your information before submitting.</p>
      </div>

      <div className="space-y-6">
        {sections.map((section, index) => (
          <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm relative">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">{section.title}</h3>
              <button
                type="button"
                onClick={() => onEdit(section.stepIndex)}
                className="text-sm text-indigo-600 hover:text-indigo-800 font-medium hover:underline"
              >
                Edit
              </button>
            </div>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4">
              {Object.entries(section.data).map(([key, value]) => (
                <div key={key}>
                  <dt className="text-sm font-medium text-gray-500">{key}</dt>
                  <dd className="mt-1 text-sm text-gray-900 font-medium">{value as React.ReactNode}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-indigo-50 border border-indigo-100 rounded-xl flex items-start space-x-3">
        <input 
          type="checkbox" 
          id="confirmInfo" 
          checked={isConfirmed}
          onChange={(e) => setIsConfirmed(e.target.checked)}
          className="mt-1 w-5 h-5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500 cursor-pointer" 
        />
        <label htmlFor="confirmInfo" className="text-sm text-indigo-900 cursor-pointer font-medium">
          I have reviewed the information above and confirm that all details are accurate and correct.
        </label>
      </div>
    </motion.div>
  );
}
