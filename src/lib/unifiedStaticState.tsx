import { createContext, type ReactNode } from "react";

type ContextType = {
  subteamMapping: {
    [k: number]: string
  }
}

const providerlessContext: ContextType = {subteamMapping: {}}

export const UnifiedStaticState = createContext(providerlessContext)

export function UnifiedStaticStateProvider({ children }: { children: ReactNode }) {
  return (
    <UnifiedStaticState value={{
      subteamMapping: {
        0: "Drive Base"
      }
    }}>
      {children}
    </UnifiedStaticState>
  )
}