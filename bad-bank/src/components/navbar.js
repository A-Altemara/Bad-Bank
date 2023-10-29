import { Link, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "./context";


export function NavBar() {
  const location = useLocation();

  const ctx = useContext(UserContext);

  const isLoggedIn = (ctx?.currentUser ?? null) !== null;
  const userRole = ctx?.currentUser?.role ?? null;
  const [loggedIn, setLoggedIn] = useState(false);


  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="/" data-toggle="tooltip" title="BadBank Home Page">FuzzyPaws Bank</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {/* TODO: make visible when isLoggedIn = true is not visible */}

            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/CreateAccount" ? "active" : ''}`} aria-current="page" to="/CreateAccount" data-toggle="tooltip" title="Click here to create a new account login.">Create Account</Link>
            </li>
            {/* TODO: make visible when isLoggedIn = true shows as logout */}
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/login" ? "active" : ''}`} aria-current="page" to="/login" data-toggle="tooltip" title="Click here to login to your account.">Login</Link>
            </li>
            {/* TODO: make visible when isLoggedIn = false is not visible */}
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/deposit" ? "active" : ''}`} aria-current="page" to="/deposit" data-toggle="tooltip" title="Click here to deposit funds into your account.">Deposit</Link>
            </li>
            {/* TODO: make visible when isLoggedIn = false is not visible */}
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/withdraw" ? "active" : ''}`} aria-current="page" to="/withdraw" data-toggle="tooltip" title="Click here to withdraw funds from your account.">Withdraw</Link>
            </li>
            {/* TODO: make visible when isLoggedIn = false is not visible */}
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/balance" ? "active" : ''}`} aria-current="page" to="/balance" data-toggle="tooltip" title="Click here to check your account balance.">Balance</Link>
            </li>
            {/* TODO update so when isLoggedIN and userRole = admin this is visable */}

            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/alldata" ? "active" : ''}`} aria-current="page" to="/alldata" data-toggle="tooltip" title="Click here to see the data from all users, Admins only (⌐■_■)">AllData</Link>
            </li>
          </ul>
        </div>
        {/* todo: make visible when isLoggedIn = true */}
        <div class="nav navbar-nav navbar-right"> <button type="button" className="btn btn-info navbar-btn">Log Out</button></div>
      </nav>
    </>
  );
}