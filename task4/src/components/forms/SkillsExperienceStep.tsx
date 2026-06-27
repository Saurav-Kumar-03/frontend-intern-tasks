import { UseFormReturn } from "react-hook-form";
import { FormValues } from "@/lib/validation/formSchema";
import { motion } from "framer-motion";

interface StepProps {
  form: UseFormReturn<FormValues>;
}

export function SkillsExperienceStep({ form }: StepProps) {
  const { register, formState: { errors } } = form;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">Skills & Experience</h2>
        <p className="text-gray-500">Tell us about your professional background.</p>
      </div>

      <div className="space-y-2">
        <label htmlFor="role" className="block text-sm font-medium text-gray-700">
          Current or Desired Role
        </label>
        <input
          id="role"
          type="text"
          {...register("role")}
          className={`w-full px-4 py-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200 text-gray-900 ${
            errors.role ? "border-red-500 bg-red-50" : "border-gray-300 bg-gray-50 focus:bg-white"
          }`}
          placeholder="Frontend Developer"
        />
        {errors.role && (
          <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="yearsOfExperience" className="block text-sm font-medium text-gray-700">
          Years of Experience
        </label>
        <input
          id="yearsOfExperience"
          type="number"
          {...register("yearsOfExperience")}
          className={`w-full px-4 py-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200 text-gray-900 ${
            errors.yearsOfExperience ? "border-red-500 bg-red-50" : "border-gray-300 bg-gray-50 focus:bg-white"
          }`}
          placeholder="2"
        />
        {errors.yearsOfExperience && (
          <p className="text-red-500 text-xs mt-1">{errors.yearsOfExperience.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="portfolioUrl" className="block text-sm font-medium text-gray-700">
          Portfolio URL (Optional)
        </label>
        <input
          id="portfolioUrl"
          type="url"
          {...register("portfolioUrl")}
          className={`w-full px-4 py-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200 text-gray-900 ${
            errors.portfolioUrl ? "border-red-500 bg-red-50" : "border-gray-300 bg-gray-50 focus:bg-white"
          }`}
          placeholder="https://yourportfolio.com"
        />
        {errors.portfolioUrl && (
          <p className="text-red-500 text-xs mt-1">{errors.portfolioUrl.message}</p>
        )}
      </div>
    </motion.div>
  );
}
