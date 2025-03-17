const { createServer } = require("http")
const { parse } = require("url")
const next = require("next")
const { Server } = require("socket.io")

const dev = process.env.NODE_ENV !== "production"
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    handle(req, res, parsedUrl)
  })

  const io = new Server(server)

  let pedidos = {}

  io.on("connection", (socket) => {
    console.log("Cliente conectado:", socket.id)

    socket.on("novo-pedido", (pedidoId) => {
      console.log("passei aqui")
      pedidos[pedidoId] = "Pedido recebido"
      io.emit("atualiza-pedido", { pedidoId, status: pedidos[pedidoId] })

      // Simular transição de status do pedido
      setTimeout(() => {
        pedidos[pedidoId] = "Preparando pedido"
        io.emit("atualiza-pedido", { pedidoId, status: pedidos[pedidoId] })
      }, 3000)

      setTimeout(() => {
        pedidos[pedidoId] = "Saiu para entrega"
        io.emit("atualiza-pedido", { pedidoId, status: pedidos[pedidoId] })
      }, 6000)

      setTimeout(() => {
        pedidos[pedidoId] = "Pedido entregue"
        io.emit("atualiza-pedido", { pedidoId, status: pedidos[pedidoId] })
      }, 9000)
    })

    socket.on("disconnect", () => {
      console.log("A client disconnected")
    })
  })

  server.listen(3000, (err) => {
    if (err) throw err
    console.log("> Ready on http://localhost:3000")
  })
})
