import { Checkbox } from "@base-ui/react/checkbox";
import { MdOutlineCheck } from "react-icons/md";

export default function FancyCheckBox({ onCheck, name, defaultChecked }: { onCheck: (checked: boolean, ev: Checkbox.Root.ChangeEventDetails) => void, name?: string, defaultChecked?: boolean }) {
  return <Checkbox.Root
    className="flex size-5 items-center justify-center rounded-sm outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800 data-checked:dark:bg-blue-500 data-checked:bg-blue-500 border data-checked:border-transparent data-unchecked:border-gray-300 data-unchecked:dark:border-gray-700"
    onCheckedChange={onCheck}
    defaultChecked={defaultChecked}
    name={name ?? ""}
    id={name ?? ""}
  >
    <Checkbox.Indicator className="flex text-gray-50 data-unchecked:hidden">
      <MdOutlineCheck />
    </Checkbox.Indicator>
  </Checkbox.Root>
}