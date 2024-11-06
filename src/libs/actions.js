"use server";

import { RegisterSchema, SignInSchema } from "@/libs/zod";
import { redirect } from "next/navigation";
// import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { signIn } from "next-auth/react";
import EncryptData from "@/helpers/EncryptData";

export const signUpCredentials = async (prevState, formData) => {
  const validatedFields = RegisterSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  let { full_name, email, password, gender } = validatedFields.data;
  gender = gender === "Male" ? "M" : gender === "Female" ? "F" : gender;

  try {
    const plaintext = JSON.stringify({
      request: { full_name, email, password, gender },
    });

    const encryptData = await EncryptData(plaintext);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ data: encryptData }),
      }
    );

    const data = await response.json();

    if (data?.data?.responseCode !== 200) {
      return { message: data?.data?.message || "Failed to register user" };
    }

    // Redirect or additional actions on success
  } catch (error) {
    console.error("Registration Error:", error);
    return { message: "An unexpected error occurred. Please try again later." };
  }
  redirect("/login");
};

// export const signUpCredentials = async (prevState, formData) => {
//   const validatedFields = RegisterSchema.safeParse(
//     Object.fromEntries(formData.entries())
//   );

//   if (!validatedFields.success) {
//     return {
//       error: validatedFields.error.flatten().fieldErrors,
//     };
//   }

//   let { full_name, email, password, gender } = validatedFields.data;

//   gender = gender === "Male" ? "M" : gender === "Female" ? "F" : gender;

//   try {
//     const plaintext = JSON.stringify({
//       request: {
//         full_name,
//         email,
//         password,
//         gender,
//       },
//     });

//     const encryptData = await EncryptData(plaintext);

//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_API_BASE_URL}/register`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Access-Control-Allow-Origin": "*",
//         },
//         body: JSON.stringify({ data: encryptData }),
//       }
//     );

//     const data = await response.json();

//     console.log("data", data);
//   } catch (error) {
//     console.log(error);
//     return { message: "Failed to register user" };
//   }
// };

// Sign in Credential action
export const signInCredentials = async (prevState, formData) => {
  const validatedFields = SignInSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;
  console.log(email, password);

  try {
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (res && res.ok && res.error === null) {
    }
  } catch (error) {
    if (error) {
      return { message: "Something went wrong." };
    }
    throw error;
  }
};
