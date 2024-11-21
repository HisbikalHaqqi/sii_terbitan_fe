import NetworkHelper from '@/helpers/NetworkHelper';
import { NextResponse } from "next/server";

export async function POST(req) {
  try {

    const result   = await NetworkHelper(req)
    const response = await result.json()
    return Response.json(response)

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

