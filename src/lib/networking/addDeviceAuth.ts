import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

export async function addDeviceAuth(userId: string, deviceId: string): Promise<undefined> {
  const docRef = doc(db!, "/users/" + userId);
  await updateDoc(docRef, {
    allowedDevices: arrayUnion(deviceId)
  })
}