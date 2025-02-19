import { getCollection } from "@/app/integrations/mongo-compass.client";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { CreateUserType } from "./types";

/**
 * POST: Cria um novo usuário
 */
export async function POST(req: Request) {
  try {
    const body = (await req.json()) as CreateUserType;

    const { email, password, name } = body;
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Email, password, and name are required" },
        { status: 400 }
      );
    }

    const usersCollection = await getCollection("users");
    const result = await usersCollection?.insertOne(body);

    return NextResponse.json(
      { message: "User created successfully", userId: result?.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

/**
 * GET: Retorna todos os usuários
 */
export async function GET() {
  try {
    const usersCollection = await getCollection("users");
    if (!usersCollection)
      return NextResponse.json(
        { error: "Collection not found" },
        { status: 500 }
      );

    const users = await usersCollection.find().toArray();
    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

/**
 * GET by ID: Busca usuário pelo ID
 */
// http://localhost:3000/api/mongo/users?id=65a2f0f0e3b3a4b9d1f0e1a1
export async function GET_BY_ID(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("id");

    if (!userId)
      return NextResponse.json({ error: "ID is required" }, { status: 400 });

    const usersCollection = await getCollection("users");
    const user = await usersCollection?.findOne({ _id: new ObjectId(userId) });

    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

/**
 * GET by Email: Busca usuário pelo Email
 */
export async function GET_BY_EMAIL(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email)
      return NextResponse.json({ error: "Email is required" }, { status: 400 });

    const usersCollection = await getCollection("users");
    const user = await usersCollection?.findOne({ email });

    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user by email:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

/**
 * GET by Email & Password: Busca usuário pelo Email e Senha
 */
export async function GET_BY_EMAIL_PASSWORD(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const password = searchParams.get("password");

    if (!email || !password)
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );

    const usersCollection = await getCollection("users");
    const user = await usersCollection?.findOne({ email, password });

    if (!user)
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user by email and password:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

/**
 * PUT: Atualiza usuário pelo ID
 */
export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("id");
    const body = await req.json();

    if (!userId)
      return NextResponse.json({ error: "ID is required" }, { status: 400 });

    const usersCollection = await getCollection("users");
    const updatedUser = await usersCollection?.updateOne(
      { _id: new ObjectId(userId) },
      { $set: body }
    );

    if (updatedUser?.matchedCount === 0)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    return NextResponse.json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

/**
 * DELETE: Remove usuário pelo ID
 */
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("id");

    if (!userId)
      return NextResponse.json({ error: "ID is required" }, { status: 400 });

    const usersCollection = await getCollection("users");
    const deletedUser = await usersCollection?.deleteOne({
      _id: new ObjectId(userId),
    });

    if (deletedUser?.deletedCount === 0)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
