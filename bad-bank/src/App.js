import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';
import { NavBar } from './components/navbar';
import { Home } from './components/home';
import { CreateAccount } from './components/createaccount';
import { Login } from './components/login';
import { Deposit } from './components/deposit';
import { Withdraw } from './components/withdraw';
import { Balance } from './components/balance';
import { AllData } from './components/alldata';
import { useState, useEffect } from 'react';

function App() {
  const baseUrl = 'http://localhost:4500';

  const [status, setStatus] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  // need userName, role, balance
  // const user = {
  // name: string,
  // role: string,
  // balance: number
  // }

  // ! balance is initialized temporarily to prevent user.balance from breaking routes using it. There is a better way. I think.
  const [user, setUser] = useState({ balance: 0 });

  // Login a user 
  // this should be the landing page
  // form to fill with email and password
  // if email and password match sends to router
  // router should send back balance and user name and role
  // if email and password do not match, send error message

  // if you are logged in with any user
  // access to depsoit, withdraw, balance pages
  // if you are logged in with admin user
  // access to all data page in addition

  let initializeUser = (email, password) => {
    fetch(`${baseUrl}/account/login/${email}/${password}`)
      .then(async (res) => {
        const tempUser = await res.json()
        console.log("tempUser", tempUser)
        setUser(tempUser)
        setLoggedIn(true)
      })
      .catch((err) => {
        console.log(err);
        return "login failed"
      })
  }


  // let getBalance = () => {
  //   console.log("user from getBalance", user.email)
  //   fetch(`${baseUrl}/account/balance/${user.email}`)
  //     .then(async (res) => {
  //       setBalance(await res.json());

  //       setStatus(`Your balance is: ${balance}`)

  //       if (balance === null) {
  //         setStatus('Balance error, Please contact support')
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);

  //     })
  // }


  let adjustMoney = (amount) => {
    fetch(`${baseUrl}/account/deposit/${user.email}/${Number(amount)}`)
      .then(async (res) => {
        const newBalance = await res.json();
        setUser({ ...user, balance: newBalance })
        if (amount === null) {
          setStatus('Balance error, Please contact support')
        }
      })
      .catch((err) => {
        console.log(err);

      })
    if (user.balance != typeof Number) {
      setStatus('Balance error, Please contact support')
      return status
    }
    return (user.balance, status)
  };

  // todo: create logout function

  return (
    <HashRouter basename="/">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/CreateAccount/"
          element={<CreateAccount />} />
        <Route path="/login/" element={!loggedIn ? <Login initializeUser={initializeUser} /> : <Navigate to="/" />} />

        {/* // Todo: Verify this works with OAuth2 authentication once hooked up */}
        <Route
          path="/deposit/"
          element={loggedIn ? <Deposit balance={user.balance} adjustMoney={adjustMoney} /> : <Navigate to="/login" />}
        />
        <Route
          path="/withdraw/"
          element={loggedIn ? <Withdraw balance={user.balance} adjustMoney={adjustMoney} /> : <Navigate to="/login" />}
        />
        <Route
          path="/balance/"
          element={loggedIn ? <Balance balance={user.balance} /> : <Navigate to="/login" />} />
        {/* // todo:  only accessible if admin. if admin, render here */}
        <Route path="/alldata/" element={loggedIn ? <AllData /> : <Navigate to="/login" />} />



      </Routes>
    </HashRouter>
  );
}

export default App;
