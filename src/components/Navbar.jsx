import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function Navbar() {

  const navigate = useNavigate()

  const { loggedUser, setLoggedUser } = useContext(AuthContext)

  const handleLogout = () => {
    setLoggedUser(null)
    localStorage.removeItem("authToken")
    navigate("/login")
  }

  return (
    <nav>
      <Link to="/">Home</Link>
      { !loggedUser && <Link to="/signup">Signup</Link> }
      { !loggedUser && <Link to="/login">Login</Link> }
      { loggedUser && <Link to="/private-page-example">Private Page Example</Link> }
      { loggedUser && <button onClick={handleLogout}>Logout</button> }
      <br />
      { loggedUser?.role === "admin" && <Link>Go to admin dashboard</Link> }
    </nav>
  );
}

export default Navbar;
