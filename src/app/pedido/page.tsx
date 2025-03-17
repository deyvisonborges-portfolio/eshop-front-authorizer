"use client"

import { useEffect, useState } from "react"
import io from "socket.io-client"

const socket = io()

export default function Home() {
  const [pedidoId, setPedidoId] = useState<string | null>(null)
  const [statusPedido, setStatusPedido] = useState("")

  useEffect(() => {
    socket.on("atualiza-pedido", ({ pedidoId: id, status }) => {
      if (id === pedidoId) {
        setStatusPedido(status)
      }
    })

    return () => {
      socket.off("atualiza-pedido")
    }
  }, [pedidoId])

  const fazerPedido = () => {
    const id = Math.random().toString(36).substr(2, 9)
    setPedidoId(id)
    setStatusPedido("Pedido enviado")
    socket.emit("novo-pedido", id)
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Status do Pedido</h1>
      <button
        onClick={fazerPedido}
        style={{ padding: "10px 20px", fontSize: "16px" }}
      >
        Fazer Pedido
      </button>
      {pedidoId && (
        <div style={{ marginTop: "20px", fontSize: "18px" }}>
          <strong>ID do Pedido:</strong> {pedidoId}
          <br />
          <strong>Status:</strong> {statusPedido}
        </div>
      )}
    </div>
  )
}
