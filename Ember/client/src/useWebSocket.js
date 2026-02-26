import { useEffect, useRef } from "react"
import { useStore } from "./store"

export default function useWebSocket() {

  const addMessage = useStore(s => s.addMessage)
  const user = useStore(s => s.user)
  const socketRef = useRef(null)

  useEffect(() => {

    const socket = new WebSocket("ws://localhost:5000")
    socketRef.current = socket

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data)
      addMessage(message)
    }

    return () => socket.close()

  }, [])

  function sendMessage(text) {
    if (!socketRef.current || socketRef.current.readyState !== 1) return

    const message = {
      id: crypto.randomUUID(),
      user,
      text,
      timestamp: Date.now()
    }

    socketRef.current.send(JSON.stringify(message))
  }

  return { sendMessage }
}