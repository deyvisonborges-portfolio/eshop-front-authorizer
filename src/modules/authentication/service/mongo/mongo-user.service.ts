import { CreateUserType } from "@/app/api/mongo/users/types"

export class MongoUserService {
  private url: string

  constructor() {
    this.url = "http://localhost:3000/api/mongo/users"
  }

  async createUser(user: CreateUserType) {
    const response = await fetch(this.url, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(user),
    })

    return {
      errors: response.ok ?? null,
      data: response.ok ? await response.json() : null,
    }
  }
}
