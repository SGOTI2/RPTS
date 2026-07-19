import { useContext } from "react";
import Logout from "./auth/Logout";
import ReloadData from "./auth/ReloadData";
import SignIn from "./auth/SignIn";
import { AuthContext } from "./auth/AuthWrapper";
import { MdCheckCircle, MdClose } from "react-icons/md";
import { cnw } from "./lib/tailwindUtil";

export default function Account() {
  const authContext = useContext(AuthContext);

  return (
    <div className="flex-1 p-5">
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
      <div className="mt-6 flex flex-col gap-3">
        <SignIn />
        <Logout />
        <ReloadData />
      </div>
    </div>
  )
}