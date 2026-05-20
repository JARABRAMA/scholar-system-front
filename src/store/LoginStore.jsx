import { create } from 'zustand'
import { jwtDecode } from 'jwt-decode'

const initialState = {
  fullname: undefined,
  email: undefined,
  role: undefined,
  id: undefined,
  accessToken: undefined
}

export const useLoginStore = create((set, get, store) => ({
  ...initialState,

  login: (token) => {
    const object = jwtDecode(token)
    set(() => ({
      fullname: object.name,
      role: object.role,
      email: object.sub,
      id: object.jti,
      accessToken: token
    }))
  },

  logout: () => set(initialState)
}))
