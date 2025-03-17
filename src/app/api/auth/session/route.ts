"use server"

import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"

const SECRET_KEY = process.env.JWT_SECRET || "secreta-super-segura"

export async function GET() {
  const token = (await cookies()).get("session")?.value

  if (!token) {
    return NextResponse.json({ authenticated: false })
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY)
    return NextResponse.json({ authenticated: true, user: decoded })
  } catch (error) {
    return NextResponse.json({ authenticated: false })
  }
}

// create session
export async function POST() {}
