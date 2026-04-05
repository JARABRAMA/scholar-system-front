import { create } from "zustand";
import { jwtDecode } from "jwt-decode";

export const useLoginStore = create((set, get, store) => ({
  fullname: undefined,
  email: undefined,
  role: undefined,
  id: undefined,
  accessToken: undefined,

  login: (token) => {
    const object = jwtDecode(token);
    set(() => ({
      fullname: object.name,
      role: object.role,
      email: object.sub,
      id: object.jti,
      token: token,
    }));
  },

  logout: () => set(store.getInitialState()),
}));
