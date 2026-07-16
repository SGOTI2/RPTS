import { GitHubSignInButton } from "@firebase-oss/ui-react";
import { useContext } from "react";
import { AuthContext } from "./AuthWrapper";

export default function SignIn() {
  const authContext = useContext(AuthContext)

  return (
    <div className="inline-flex">
      <GitHubSignInButton onSignIn={(user) => {
        console.log("er")
        authContext.setUser(user.user)
      }} themed />
    </div>
  )
}