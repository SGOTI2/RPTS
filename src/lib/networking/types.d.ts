import type { Unsubscribe } from "firebase/database";

// An object that updates based on a snapshot listener in firestore
export type Feed = {
  data: Array[Task],
  name: string,
  latestUpdate: Date,
  available: boolean,
  isAcquiring: boolean,
  unsubscribe: Unsubscribe
}