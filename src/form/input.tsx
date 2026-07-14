import { cnw } from "../lib/tailwindUtil";

export default function Input({ failedReason, ...props }: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {failedReason: string}) {
  return (<>
    <input
      className={cnw(
        "bg-gray-100 dark:bg-gray-900 px-3 py-2 border rounded border-gray-300 dark:border-gray-800 placeholder-gray-400 dark:placeholder-gray-500 outline-none focus:dark:border-blue-500 focus:border-blue-500 w-full",
        "border-red-500", failedReason)}
      required
      minLength={1}
      {...props} />
    {failedReason && <p className="text-red-500 font-medium text-sm">{failedReason}</p>}
  </>);
}