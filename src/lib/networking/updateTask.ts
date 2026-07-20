import { doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

export type QuickTaskData = {
  status: number,
  pid: number,
}

export async function quickUpdateTask(fscn: string, data: QuickTaskData) {
  await updateDoc(doc(db!, fscn, data.pid.toString()), data);
}