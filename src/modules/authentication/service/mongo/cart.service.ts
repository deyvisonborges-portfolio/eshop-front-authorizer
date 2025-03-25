import { CartType } from "@/app/api/mongo/cart/type"

export class MongoCartService {
  private url = "http://localhost:3000/api/mongo/cart"

  async createCart(data: CartType) {
    const response = await fetch(this.url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    })

    return {
      errors: response.ok ?? null,
      data: response.ok ? await response.json() : null,
    }
  }
}

// {
//         _id: "65a2f0f0e3b3a4b9d1f0e1a1",
//         userId: "123456",
//         items: [
//           {
//             productId: "987654",
//             quantity: 2,
//             price: 49.99,
//           },
//         ],
//         createdAt: "2025-03-21T12:00:00Z",
//       },
