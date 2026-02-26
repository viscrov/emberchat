import React, { useState } from "react"
import { motion } from "framer-motion"
import { useStore } from "../store"

export default function AuthModal() {

  const setUser = useStore((s) => s.setUser)
  const [name, setName] = useState("")

  function handleSubmit() {
    if (!name.trim()) return

    const finalUser = {
      id: crypto.randomUUID(),
      username: name.trim(),
      color: generateColor(name.trim())
    }

    localStorage.setItem("ember_user", JSON.stringify(finalUser))
    setUser(finalUser)
  }

  function generateColor(str) {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash)
    }
    const hue = hash % 360
    return `hsl(${hue}, 70%, 60%)`
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="bg-panel p-8 rounded-2xl w-96 shadow-2xl"
      >
        <h2 className="text-2xl font-semibold mb-6">Welcome to Ember</h2>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Choose a username"
          className="w-full bg-hover p-3 rounded-lg outline-none mb-4"
        />

        <button
          onClick={handleSubmit}
          className="w-full py-3 rounded-lg text-white font-semibold"
          style={{
            background: "linear-gradient(135deg,#7c3aed,#06b6d4)"
          }}
        >
          Enter
        </button>
      </motion.div>

    </div>
  )
}