import { Button } from "@firebase-oss/ui-react";
import { useContext, useState } from "react";
import { Auth, AuthContext } from "./AuthWrapper";

export default function Logout() {
  const authContext = useContext(AuthContext)
  const [working, setWorking] = useState(false);

  return (
    <div className="inline-flex">
      <Button 
        onClick={() => {
          setWorking(true);
          Auth?.signOut().then(() => {
            authContext.setUser(undefined);
          }).finally(() => {
            setWorking(false);
          })
        }}
          className="w-fit"
          disabled={working}>
          {working ? "Working" : "Logout"}
        </Button>
    </div>
  )
}