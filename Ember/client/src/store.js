import { create } from "zustand"

export const useStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),

  channel: "general",
  setChannel: (channel) => set({ channel }),

  messages: [],
  setMessages: (messages) => set({ messages }),
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),

  users: {},
  setUsers: (users) => set({ users })
}))