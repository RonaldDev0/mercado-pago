import { create } from 'zustand'

type State = {
  amount: number
  commandMenu: boolean
}

type Actions = {
  setStore: (property: keyof State, value: any) => void
}

export const useOptions = create<State & Actions>(set => ({
  amount: 5000,
  commandMenu: false,
  setStore: (property, value) => set(prevState => ({ ...prevState, [property]: value }))
}))
