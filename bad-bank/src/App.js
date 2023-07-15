import logo from './logo.svg';
import './App.css';
import bootstrap from 'bootstrap'
import { HashRouter, Route } from 'react-router-dom';
import { NavBar } from './components/navbar';
import { UserContext } from './components/context'

function App() {
  return (
    <>Hello World</>
    // <HashRouter>
    //   <NavBar />
    //   <UserContext.Provider value={{ currentUser: null, users: [{ name: 'able', email: 'able@mit.edu', password: 'secret', balance: 100 }] }}>
    //     <Route path="/" exact component={Home} />
    //     <Route path="/CreateAccount/" exact component={CreateAccount} />
    //     <Route path="/login/" exact component={Login} />
    //     <Route path="/deposit/" exact component={Deposit} />
    //     <Route path="/withdraw/" exact component={Withdraw} />
    //     <Route path="/balance/" exact component={Balance} />
    //     <Route path="/alldata/" exact component={AllData} />
    //   </UserContext.Provider>
    // </HashRouter>
  );
}

export default App;
