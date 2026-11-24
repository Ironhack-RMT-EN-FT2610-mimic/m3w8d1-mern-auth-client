import { useContext } from "react"
import { AuthContext } from "../context/auth.context"
import { Navigate } from "react-router-dom"

function OnlyPrivate(props) {

  const { loggedUser } = useContext(AuthContext)

  if (loggedUser) {
    return props.children // render the page
  } else {
    return <Navigate to="/login"/> // go to login
  }

}
export default OnlyPrivate