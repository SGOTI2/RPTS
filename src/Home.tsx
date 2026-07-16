import { MdCopyright } from "react-icons/md";
import Navbar from "./Navbar";

export default function Home() {
  return (
    <>
      <Navbar className="m-3 mx-auto" />
      <div className="flex-1 flex flex-col justify-between px-16 py-8">
        <div></div>
        <div>
          <h1 className="text-4xl font-bold">RPTS</h1>
          <h6>Robotics Part Tracking System</h6>
        </div>
        <div className="text-xs text-gray-500 flex justify-between">
          <p>Use the navigation bar to enter the shop feed or add to part requests</p>
          <p className="flex items-center gap-0.5"><MdCopyright />FRC 1511 - Rolling Thunder</p>
        </div>
      </div>
    </>
  )
}