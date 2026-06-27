import { UseFormReturn } from "react-hook-form";
import { FormValues } from "@/lib/validation/formSchema";
import { motion } from "framer-motion";

interface StepProps {
  form: UseFormReturn<FormValues>;
}

export function ContactInfoStep({ form }: StepProps) {
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
        <h2 className="text-2xl font-bold text-gray-900">Contact Information</h2>
        <p className="text-gray-500">How can we reach you?</p>
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          {...register("email")}
          className={`w-full px-4 py-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200 text-gray-900 ${
            errors.email ? "border-red-500 bg-red-50" : "border-gray-300 bg-gray-50 focus:bg-white"
          }`}
          placeholder="john.doe@example.com"
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Phone Number
        </label>
        <input
          id="phone"
          type="tel"
          {...register("phone")}
          className={`w-full px-4 py-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200 text-gray-900 ${
            errors.phone ? "border-red-500 bg-red-50" : "border-gray-300 bg-gray-50 focus:bg-white"
          }`}
          placeholder="+1 (555) 000-0000"
        />
        {errors.phone && (
          <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
          Address
        </label>
        <textarea
          id="address"
          rows={3}
          {...register("address")}
          className={`w-full px-4 py-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200 resize-none text-gray-900 ${
            errors.address ? "border-red-500 bg-red-50" : "border-gray-300 bg-gray-50 focus:bg-white"
          }`}
          placeholder="123 Main St, City, Country"
        />
        {errors.address && (
          <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>
        )}
      </div>
    </motion.div>
  );
}
