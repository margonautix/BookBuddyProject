import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import bookLogo from "./assets/books.png";
import Books from "./components/Books";
import Navigations from "./components/Navigations";
import SingleBook from "./components/SingleBook";
import Login from "./components/Login";
import Register from "./components/Register";
import Account from "./components/Account";
import { getReservations } from "./API";
import { useEffect } from "react";

function App() {
  const [token, setToken] = useState(null);
  const [searchParams, setSearchParams] = useState("");
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    if (token) {
      const fetchReservations = async () => {
        const response = await getReservations(token);
        setReservations(response);
      };

      fetchReservations();
    }
  }, []);

  return (
    <>
      <div id="navigation">
        <Navigations setSearchParams={setSearchParams} token={token} />
      </div>
      <h1 className="header">
        <img id="logo-image" src={bookLogo} />
        Library App
      </h1>
      <div id="book-div">
        <Routes>
          <Route
            path="/"
            element={
              <Books
                searchParams={searchParams}
                setSearchParams={setSearchParams}
              />
            }
          />
          <Route path="books/:id" element={<SingleBook token={token} />} />
          <Route
            path="/users/login"
            element={<Login token={token} setToken={setToken} />}
          />
          <Route
            path="/users/register"
            element={<Register token={token} setToken={setToken} />}
          />
          <Route
            path="/users/me"
            element={
              <Account
                token={token}
                setToken={setToken}
                reservations={reservations}
                setReservations={setReservations}
              />
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
