import { object, string } from "zod";

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
  message: "Password does not match",
  path: ["confirmPassword"],
});
