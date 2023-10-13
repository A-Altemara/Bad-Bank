import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
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
    <HashRouter basename="/">
      <NavBar />
      <UserContext.Provider value={{ currentUser: null, users: [{ name: 'able', email: 'able@mit.edu', password: 'secret', balance: 100, role: "user" }, { name: 'admin', email: 'admin@mit.edu', password: 'secret', balance: 100, role: "admin" }] }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/CreateAccount/" element={<CreateAccount />} />
          <Route path="/login/" element={<Login />} />
          <Route path="/deposit/" element={<Deposit />} />
          <Route path="/withdraw/" element={<Withdraw />} />
          <Route path="/balance/" element={<Balance />} />
          <Route path="/alldata/" element={<AllData />} />
        </Routes>
      </UserContext.Provider>
    </HashRouter>
  );
}

export default App;
