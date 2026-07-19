import { FirebaseUIProvider } from "@firebase-oss/ui-react";
import { createContext, useEffect, useState, type ReactNode } from "react";
import ui from "./ui";
import { browserLocalPersistence, getAuth, setPersistence, type ParsedToken, type User } from "firebase/auth";
import { app } from "../lib/networking/firebase";
import "./Fingerprinting"
import { getUserData } from "../lib/networking/getUserData";
import { fingerprint } from "./Fingerprinting";

type ContextType = {
  user?: User,
  setUser: (user: User | undefined) => void,
  setClaims: (claims: ParsedToken | undefined) => void,
  forceDataReload: () => Promise<void> | void,
  claims?: ParsedToken | undefined,
  isAllowedThisDevice?: boolean
}

const providerlessContext: ContextType = {setUser: () => {}, setClaims: () => {}, forceDataReload: () => {}}

export const AuthContext = createContext(providerlessContext)
export const Auth = app ? getAuth(app) : app
if (Auth) {
  setPersistence(Auth, browserLocalPersistence).then(() => {})
  console.log(Auth.currentUser)
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | undefined>(Auth?.currentUser ?? undefined);
  const [claims, setClaims] = useState<ParsedToken | undefined>(undefined);
  const [isAllowedThisDevice, setAllowedOnThisDevice] = useState<boolean | undefined>(undefined);

  async function forceDataReload() {
    if (!user) return;
    
    const userData = await getUserData(user.uid);
    
    setAllowedOnThisDevice(userData?.allowedDevices.indexOf(fingerprint) != -1);
  }

  useEffect(() => {
    Auth?.onAuthStateChanged((user) => {
      setUser(user ?? undefined);
      if (user) {
        user.getIdTokenResult().then((token) => {
          setClaims(token.claims);
        })
        getUserData(user.uid).then((userData) => {
          setAllowedOnThisDevice(userData?.allowedDevices.indexOf(fingerprint) != -1);
        })
      } else {
        setClaims(undefined)
      }
    })
  }, [])

  return (
    <AuthContext value={{
      user: user,
      setUser: setUser,
      setClaims: setClaims,
      forceDataReload: forceDataReload,
      claims: claims,
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