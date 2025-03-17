// VIDE: https://www.syncfusion.com/blogs/post/axios-vs-fetch-choose-right-http-client?ref=dailydev
export class FetchClient {
  private baseUrl: string
  private prefix: string
  // ISSUE: melhorar essa parte de suporte aos endpoints
  private endpoint?: string

  constructor(
    baseUrl: string = process.env.NEXT_PUBLIC_API_URL || "",
    prefix: string = "/api"
  ) {
    this.baseUrl = baseUrl
    this.prefix = prefix
  }

  private async request<T>(endpoint: string, config?: RequestInit): Promise<T> {
    try {
      const url = `${this.baseUrl}${this.prefix}${endpoint}`
      const response = await fetch(url, config)

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`)
      }

      return await response.json()
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : "Unknown error")
    }
  }

  async get<T>(
    endpoint: string,
    params?: Record<string, any>,
    config?: RequestInit
  ): Promise<T> {
    const queryParams = new URLSearchParams({
      ...params,
    }).toString()

    return this.request<T>(`${endpoint}?${queryParams}`, {
      method: "GET",
      ...config,
    })
  }

  async post<T>(endpoint: string, body: any, config?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
      ...config,
    })
  }

  async put<T>(endpoint: string, body: any, config?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
      ...config,
    })
  }

  async delete<T>(endpoint: string, config?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, { method: "DELETE", ...config })
  }
}
