import type { Server } from 'http'
import WebSocket from 'ws'

export let wss: WebSocket.Server

let numberOfClients = 0

export const startWebSocketServer = (server: Server) => {
  wss = new WebSocket.Server({ server })
  wss.on('connection', (ws) => {
    numberOfClients++
    console.log(
      `A new client has joined, ${numberOfClients} client(s) connected`
    )
    ws.on('close', () => {
      numberOfClients--
      console.log(
        `A client has been disconnected, ${numberOfClients} client(s) connected`
      )
    })

    ws.send('Welcome')
  })
}
