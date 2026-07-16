import { useContext } from "react";
import Version from "../Version";
import LivePanel from "./LivePanel";
import { UnifiedStaticState } from "../lib/unifiedStaticState";
import Time from "./Time";
import PartCounter from "./PartCounter";
import { AuthContext } from "../auth/AuthWrapper";
import { Link } from "react-router";
import { fingerprint } from "../auth/Fingerprinting";

export default function PanelAggregator() {
  const authContext = useContext(AuthContext);
  const unifiedStaticState = useContext(UnifiedStaticState);

  if (true) {
    return (
      <div className="flex-1 h-full flex items-center justify-center">
      <div>
        <div className="flex">
          <h1 className="text-6xl font-bold tracking-wider">401</h1>
          <div className="flex flex-col justify-between mt-1">
            <h2 className="text-xl inline-block align-bottom">Unauthorized</h2>
            <hr className="border-gray-500"/>
            <Link to={"/"} className="text-blue-400">Return Home</Link>
          </div>
        </div>
        <p className="flex flex-col text-xs text-gray-500 mt-3">
          Authority:
          <small className="text-xs text-gray-500">{authContext.user?.uid ?? "Not logged in"}</small>
          <small className="text-xs text-gray-500">{fingerprint}</small>
        </p>
      </div>
    </div>
    )
  }

  return (
    <div className="flex-1 pb-5 flex flex-col h-dvh">
      <div className="flex justify-even px-5">
        <div className="flex-1 pt-5">
          <Time />
        </div>
        <small className="flex-1 text-center text-gray-500 pt-1">RPTS <Version /></small>
        <div className="flex-1 text-right pt-5">
          <h3 className="text-xl">Parts</h3>
          <PartCounter />
        </div>
      </div>
      <div className="flex-1 py-5 gap-5 px-5 grid xl:grid-cols-2 grid-cols-1 overflow-scroll h-full">
        {unifiedStaticState.fscn.map((fscn, i) => // TODO: Make it so ya can organzize this
          <LivePanel fscn={fscn} key={i}/>
        )}
      </div>
    </div>
  )
}