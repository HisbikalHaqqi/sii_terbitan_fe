import { NextResponse } from "next/server";

export async function POST(req) {
  const formData = await req.formData();

  const title = formData.get("title");
  const subtitle = formData.get("subtitle");
  const synopsis = formData.get("synopsis");
  const file = formData.get("file"); // A Blob (File)

  // Validate if file exists and is a PDF
  if (!file || file.type !== "application/pdf") {
    return NextResponse.json(
      { message: "Invalid file type, only PDF allowed" },
      { status: 400 }
    );
  }

  try {
    // Process file and data (e.g., save to database or storage)
    console.log("Title:", title);
    console.log("Subtitle:", subtitle);
    console.log("Synopsis:", synopsis);
    console.log("File Name:", file.name);

    return NextResponse.json({ message: "Form submitted successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Error processing the form", error: error.message },
      { status: 500 }
    );
  }
}
