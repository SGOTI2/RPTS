import { TaskStatus, type Task } from "../lib/Task";
import { cnw } from "../lib/tailwindUtil";

// DataKey represents the key in `task` that this cell represents
export default function Cell({ task, dataKey }: { task: Task, dataKey: keyof Task }) {
    return (
        <td className={cnw(
            "border border-gray-700 py-1 ps-2",
            "bg-red-500/40",   dataKey == "status" && task.status == TaskStatus.NotStarted,
            "bg-green-500/40", dataKey == "status" && task.status == TaskStatus.InProgress,
            "bg-blue-500/40",  dataKey == "status" && task.status == TaskStatus.Done,
        )}>{task[dataKey].toString()}</td>
    )
}