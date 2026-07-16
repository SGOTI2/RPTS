import { Outlet } from "react-router";
import Navbar from "./Navbar";

export default function NavbarWrapper() {
  return <>
    <Navbar className="m-3 mb-0 me-auto" />
    <Outlet />
  </>
}