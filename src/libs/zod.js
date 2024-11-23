import { custom, number, object, string } from "zod";

export const SignInSchema = object({
  email: string().email("Invalid Email"),
  password: string()
    .min(5, "Password must be more than 5 characters")
    .max(32, "Password must be less than 32 characters"),
});

export const RegisterSchema = object({
  full_name: string().min(2, "Fullname must be more than 2 Character"),
  email: string().email("Invalid Email"),
  password: string()
    .min(5, "Password must be more than 5 characters")
    .max(32, "Password must be less than 32 characters"),
  confirmPassword: string()
    .min(5, "Password must be more than 5 characters")
    .max(32, "Password must be less than 32 characters"),
  gender: string().min(1, "Gender is required"),
}).refine((data) => data.password === data.confirmPassword, {
  message: string().min(1, "required"),
  path: ["confirmPassword"],
});

export const AddScriptSchema = object({
  title: string().min(1, "required"),
  authors: string().min(1, "required"),
  co_authors: string().min(1, "required"),
  publication_date: string().min(1, "required"),
  journal: string().min(1, "required"),
  volume: string()
    .regex(/^\d+$/, "volume must be a valid number.")
    .refine((val) => parseInt(val) > 0, "volume must be greater than 0."),
  issue: string()
    .regex(/^\d+$/, "issue must be a valid number.")
    .refine((val) => parseInt(val) > 0, "issue must be greater than 0."),
  start_page: string()
    .regex(/^\d+$/, "start page must be a valid number.")
    .refine((val) => parseInt(val) > 0, "start page must be greater than 0."),
  end_page: string()
    .regex(/^\d+$/, "end page must be a valid number.")
    .refine((val) => parseInt(val) > 0, "end page must be greater than 0."),
  abstract: string().min(1, "required"),
  keywords: string().min(1, "required"),
  research_type: string().min(1, "required"),
  funding_info: string().min(1, "required"),
  affiliations: string().min(1, "required"),
  full_text_link: string()
    .url("Full text link must be a valid URL")
    .min(1, "Full text link is required"),
  language: string().min(1, "required"),
  license: string().min(1, "required"),
  notes: string().min(1, "required"),
  attachment: custom((file) => file instanceof File, {
    message: "Invalid file upload",
  })
    .refine(
      (file) => file.type === "application/pdf",
      "File must be a PDF document."
    )
    .refine(
      (file) => file.size <= 5 * 1024 * 1024, // 5 MB limit
      "File size must not exceed 5 MB."
    ),
  // unique_id_file: Zod.instanceof(FileList).refine(
  //   (files) => files.length === 1 && files[0].type === "application/pdf",
  //   "File must be a PDF"
  // ),
});
