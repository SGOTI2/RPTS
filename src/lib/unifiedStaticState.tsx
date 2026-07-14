import { createContext, type ReactNode } from "react";

type ContextType = {
  subteamMapping: {
    [k: number]: string
  },
  fscn: string[] // FireStore Collection Name - The internal name for a panel feed in the database
  fscnMapping: {
    [fscn: string]: string // FSCN -> Human Text
  } 
}

const providerlessContext: ContextType = {subteamMapping: {}, fscn: [], fscnMapping: {}}

export const UnifiedStaticState = createContext(providerlessContext)

export function UnifiedStaticStateProvider({ children }: { children: ReactNode }) {
  return (
    <UnifiedStaticState value={{
      subteamMapping: {
        0: "Drive Base"
      }, 
      fscn: ["LEXAN_CNC", "CNC", "WOOD_LASER", "SHOP"],
      fscnMapping: {
        "LEXAN_CNC": "Lexan CNC",
        "CNC": "Metal CNC",
        "WOOD_LASER": "Laser",
        "SHOP": "Shop",
      }
    }}>
      {children}
    </UnifiedStaticState>
  )
}