import { TaskPriority, TaskStatus, type Task } from "../lib/Task";
import Cell from "./Cell";

export default function LivePanel() {
  const tasks: Task[] = [
    {
      status: TaskStatus.Done,
      subteam: 0,
      priority: TaskPriority.High,
      part: 2,
      qty: 1,
      due: new Date(2026, 6, 13, 22, 30)
    },
    {
      status: TaskStatus.InProgress,
      subteam: 1,
      priority: TaskPriority.Low,
      part: 5,
      qty: 2,
      due: new Date(2026, 6, 13, 22, 30)
    },
    {
      status: TaskStatus.NotStarted,
      subteam: 2,
      priority: TaskPriority.Medium,
      part: 8,
      qty: 1,
      due: new Date(2026, 6, 13, 22, 30)
    },
    {
      status: TaskStatus.Waiting,
      subteam: 3,
      priority: TaskPriority.Low,
      part: 9,
      qty: 1,
      due: new Date(2026, 6, 13, 23, 0)
    },
    {
      status: TaskStatus.Outdated,
      subteam: 3,
      priority: TaskPriority.Low,
      part: 12,
      qty: 1,
      due: new Date()
    }
  ]
  return (
    <div
      className="rounded border border-gray-700 bg-gray-800 py-5 px-4 min-w-2xl h-92"
      style={{ fontFamily: "JetBrains Mono" }}
    >
      <h4 className="text-2xl pb-4">Wood Laser</h4>
      <table className="w-full text-left table-fixed">
        <thead className="table-header-group h-8">
          <th className="border border-gray-700 py-1 ps-2 w-32">Status</th>
          <th className="border border-gray-700 py-1 ps-2">Subteam</th>
          <th className="border border-gray-700 py-1 ps-2 w-24">Priority</th>
          <th className="border border-gray-700 py-1 ps-2 w-14">Part</th>
          <th className="border border-gray-700 py-1 ps-2 w-12">QTY</th>
          <th className="border border-gray-700 py-1 ps-2">Due</th>
        </thead>
        <tbody>
          {tasks.map((task, taskIndex) => (
            <tr className="leading-none overflow-hidden h-4">
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