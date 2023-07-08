function Spa() {
    return (
        <HashRouter>
            <NavBar />
            <UserContext.Provider value={{ currentUser: null, users: [{ name: 'able', email: 'able@mit.edu', password: 'secret', balance: 100 }] }}>
                <Route path="/" exact component={Home} />
                <Route path="/CreateAccount/" exact component={CreateAccount} />
                <Route path="/login/" exact component={Login} />
                <Route path="/deposit/" exact component={Deposit} />
                <Route path="/withdraw/" exact component={Withdraw} />
                <Route path="/balance/" exact component={Balance} />
                <Route path="/alldata/" exact component={AllData} />
            </UserContext.Provider>
        </HashRouter>

    )
}

ReactDOM.render(
    <Spa />,
    document.getElementById('root')
);

