import { create } from 'zustand'

type State = {
  commandMenu: boolean
}

type Actions = {
  setStore: (property: keyof State, value: any) => void
}

export const useOptions = create<State & Actions>(set => ({
  commandMenu: false,
  setStore: (property, value) => set(prevState => ({ ...prevState, [property]: value }))
}))
