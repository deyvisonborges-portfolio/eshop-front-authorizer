import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    street: "Avenida Paulista",
    number: 1578,
    complement: "Apartamento 1203, Bloco B",
    neighborhood: "Bela Vista",
    city: "São Paulo",
    state: "SP",
    country: "Brasil",
    postalCode: "01310-200",
    latitude: -23.563099,
    longitude: -46.654321,
    reference: "Próximo ao MASP",
    recipientName: "João da Silva",
    phone: "+55 11 91234-5678",
    additionalInfo: "Portaria 24h, entregar na recepção",
  })
}

export async function PUT() {
  // emulate error to refresh page
  // throw new Error('"Fail to put')
  console.log("Emulate update address")
  await new Promise((resolve) => setTimeout(resolve, 2000))
  return NextResponse.json({ success: true })
}
