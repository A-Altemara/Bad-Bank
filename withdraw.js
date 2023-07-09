function Withdraw() {
    const ctx = React.useContext(UserContext);
    const [status, setStatus] = React.useState('');
    const [withdrawal, setWithdrawal] = React.useState('');
    const [balance, setBalance] = React.useState(null);

    function findCurrentUser() {
        return ctx.users.find((user) => user.email === ctx.currentUser);
    }

    function initialieBalance() {
        setBalance(findCurrentUser().balance)
        return balance
    }

    function validate(field) { // only validates that there is something in the field should be expanded to actually validate the fields.
        if (!field) {
            setStatus('Error: No amount entered');
            setTimeout(() => setStatus(''), 3000);
            return false
        }
        return true;
    }


    function handleWithdrawal() {
        console.log(withdrawal);
        if (!validate(withdrawal, 'withdrawal')) return;
        if (withdrawal > balance) {
            setStatus('Insufficient funds.');
            return;
        }

        setBalance(balance - withdrawal);
        findCurrentUser().balance -= withdrawal;
    }

    return (
        <Card
            bgcolor="primary"
            header='Withdrawal'
            status={status}
            body={ctx.currentUser !== null ? (
                <>
                    {/* still need to add the visiable balance to this card and get the format correct and get the toggle of the show not show to to work properly*/}
                    Balance <br /> {balance === null ? initialieBalance() : balance} <br />
                    Amount<br />
                    <input type="input" className="form-control" id="" placeholder="Enter Amount" value={withdrawal} onChange={e => setWithdrawal(Number(e.currentTarget.value))} /><br />
                    <button type="submit" className="btn btn-light" onClick={handleWithdrawal}>Withdraw</button>
                </>
            ) : (
                <>
                    <h5>Please Login</h5>
                    <button type="submit" className="btn btn-light">Withdraw<a href='/login/' >Click to Go to Login Page</a></button>
                    {/* need to fix routing on this button as it doesn't work at all. */}

                </>
            )}
        />
    )
}