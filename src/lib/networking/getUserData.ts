import { doc, getDocFromCache, getDocFromServer } from "firebase/firestore";
import { db } from "./firebase";

export type UserData = {
  allowedDevices: string[]
}

export async function getUserData(userId: string, forceRefresh: boolean = false): Promise<UserData | undefined> {
  const userDocQuery = doc(db!, "/users/" + userId);
  if (!forceRefresh) {
    let userData = await getDocFromCache(userDocQuery);
    if (userData.exists()) return userData.data() as UserData;
  }

  let userData = await getDocFromServer(userDocQuery);
  return userData.data() as UserData | undefined;
}