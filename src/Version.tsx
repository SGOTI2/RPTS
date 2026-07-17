import { useContext } from "react";
import { AuthContext } from "./auth/AuthWrapper";
import { fingerprint } from "./auth/Fingerprinting";

declare const __BUILD_TIME__: string;
declare const __GIT_HASH__: string;

export default function Version() {
  const authContext = useContext(AuthContext);

  const obfuscate = (text: string) => {
    return text.split("-").map((v) => v.slice(0, 2) + "*".repeat(v.length - 2)).join("-")
  }

  return (
    <>
      {__GIT_HASH__} #{__BUILD_TIME__}<br/>USER {authContext.user?.uid} @ {obfuscate(fingerprint)}
    </>
  )
}