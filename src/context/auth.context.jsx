import { createContext, useEffect, useState } from "react";
import service from "../services/index.services";

const AuthContext = createContext()

function AuthWrapper(props) {

  const [ loggedUser, setLoggedUser ] = useState(null)
  const [ isAuthenticating, setIsAuthenticating ] = useState(true)

  const authenticateUser = async () => {
    // this function will find the token in localstorage, send it to the backend for decrypting, receive the payload and store the payload in the global state.

    const authToken = localStorage.getItem("authToken")
    if (!authToken) {
      setLoggedUser(null)
      setIsAuthenticating(false)
      return // if there is no token, don't call the backend
    }

    try {
      
      const response = await service.get("/auth/verify")

      console.log("token valid", response.data)

      setLoggedUser(response.data)
      setIsAuthenticating(false)

    } catch (error) {
      console.log("token not valid", error)
      setLoggedUser(null)
      setIsAuthenticating(false)
    }

  }

  const passedContext = {
    loggedUser,
    setLoggedUser,
    authenticateUser
  }

  useEffect(() => {
    authenticateUser()
  }, [])

  if (isAuthenticating) {
    return <h2>...Authenticating</h2>
  }

  return (
    <AuthContext.Provider value={passedContext}>
      {props.children}
    </AuthContext.Provider>
  )

}

export {
  AuthContext,
  AuthWrapper
}