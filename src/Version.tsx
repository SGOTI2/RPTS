import { useContext } from "react";
import { AuthContext } from "./auth/AuthWrapper";
import { fingerprint } from "./auth/Fingerprinting";

declare const __BUILD_TIME__: string;
declare const __GIT_HASH__: string;

export const obfuscate = (text: string) => {
  return text.split("-").map((v) => v.slice(0, 3) + "*".repeat(v.length - 3)).join("-")
}

export default function Version() {
  const authContext = useContext(AuthContext);

  return (
    <>
      {__GIT_HASH__} #{__BUILD_TIME__}<br/>{authContext.user?.uid}<br/>{obfuscate(fingerprint)}
    </>
  )
}