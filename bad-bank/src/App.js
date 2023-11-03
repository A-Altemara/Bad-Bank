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
import { useState, useEffect, useCallback } from 'react';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD3sGSgZU17iwVqaw8r2gcEEGRPfpiVu1w",
  authDomain: "airiel-altemarafullstackbank.firebaseapp.com",
  projectId: "airiel-altemarafullstackbank",
  storageBucket: "airiel-altemarafullstackbank.appspot.com",
  messagingSenderId: "212305478592",
  appId: "1:212305478592:web:3f8e98342b969e8a2f7e25",
  measurementId: "G-3M8EF3KY4Q"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();


function App() {
  const baseUrl = 'http://localhost:4500';

  const [status, setStatus] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  // ! balance is initialized temporarily to prevent user.balance from breaking routes using it. There is a better way. I think.
  const [user, setUser] = useState({ balance: 0 });

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

  let adjustMoney = (amount) => {
    fetch(`${baseUrl}/account/adjust/${user.email}/${Number(amount)}`)
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

  function logIn(email, password) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        initializeUser(email, password)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  // duplicated on createaccount.js should be moved to shared folder when custom hook is created
  function googleLogin(createUser = false) {
    console.log("google sign in clicked");
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log("user, ", user)

        if (createUser) {
          const url = `${baseUrl}/account/create/${user.displayName}/${user.email}/OAuth`;
          (async () => {
            var res = await fetch(url);
            // var data = await res.json();
            // console.log(data);
          })();
        }

        return initializeUser(user.email, "OAuth")
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log("error", error)
      });
  };

  function createWithFirebase(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        return
        // ..
      })
  }

  const logOut = useCallback(() => {
    const user = auth.currentUser;
    if (user) {
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          setLoggedIn(false);
          setUser(null);
          window.location.href = '/';
          console.log('User signed out');
        })
        .catch((error) => {
          // An error happened.
          console.error('Sign-out error:', error);
        });
    } else {
      console.log('No user is currently signed in.');
    }
  }, []);

  useEffect(() => {
    setLoggedIn(false);
  }, [logOut]);

  return (
    <HashRouter basename="/">
      <NavBar user={user} isLoggedIn={loggedIn} signOut={logOut} />
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/CreateAccount"
          element={<CreateAccount initializeUser={initializeUser} createWithFirebase={createWithFirebase} googleLogin={googleLogin} />} />
        <Route
          path="/login"
          element={!loggedIn ? <Login logIn={logIn} googleLogin={googleLogin} /> : <Navigate to="/" />} />
        {/* // Todo: Verify this works with OAuth2 authentication once hooked up */}
        <Route
          path="/deposit"
          element={loggedIn ? <Deposit balance={user.balance} adjustMoney={adjustMoney} /> : <Navigate to="/login" />}
        />
        <Route
          path="/withdraw"
          element={loggedIn ? <Withdraw balance={user.balance} adjustMoney={adjustMoney} /> : <Navigate to="/login" />}
        />
        <Route
          path="/balance"
          element={loggedIn ? <Balance balance={user.balance} /> : <Navigate to="/login" />}
        />
        <Route
          path="/alldata"
          element={loggedIn ? <AllData /> : <Navigate to="/login" />} />

      </Routes>
    </HashRouter>
  );
}

export default App;
