import { UseFormReturn } from "react-hook-form";
import { FormValues } from "@/lib/validation/formSchema";
import { motion } from "framer-motion";

interface StepProps {
  form: UseFormReturn<FormValues>;
}

export function FinalReviewStep({ form }: StepProps) {
  const { getValues } = form;
  const values = getValues();

  const sections = [
    {
      title: "Personal Details",
      data: {
        "First Name": values.firstName,
        "Last Name": values.lastName,
        "Date of Birth": values.dateOfBirth,
      },
    },
    {
      title: "Contact Information",
      data: {
        "Email": values.email,
        "Phone": values.phone,
        "Address": values.address,
      },
    },
    {
      title: "Skills & Experience",
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
          <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{section.title}</h3>
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
    </motion.div>
  );
}
