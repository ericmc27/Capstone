import { createAuthClient } from "better-auth/react"
export const {getSession, signIn, signOut, signUp} = createAuthClient({
    baseURL: import.meta.env.VITE_SERVER_BASE_URL
})