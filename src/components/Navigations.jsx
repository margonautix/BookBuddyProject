import { Link } from "react-router-dom";

export default function Navigations({ token }) {
  return (
    <>
      <div className="navbar">
        <ul>
          {" "}
          <li>
            <Link to="/">Home</Link>
          </li>
          {!token && (
            <li>
              <Link to="/users/login">Login</Link>
            </li>
          )}
          {token && (
            <li>
              <Link to="/users/login">Logout</Link>
            </li>
          )}
          {!token && (
            <li>
              <Link to="/users/register">Register</Link>
            </li>
          )}
          <li>
            <Link to="/users/me">My Account</Link>
          </li>
        </ul>
      </div>
    </>
  );
}
