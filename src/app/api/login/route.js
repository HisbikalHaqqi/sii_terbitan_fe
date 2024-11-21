// Next Imports
import { NextResponse } from "next/server";

export async function POST(req) {
  // Vars
  try {
    const request = await req.json();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(request),
    });
    const data = await res.json();

    if (data?.data?.responseCode === 200) {
      return NextResponse.json(data);
    }

    if (data?.data?.responseCode == 400) {
      return NextResponse.json(
        {
          message: [data?.data?.message],
        },
        {
          status: 400,
          statusText: "Error Request",
        }
      );
    }

    if (data?.data?.responseCode == 401) {
      return NextResponse.json(
        {
          message: [data?.data?.message],
        },
        {
          status: 401,
          statusText: "Unauthorized Access",
        }
      );
    }

    if (data?.data?.responseCode == 500) {
      return NextResponse.json(
        {
          message: [data?.data?.message],
        },
        {
          status: 500,
          statusText: "Internal Server Error",
        }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        message: ["Service Unavailable"],
      },
      {
        status: 503,
        statusText: "Service Unavailable",
      }
    );
  }
}
