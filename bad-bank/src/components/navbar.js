import { Link, useLocation } from "react-router-dom";

export function NavBar() {
  const location = useLocation();

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">BadBank</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/CreateAccount" ? "active" : ''}`} aria-current="page" to="/CreateAccount">Create Account</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/login" ? "active" : ''}`} aria-current="page" to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/deposit" ? "active" : ''}`} aria-current="page" to="/deposit">Deposit</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/withdraw" ? "active" : ''}`} aria-current="page" to="/withdraw">Withdraw</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/balance" ? "active" : ''}`} aria-current="page" to="/balance">Balance</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/alldata" ? "active" : ''}`} aria-current="page" to="/alldata">AllData</Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}