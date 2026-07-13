import { Priority, TaskStatus, type Task } from "../lib/Task";
import Cell from "./Cell";

export default function LivePanel() {
  const tasks: Task[] = [
    {
      status: TaskStatus.Done,
      subteam: 0,
      priority: Priority.High,
      part: 2,
      qty: 1,
      due: new Date()
    },
    {
      status: TaskStatus.InProgress,
      subteam: 1,
      priority: Priority.Low,
      part: 5,
      qty: 2,
      due: new Date()
    },
    {
      status: TaskStatus.NotStarted,
      subteam: 2,
      priority: Priority.Medium,
      part: 8,
      qty: 1,
      due: new Date()
    }
  ]
  return (
    <div
      className="rounded border border-gray-700 bg-gray-800 py-5 px-4 max-w-2xl"
      style={{ fontFamily: "JetBrains Mono" }}
    >
      <h4 className="text-2xl">Wood Laser</h4>
      <table className="w-full text-left table-fixed">
        <thead>
          <th className="border border-gray-700 py-1 ps-2">Status</th>
          <th className="border border-gray-700 py-1 ps-2">Subteam</th>
          <th className="border border-gray-700 py-1 ps-2">Priority</th>
          <th className="border border-gray-700 py-1 ps-2">Part #</th>
          <th className="border border-gray-700 py-1 ps-2">QTY</th>
          <th className="border border-gray-700 py-1 ps-2">Due</th>
        </thead>
        <tbody>
          {tasks.map((task, taskIndex) => (
            <tr>
              {(Object.keys(task) as Array<keyof Task>).map((dataKey) => 
                <Cell task={task} dataKey={dataKey} key={taskIndex+dataKey} />
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}