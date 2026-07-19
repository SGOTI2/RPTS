import { Button } from "@firebase-oss/ui-react";
import { useContext, useState } from "react";
import { AuthContext } from "./AuthWrapper";

export default function ReloadData() {
  const authContext = useContext(AuthContext)
  const [working, setWorking] = useState(false);

  return (
    <div className="inline-flex">
      <Button 
        onClick={async () => {
          setWorking(true);
          await authContext.forceDataReload();
          if (authContext.user) {
            const token = await authContext.user!.getIdTokenResult(true)
            authContext.setClaims(token.claims);
          }
          await new Promise((r) => setTimeout(r, 3000)) // Anti-spam
          setWorking(false);
        }}
          className="w-fit"
          disabled={working}>
          {working ? "Working" : "Refresh User Data Cache"}
        </Button>
    </div>
  )
}