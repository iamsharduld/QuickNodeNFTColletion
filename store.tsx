import create from 'zustand'

interface AuthenticatedState {
  isAuthenticated: boolean
  signIn: () => void
  signOut: () => void
}

const useStoreAuth = create<AuthenticatedState>()((set) => ({
  isAuthenticated: false,
  signIn: () => set((state) => ({ isAuthenticated: true })),
  signOut: () => set((state) => ({ isAuthenticated: false })),
}))

export default useStoreAuth;
