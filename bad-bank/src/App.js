import logo from './logo.svg';
import './App.css';
import bootstrap from 'bootstrap'
import { HashRouter, Route, Routes } from 'react-router-dom';
import { NavBar } from './components/navbar';
import { UserContext } from './components/context';
import { Home } from './components/home';
import { CreateAccount } from './components/createaccount';
import { Login } from './components/login';
import { Deposit } from './components/deposit';
import { Withdraw } from './components/withdraw';
import { Balance } from './components/balance';
import { AllData } from './components/alldata';

function App() {
  return (
    <HashRouter>
      <NavBar />
      <UserContext.Provider value={{ currentUser: null, users: [{ name: 'able', email: 'able@mit.edu', password: 'secret', balance: 100 }] }}>
        <Routes>
          <Route path="/" exact component={Home} />
          <Route path="/CreateAccount/" exact component={CreateAccount} />
          <Route path="/login/" exact component={Login} />
          <Route path="/deposit/" exact component={Deposit} />
          <Route path="/withdraw/" exact component={Withdraw} />
          <Route path="/balance/" exact component={Balance} />
          <Route path="/alldata/" exact component={AllData} />
        </Routes>
      </UserContext.Provider>
    </HashRouter>
  );
}

export default App;
