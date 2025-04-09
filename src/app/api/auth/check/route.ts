import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const token = (await cookies()).get("token"); // Obtenha o token dos cookies

  if (token) {
    // Aqui você pode validar o token, por exemplo, usando JWT
    return NextResponse.json({ authenticated: true });
  } else {
    return NextResponse.json({ authenticated: false });
  }
}
