import { useContext, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import { useNavigate } from "react-router-dom";
import service from "../../services/index.services";

function Login() {

  const navigate = useNavigate()

  const { setLoggedUser } = useContext(AuthContext)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null)

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();

    const body = {
      email,
      password
    }

    console.log(body)

    try {
      // ... contact backend to validate user credentials
      const response = await service.post("/auth/login", body)
      console.log("user logged in", response.data)

      //* store the user payload into a context
      setLoggedUser(response.data.payload)

      //* store the user auth token into the localStorage
      localStorage.setItem("authToken", response.data.authToken)

      navigate("/private-page-example")

    } catch (error) {
      console.log(error)
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.message)
      } else {
        // ... you would send the user to a generic error page here.
      }
    }
  };

  return (
    <div>

      <h1>Login Form</h1>

      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />

        <br />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <br />

        <button type="submit">Login</button>

        { errorMessage && <p>{errorMessage}</p> }

      </form>
      
    </div>
  );
}

export default Login;
