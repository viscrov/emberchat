const WebSocket = require("ws")

const wss = new WebSocket.Server({ port: 5000 })

let clients = []

wss.on("connection", (ws) => {

  clients.push(ws)

  ws.on("message", (data) => {
    const parsed = JSON.parse(data)

    // broadcast to everyone
    clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(parsed))
      }
    })
  })

  ws.on("close", () => {
    clients = clients.filter(c => c !== ws)
  })
})

console.log("WebSocket running on ws://localhost:5000")