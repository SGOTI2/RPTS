import Logout from "./auth/Logout";
import SignIn from "./auth/SignIn";

export default function Account() {
  return (
    <div className="flex-1 p-5">
      <h2 className="mb-6 text-3xl font-bold tracking-wide">
        Account Management
      </h2>
      <div className="flex flex-col gap-3">
        <SignIn />
        <Logout />
      </div>
    </div>
  )
}