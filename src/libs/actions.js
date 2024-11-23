"use server";

import {
  AddScriptSchema,
  fileSchema,
  RegisterSchema,
  SignInSchema,
} from "@/libs/zod";
import { redirect } from "next/navigation";
// import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { signIn } from "next-auth/react";
import EncryptData from "@/helpers/EncryptData";
import { file } from "valibot";

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

export const submitScript = async (prevState, formData) => {
  const attachments = formData.getAll("attachments");
  console.log(attachments);

  const formDataObject = Object.fromEntries(formData.entries());

  formDataObject.attachments = attachments;

  const validatedFields = AddScriptSchema.safeParse(formDataObject);

  console.log(validatedFields);

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const {
    title,
    authors,
    co_authors,
    publication_date,
    journal,
    volume,
    issue,
    start_page,
    end_page,
    abstract,
    keywords,
    research_type,
    funding_info,
    affiliations,
    full_text_link,
    language,
    license,
    notes,
  } = validatedFields.data;

  const page_range = `${start_page}-${end_page}`;

  const request = JSON.stringify({
    title,
    authors,
    co_authors,
    publication_date,
    journal,
    volume,
    issue,
    page_range,
    abstract,
    keywords,
    research_type,
    funding_info,
    affiliations,
    full_text_link,
    language,
    license,
    notes,
  });

  console.log("request----", request);

  // const { email, password } = validatedFields.data;
  // console.log(email, password);

  // const response = await fetch("/api/submit-script", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(formData),
  // });

  // if (!response.ok) {
  //   throw new Error("Failed to submit script");
  // }

  // return response.json();
};
