import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const inputVariants = cva(
  "flex w-full rounded-xl border bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:placeholder:text-slate-400 transition-colors",
  {
    variants: {
      variant: {
        default: "border-slate-200 focus-visible:ring-blue-500 dark:border-slate-800 dark:focus-visible:ring-blue-500",
        error: "border-red-500 focus-visible:ring-red-500 dark:border-red-500 dark:focus-visible:ring-red-500 text-red-900 dark:text-red-100",
        success: "border-green-500 focus-visible:ring-green-500 dark:border-green-500 dark:focus-visible:ring-green-500 text-green-900 dark:text-green-100",
      },
      inputSize: {
        sm: "h-9",
        md: "h-10",
        lg: "h-12",
      }
    },
    defaultVariants: {
      variant: "default",
      inputSize: "md",
    },
  }
)

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  label?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, inputSize, label, helperText, leftIcon, rightIcon, id, required, ...props }, ref) => {
    const inputId = id || React.useId();
    
    return (
      <div className="w-full space-y-2">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-slate-200">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3 flex items-center justify-center text-slate-500">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            required={required}
            className={cn(
              inputVariants({ variant, inputSize, className }),
              leftIcon && "pl-10",
              rightIcon && "pr-10"
            )}
            ref={ref}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 flex items-center justify-center text-slate-500">
              {rightIcon}
            </div>
          )}
        </div>
        {helperText && (
          <p className={cn(
            "text-sm",
            variant === 'error' ? "text-red-500" : 
            variant === 'success' ? "text-green-500" : "text-slate-500 dark:text-slate-400"
          )}>
            {helperText}
          </p>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input, inputVariants }
