import { useContext } from "react";
import Logout from "./auth/Logout";
import ReloadData from "./auth/ReloadData";
import SignIn from "./auth/SignIn";
import { AuthContext } from "./auth/AuthWrapper";
import { MdCheckCircle, MdClose } from "react-icons/md";
import { cnw } from "./lib/tailwindUtil";
import { fingerprint } from "./auth/Fingerprinting";
import { obfuscate } from "./Version";

export default function Account() {
  const authContext = useContext(AuthContext);

  return (
    <div className="flex-1 p-5">
      <div className="flex justify-between flex-col md:flex-row items-start">
        <div>
          <h2 className="text-3xl font-bold tracking-wide">
            Account Management
          </h2>
          {authContext.user &&
            <h4 className={cnw(
              "text-red-500 inline-flex gap-1 items-center mt-1 text-lg",
              "text-green-500!", !!authContext.claims?.verified
            )}>{!!authContext.claims?.verified ?
              <>Verified <MdCheckCircle /></> :
              <>Unverified <MdClose /></>}
            </h4>}
        </div>
        <div>
          <p className="text-xs text-gray-500 text-end">
            {authContext.user?.uid ?? "Not logged in"}<br/>
            {obfuscate(fingerprint)}<br/>
            {authContext.claims?.verified ? 1 : 0}
            {authContext.claims?.feedAllow ? 1 : 0}
          </p>
        </div>
      </div>
      <div className="mt-6 flex flex-col gap-3">
        <p>I can't be bothered to make 3 different pages for a proper login flow, you figure it out</p>
        <SignIn />
        <Logout />
        <ReloadData />
      </div>
    </div>
  )
}