import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "./firebase";

export type TaskData = {
  status: number,
  name: string,
  subteam: number,
  priority: number,
  pid: number,
  quantity: number,
  due: Timestamp
}

export default async function sendTask(fscn: string, data: TaskData) {
  await addDoc(collection(db!, fscn), data);
}