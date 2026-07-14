import { useContext } from "react";
import Version from "../Version";
import LivePanel from "./LivePanel";
import { UnifiedStaticState } from "../lib/unifiedStaticState";
import Time from "./Time";
import PartCounter from "./PartCounter";

export default function PanelAggregator() {
  const unifiedStaticState = useContext(UnifiedStaticState);

  return (
    <div className="flex-1 pb-5">
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
      <div className="py-5 flex overflow-x-scroll gap-5 px-5">
        {unifiedStaticState.fscn.map((fscn, i) => // TODO: Make it so ya can organzize this
          <LivePanel fscn={fscn} key={i}/>
        )}
      </div>
    </div>
  )
}