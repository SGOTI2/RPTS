import { Link, Outlet } from "react-router";

export default function NavbarWrapper() {
  return <>
    <nav className="flex align-center items-center gap-6 border-b border-b-gray-700 p-3">
      <Link to={"/"} className="inline-flex items-center gap-3">
        <img src="/favicon.svg" className="h-6"/>
        <h6 className="text-xl">RPTS</h6>
      </Link>
      <Link to={"/livefeed"}>Live Feed</Link>
    </nav>
    <Outlet />
  </>
}