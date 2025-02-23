import { NextResponse } from "next/server";

// function gerarSKU(
//   categoria: string,
//   cor: string,
//   tamanho: string,
//   modelo: string
// ): string {
//   const categoriaAbreviada: string = categoria.slice(0, 3).toUpperCase();
//   const corAbreviada: string = cor.slice(0, 3).toUpperCase();
//   const tamanhoAbreviado: string = tamanho.charAt(0).toUpperCase();
//   const modeloAbreviado: string = modelo.slice(0, 3).toUpperCase();

//   let numeroAleatorio: string = "";
//   for (let i = 0; i < 4; i++) {
//     numeroAleatorio += Math.floor(Math.random() * 10).toString();
//   }

//   const sku: string = `
//     ${categoriaAbreviada}-
//     ${corAbreviada}-
//     ${tamanhoAbreviado}-
//     ${modeloAbreviado}-
//     ${numeroAleatorio}
//   `;
//   return sku;
// }

export async function GET(req: Request, res: Response) {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  const products = [
    {
      id: crypto.randomUUID(),
      // sku: gerarSKU("Camiseta", "Azul", "P", "Feminina"),
      description: "Bingo Original Style Chilli Sprinkled Potato Chips 90g",
      name: "Bingo Original Style Chilli Chips",
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
      id: crypto.randomUUID(),
      // sku: gerarSKU("Camiseta", "Azul", "P", "Feminina"),
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

  if (!id || (!size && !color)) {
    return NextResponse.json({
      data: products,
    });
  }

  const filteredProducts = products.filter((product) => {
    if (
      (size &&
        product.sizes.includes(size) &&
        color &&
        product.colors.includes(color)) ||
      product.id === id
    ) {
      return product;
    }
  });

  return NextResponse.json({
    data: filteredProducts,
  });
}
