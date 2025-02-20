import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import { getCollection } from "@/integrations/mongo-compass.client";

// Tempo de expiração do Magic Link (15 minutos)
const MAGIC_LINK_EXPIRATION = 15 * 60 * 1000;

/**
 * POST: Gera e envia o Magic Link para o e-mail do usuário
 */
export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const usersCollection = await getCollection("users");
    const user = await usersCollection?.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Gerar um token único
    const token = randomBytes(32).toString("hex");

    // Armazenar o token temporariamente no banco
    const magicLinksCollection = await getCollection("magic_links");
    await magicLinksCollection?.insertOne({
      _id: new ObjectId(),
      email,
      token,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + MAGIC_LINK_EXPIRATION),
    });

    // Criar link de autenticação
    const magicLink = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/magic-link?token=${token}`;

    // Enviar e-mail (simulação)

    return NextResponse.json({ message: "Magic link sent!" });
  } catch (error) {
    console.error("Error generating magic link:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

/**
 * GET: Valida o token e autentica o usuário
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json({ error: "Token is required" }, { status: 400 });
    }

    const magicLinksCollection = await getCollection("magic_links");
    const magicLink = await magicLinksCollection?.findOne({ token });

    if (!magicLink) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // Verificar se o token expirou
    if (new Date() > new Date(magicLink.expiresAt)) {
      await magicLinksCollection?.deleteOne({ token });
      return NextResponse.json({ error: "Token expired" }, { status: 401 });
    }

    // Buscar usuário associado ao token
    const usersCollection = await getCollection("users");
    const user = await usersCollection?.findOne({ email: magicLink.email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Remover o token do banco (usável apenas uma vez)
    await magicLinksCollection?.deleteOne({ token });

    // Gerar um JWT para autenticação
    const jwtToken = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    return NextResponse.json({
      token: jwtToken,
      message: "Authenticated successfully",
    });
  } catch (error) {
    console.error("Error validating magic link:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
