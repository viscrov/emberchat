import React, { useEffect, useState } from "react"
import { useStore } from "./store"
import AuthModal from "./components/AuthModal"
import useWebSocket from "./useWebSocket"

export default function App() {

  const user = useStore((s) => s.user)
  const setUser = useStore((s) => s.setUser)
  const messages = useStore((s) => s.messages)

  const { sendMessage } = useWebSocket()
  const [input, setInput] = useState("")

  useEffect(() => {
    const saved = localStorage.getItem("ember_user")
    if (saved) {
      setUser(JSON.parse(saved))
    }
  }, [])

  function handleSend() {
    if (!input.trim()) return
    sendMessage(input)
    setInput("")
  }

  if (!user) {
    return <AuthModal />
  }

  return (
    <div className="h-screen flex text-gray-200">

      <div className="w-64 bg-sidebar p-6">
        <div className="text-xl font-bold mb-6">Ember</div>
        <div className="text-gray-400"># general</div>
      </div>

      <div className="flex-1 bg-panel flex flex-col">

        <div className="flex-1 overflow-y-auto p-6 space-y-4">

          {messages.map(msg => (
            <div key={msg.id} className="flex items-start gap-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                style={{ background: msg.user.color }}
              >
                {msg.user.username[0].toUpperCase()}
              </div>
              <div>
                <div className="font-semibold">
                  {msg.user.username}
                </div>
                <div className="text-gray-300">
                  {msg.text}
                </div>
              </div>
            </div>
          ))}

        </div>

        <div className="p-4 border-t border-hover flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-hover p-3 rounded-lg outline-none"
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            className="px-6 rounded-lg text-white"
            style={{
              background: "linear-gradient(135deg,#7c3aed,#06b6d4)"
            }}
          >
            Send
          </button>
        </div>

      </div>
    </div>
  )
}