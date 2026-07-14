import { createContext, type ReactNode } from "react";

type ContextType = {
  subteamMapping: {
    [k: number]: string
  },
  fscn: string[] // FireStore Collection Name - The internal name for a panel feed in the database
}

const providerlessContext: ContextType = {subteamMapping: {}, fscn: []}

export const UnifiedStaticState = createContext(providerlessContext)

export function UnifiedStaticStateProvider({ children }: { children: ReactNode }) {
  return (
    <UnifiedStaticState value={{
      subteamMapping: {
        0: "Drive Base"
      }, 
      fscn: []
    }}>
      {children}
    </UnifiedStaticState>
  )
}