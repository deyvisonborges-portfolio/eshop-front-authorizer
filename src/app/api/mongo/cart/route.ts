import { ObjectId } from "mongodb"
import { NextResponse } from "next/server"
import { getCollection } from "@/integrations/mongo-compass.client"
import { CartType } from "./type"

/**
 * POST: Adiciona um item ao carrinho
 */
export async function POST(req: Request) {
  try {
    const body = (await req.json()) as CartType

    await new Promise((resolv) => setTimeout(resolv, 2000))
    const cartCollection = await getCollection("cart")
    const result = await cartCollection?.insertOne(body)

    return NextResponse.json(
      {
        message: "Item adicionado ao carrinho",
        cartItemId: result?.insertedId,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Erro ao adicionar item ao carrinho:", error)
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}

/**
 * GET: Retorna todos os itens do carrinho de um usuário
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "id é obrigatório" }, { status: 400 })
    }

    const cartCollection = await getCollection("cart")
    const cartItems = await cartCollection?.find({ id }).toArray()

    return NextResponse.json(cartItems)
  } catch (error) {
    console.error("Erro ao buscar carrinho:", error)
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}

/**
 * PUT: Atualiza a quantidade de um item no carrinho
 */
export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const cartItemId = searchParams.get("id")
    const body = await req.json()

    if (!cartItemId || !body.quantity) {
      return NextResponse.json(
        { error: "ID e quantidade são obrigatórios" },
        { status: 400 }
      )
    }

    const cartCollection = await getCollection("cart")
    const updatedItem = await cartCollection?.updateOne(
      { _id: new ObjectId(cartItemId) },
      { $set: { quantity: body.quantity } }
    )

    if (updatedItem?.matchedCount === 0) {
      return NextResponse.json(
        { error: "Item não encontrado" },
        { status: 404 }
      )
    }

    return NextResponse.json({ message: "Quantidade atualizada com sucesso" })
  } catch (error) {
    console.error("Erro ao atualizar item no carrinho:", error)
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}

/**
 * DELETE: Remove um item do carrinho pelo ID
 */
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const cartItemId = searchParams.get("id")

    if (!cartItemId) {
      return NextResponse.json({ error: "ID é obrigatório" }, { status: 400 })
    }

    const cartCollection = await getCollection("cart")
    const deletedItem = await cartCollection?.deleteOne({
      _id: new ObjectId(cartItemId),
    })

    if (deletedItem?.deletedCount === 0) {
      return NextResponse.json(
        { error: "Item não encontrado" },
        { status: 404 }
      )
    }

    return NextResponse.json({ message: "Item removido do carrinho" })
  } catch (error) {
    console.error("Erro ao remover item do carrinho:", error)
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}
