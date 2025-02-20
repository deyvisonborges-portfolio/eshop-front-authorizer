import { NextResponse } from "next/server";

type ApiResponse<T = any> = {
  success: boolean;
  data?: T;
  error?: string;
  status: number;
};

/**
 * Cria uma resposta JSON padronizada.
 * @param status Código HTTP da resposta.
 * @param data Dados de retorno (opcional).
 * @param error Mensagem de erro (opcional).
 * @returns NextResponse JSON padronizado.
 */
export function createResponse<T>(
  status: number,
  data?: T,
  error?: string
): NextResponse {
  const response: ApiResponse<T> = {
    success: status >= 200 && status < 300,
    status,
    ...(data !== undefined ? { data } : {}),
    ...(error ? { error } : {}),
  };

  return NextResponse.json(response, { status });
}
