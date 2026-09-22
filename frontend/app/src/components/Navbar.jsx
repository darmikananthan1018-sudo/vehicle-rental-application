import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("access_token")
  );

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("token_type");

    setIsLoggedIn(false);

    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

      <div className="container">

        <Link
          className="navbar-brand fw-bold"
          to="/"
        >
          🚗 Vehicle Rental
        </Link>

        <div className="ms-auto">

          <ul className="navbar-nav d-flex flex-row">

            <li className="nav-item">
              <Link
                className="nav-link px-3"
                to="/"
              >
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link px-3"
                to="/vehicles"
              >
                Vehicles
              </Link>
            </li>

            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link px-3"
                    to="/profile"
                  >
                    Profile
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className="nav-link px-3"
                    to="/my-bookings"
                  >
                    My Bookings
                  </Link>
                </li>

                <li className="nav-item">
                  <button
                    className="btn btn-link nav-link px-3"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link px-3"
                    to="/login"
                  >
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className="nav-link px-3"
                    to="/register"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}

          </ul>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;