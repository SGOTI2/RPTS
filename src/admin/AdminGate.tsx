import { useContext } from "react";
import { AuthContext } from "../auth/AuthWrapper";
import { Link, Outlet } from "react-router";

export default function AdminGate() {
  const authContext = useContext(AuthContext);

  return authContext.claims?.admin ? (
      <Outlet />
    ) : (
      <div className="flex-1 h-full flex items-center justify-center">
        <div className="flex gap-2">
          <h1 className="text-6xl font-bold tracking-wider">403</h1>
          <div className="flex flex-col justify-between mt-1">
            <h2 className="text-xl inline-block align-bottom">Forbidden</h2>
            <hr className="border-gray-500"/>
            <Link to={"/"} className="text-blue-400">Return Home</Link>
          </div>
        </div>
      </div>
    )

}