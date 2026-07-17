import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="flex-1 h-full flex items-center justify-center">
      <div className="flex gap-2">
        <h1 className="text-6xl font-bold tracking-wider">404</h1>
        <div className="flex flex-col justify-between mt-1">
          <h2 className="text-xl inline-block align-bottom">Not Found</h2>
          <hr className="border-gray-500"/>
          <Link to={"/"} className="text-blue-400">Return Home</Link>
        </div>
      </div>
    </div>
  )
}