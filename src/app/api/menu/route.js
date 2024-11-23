import { authOptions } from "@/libs/auth";
import { getServerSession } from "next-auth";

// pages/api/fetchMenuData.js
export async function POST(req) {
  const session = await getServerSession(authOptions);

  let token;

  if (session) {
    token = session.user.accessToken;
  }

  let role = session?.user?.role;

  console.log("role", role);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/menu/list`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ role: role }),
      cache: "no-store",
    }
  );

  console.log("response", response);
  const dataResponse = await response.json();
  console.log(" data response", dataResponse);

  try {
    if (response.status == 200) {
      return Response.json({
        status: 200,
        dataResponse,
        message: "SUCCESS",
      });
    } else if (response.status == 400) {
      return Response.json({
        status: response.status,
        message: "Can't Get Menu Data",
      });
    } else if (response.status == 401) {
      return Response.json({
        status: response.status,
        message: "UnAuthorize",
        code: response.status,
      });
    } else {
      return Response.json({
        status: response.status,
        message: "Internal Server Error",
      });
    }
  } catch (error) {
    console.error(error);
  }
}
