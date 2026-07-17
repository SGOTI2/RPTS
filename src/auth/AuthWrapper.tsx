import { FirebaseUIProvider } from "@firebase-oss/ui-react";
import { createContext, useEffect, useState, type ReactNode } from "react";
import ui from "./ui";
import { browserLocalPersistence, getAuth, setPersistence, type User } from "firebase/auth";
import { app } from "../lib/networking/firebase";
import "./Fingerprinting"
import { getUserData } from "../lib/networking/getUserData";
import { fingerprint } from "./Fingerprinting";

type ContextType = {
  user?: User,
  setUser: (user: User | undefined) => void,
  feedAllow?: boolean,
  isAllowedThisDevice?: boolean
}

const providerlessContext: ContextType = {setUser: () => {}}

export const AuthContext = createContext(providerlessContext)
export const Auth = app ? getAuth(app) : app
if (Auth) {
  setPersistence(Auth, browserLocalPersistence).then(() => {})
  console.log(Auth.currentUser)
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | undefined>(Auth?.currentUser ?? undefined);
  const [feedAllow, setFeedAllow] = useState<boolean | undefined>(undefined);
  const [isAllowedThisDevice, setAllowedOnThisDevice] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    Auth?.onAuthStateChanged((user) => {
      setUser(user ?? undefined);
      if (user) {
        getUserData(user.uid).then((userData) => {
          setFeedAllow(userData?.feedAllow);
          setAllowedOnThisDevice(userData?.allowedDevices.indexOf(fingerprint) != -1);
        })
      }
    })
  }, [])

  return (
    <AuthContext value={{
      user: user,
      setUser: setUser,
      feedAllow: feedAllow,
      isAllowedThisDevice: isAllowedThisDevice
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