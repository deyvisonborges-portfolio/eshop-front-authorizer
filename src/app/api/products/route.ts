import { NextResponse } from "next/server";

export async function GET(req: Request) {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const products = [
    {
      id: "123123",
      description: "Bingo Original Style Chilli Sprinkled Potato Chips 90g",
      name: "Bingo 2 Original Style Chilli Chips",
      price: 33.0,
      originalPrice: 50.0,
      discount: 34,
      images: [],
      stock: 10,
      categories: [""],
      sizes: ["P", "M"],
      colors: ["Preto", "Branco"],
    },
    {
      id: "234234",
      description: "Bingo Original Style Chilli Sprinkled Potato Chips 90g",
      name: "Bingo Original Style Chilli Chips",
      price: 33.0,
      originalPrice: 50.0,
      discount: 34,
      images: [],
      stock: 10,
      categories: [""],
      sizes: ["G", "GG"],
      colors: ["Azul"],
    },
  ];

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const size = searchParams.get("size");
  const color = searchParams.get("color");

  // Se um ID for passado, retorna apenas o produto correspondente
  if (id) {
    const product = products.find((p) => p.id === id);
    return NextResponse.json({ data: product ?? null });
  }

  // Se nenhum filtro for passado, retorna todos os produtos
  if (!size && !color) {
    return NextResponse.json({ data: products });
  }

  // Filtragem por cor e tamanho, se fornecidos
  const filteredProducts = products.filter((product) => {
    const matchesSize = size ? product.sizes.includes(size) : true;
    const matchesColor = color ? product.colors.includes(color) : true;
    return matchesSize && matchesColor;
  });

  return NextResponse.json({ data: filteredProducts });
}
