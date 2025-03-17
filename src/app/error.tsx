"use client"

import { Button } from "@/@lib-ui"

export default function AppError() {
  return (
    <div>
      <Button onClick={() => window.location.reload()}>
        Voltar para a página principal
      </Button>
    </div>
  )
}
