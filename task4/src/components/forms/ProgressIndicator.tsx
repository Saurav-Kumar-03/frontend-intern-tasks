import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface ProgressIndicatorProps {
  currentStep: number;
  steps: { id: string; title: string }[];
}

export function ProgressIndicator({ currentStep, steps }: ProgressIndicatorProps) {
  return (
    <div className="mb-10 relative px-2">
      <div className="flex justify-between items-center relative z-10">
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;

          return (
            <div key={step.id} className="flex flex-col items-center w-24">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 shadow-sm transition-all duration-300 ${
                  isCompleted
                    ? 'bg-indigo-600 border-indigo-600 text-white scale-100'
                    : isActive
                    ? 'border-indigo-600 text-indigo-600 bg-indigo-50 scale-110'
                    : 'border-gray-200 text-gray-400 bg-white scale-100'
                }`}
              >
                {isCompleted ? <Check className="w-5 h-5" /> : <span className="font-semibold">{index + 1}</span>}
              </div>
              <span
                className={`mt-3 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-center transition-colors duration-300 ${
                  isActive ? 'text-indigo-700' : isCompleted ? 'text-gray-900' : 'text-gray-400'
                }`}
              >
                {step.title}
              </span>
            </div>
          );
        })}
      </div>
      
      {/* Connecting lines background */}
      <div className="absolute top-5 left-10 right-10 h-[2px] bg-gray-200 -z-10 transform -translate-y-1/2" />
      
      {/* Connecting lines fill */}
      <div className="absolute top-5 left-10 right-10 h-[2px] -z-10 transform -translate-y-1/2 overflow-hidden">
        <motion.div
          className="h-full bg-indigo-600"
          initial={{ width: '0%' }}
          animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        />
      </div>
    </div>
  );
}
