import { FirebaseUIProvider } from "@firebase-oss/ui-react";
import { createContext, useEffect, useState, type ReactNode } from "react";
import ui from "./ui";
import { browserLocalPersistence, getAuth, setPersistence, type User } from "firebase/auth";
import { app } from "../lib/networking/firebase";
import "./Fingerprinting"

type ContextType = {
  user?: User,
  setUser: (user: User | undefined) => void
}

const providerlessContext: ContextType = {setUser: () => {}}

export const AuthContext = createContext(providerlessContext)
export const Auth = app ? getAuth(app) : app
if (Auth) {
  setPersistence(Auth, browserLocalPersistence).then(() => {})
  console.log(Auth.currentUser)
}


export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState(Auth?.currentUser ?? undefined);

  useEffect(() => {
    Auth?.onAuthStateChanged((user) => {
      setUser(user ?? undefined);
    })
  }, [])

  return (
    <AuthContext value={{
      user: user,
      setUser: setUser
    }}>
      {children}
    </AuthContext>
  )
}

export default function AuthWrapper({ children }: { children: ReactNode }) {
  return (
    <FirebaseUIProvider ui={ui!}>
      <AuthProvider>
        {children}
      </AuthProvider>
    </FirebaseUIProvider>
  )
}