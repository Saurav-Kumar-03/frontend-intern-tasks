import { z } from "zod";

export const formSchema = z.object({
  // Personal Details
  firstName: z.string().min(2, "First name must be at least 2 characters").max(50),
  lastName: z.string().min(2, "Last name must be at least 2 characters").max(50),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  
  // Contact Information
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(5, "Address is required"),
  
  // Skills & Experience
  role: z.string().min(2, "Role is required"),
  yearsOfExperience: z.string().min(1, "Required").refine((val) => !isNaN(Number(val)) && Number(val) >= 0 && Number(val) <= 50, "Must be a valid number between 0 and 50"),
  portfolioUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
});

export type FormValues = z.infer<typeof formSchema>;
