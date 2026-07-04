"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

const modalVariants = cva(
  "relative z-50 w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-800 dark:bg-slate-950 transition-all duration-200 animate-in fade-in zoom-in-95",
  {
    variants: {
      size: {
        sm: "max-w-sm",
        md: "max-w-lg",
        lg: "max-w-3xl",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

export interface ModalProps extends VariantProps<typeof modalVariants> {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  closeOnOutsideClick?: boolean;
}

export function Modal({ 
  isOpen, 
  onClose, 
  title, 
  description,
  children, 
  size,
  closeOnOutsideClick = true
}: ModalProps) {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm transition-opacity" 
        onClick={() => closeOnOutsideClick && onClose()}
        aria-hidden="true"
      />
      
      {/* Modal Dialog */}
      <div 
        className={cn(modalVariants({ size }))}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
      >
        <div className="flex flex-col space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              {title && (
                <h2 id="modal-title" className="text-xl font-semibold text-slate-900 dark:text-white">
                  {title}
                </h2>
              )}
              {description && (
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {description}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:ring-offset-slate-950"
            >
              <X className="h-4 w-4 dark:text-white" />
              <span className="sr-only">Close</span>
            </button>
          </div>
          <div className="text-slate-600 dark:text-slate-400">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
