import { collection, getDocs, query } from "firebase/firestore";
import { db } from "./firebase";
import { convertFromDoc } from "./convertDoc";

export default async function GetFullFeed(fscn: string) {
  console.log("req")
  const docs = await getDocs(query(collection(db!, "/"+fscn)));

  if (docs.empty) {
    console.log("No docs for fscn:", fscn)
    return []
  }

  return docs.docs.map((doc) => {
    if (!doc.exists()) {
      console.log("A doc didn't exist? When doing a full feed refresh");
      return;
    }
    return convertFromDoc(doc.data(), doc.id);
  })
}