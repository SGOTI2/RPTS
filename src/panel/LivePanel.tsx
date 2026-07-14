import { useContext, useEffect, useState } from "react";
import { TaskPriority, TaskStatus, type Task } from "../lib/Task";
import Cell from "./Cell";
import type { Feed } from "../lib/networking/types";
import { FeedManager } from "../lib/feedManager";

export default function LivePanel() {
  const feedManager = useContext(FeedManager)

  const [tasks, setTasks] = useState<Task[]>([
    {
      status: TaskStatus.Done,
      name: "Lil Lil Lil Lil Lil LilLil",
      subteam: 0,
      priority: TaskPriority.High,
      part: 2,
      qty: 1,
      due: new Date(2026, 6, 13, 22, 30)
    },
    {
      status: TaskStatus.InProgress,
      name: "Lil Lil Lil Lil Lil LilLil",
      subteam: 1,
      priority: TaskPriority.Low,
      part: 5,
      qty: 2,
      due: new Date(2026, 6, 13, 22, 30)
    },
    {
      status: TaskStatus.NotStarted,
      name: "Lil Lil Lil Lil Lil LilLil",
      subteam: 2,
      priority: TaskPriority.Medium,
      part: 8,
      qty: 1,
      due: new Date(2026, 6, 13, 22, 30)
    },
    {
      status: TaskStatus.Waiting,
      name: "Lil Lil Lil Lil Lil LilLil",
      subteam: 3,
      priority: TaskPriority.Low,
      part: 9,
      qty: 1,
      due: new Date(2026, 6, 13, 23, 0)
    },
    {
      status: TaskStatus.Outdated,
      name: "Lil Lil Lil Lil Lil LilLil",
      subteam: 3,
      priority: TaskPriority.Low,
      part: 12,
      qty: 1,
      due: new Date()
    }
  ]);

  useEffect((() => {
    (async () => {
      await feedManager.acquireFeed("CNC")
    })();
  }), [feedManager])

  return (
    <div
      className="rounded border border-gray-700 bg-gray-800 py-5 px-4 min-w-3xl h-92 shadow-[6px_6px_0px] shadow-gray-950/25"
      style={{ fontFamily: "JetBrains Mono" }}
    >
      <h4 className="text-3xl pb-4 font-bold">CNC</h4>
      <table className="w-full text-left table-fixed">
        <thead className="table-header-group h-8">
          <th className="border border-gray-700 py-1 ps-2 w-32">Status</th>
          <th className="border border-gray-700 py-1 ps-2">Name</th>
          <th className="border border-gray-700 py-1 ps-2">Subteam</th>
          <th className="border border-gray-700 py-1 ps-2 w-24">Priority</th>
          <th className="border border-gray-700 py-1 ps-2 w-14">Part</th>
          <th className="border border-gray-700 py-1 ps-2 w-12">QTY</th>
          <th className="border border-gray-700 py-1 ps-2">Due</th>
        </thead>
        <tbody>
          {tasks.map((task, taskIndex) => (
            <tr className="leading-none overflow-hidden h-4" key={taskIndex}>
              {(Object.keys(task) as Array<keyof Task>).map((dataKey) => 
                <Cell task={task} dataKey={dataKey} key={taskIndex+dataKey} />
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div/>
    </div>
  )
}