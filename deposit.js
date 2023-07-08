function Deposit() {
    const ctx = React.useContext(UserContext);
    const [show, setShow] = React.useState(true);
    const [status, setStatus] = React.useState('');
    const [deposit, setDeposit] = React.useState('');

    React.useEffect(() => {
        setShow(ctx.users[ctx.index] === 1);
    }, [ctx.index]); // this is supposed to hanld the toggle of the logged in user and it is not working correctly.

    function validate(field) { // only validates that there is something in the field should be expanded to actually validate the fields.
        if (!field) {
            setStatus('Error: No amount entered');
            setTimeout(() => setStatus(''), 3000);
            return false
        }
        return true;
    }


    function handleDeposit() {
        console.log(deposit);
        if (!validate(deposit, 'deposit')) return;

        ctx.users[ctx.index].balance = ctx.users[ctx.index].balance + deposit;
    }

    return (
        <Card
            bgcolor="primary"
            header='Deposit'
            status={status}
            body={ctx.currentUser !== null ? (
                <>
                    {/* still need to add the visiable balance to this card and get the format correct and get the toggle of the show not show to to work properly*/}
                    Balance <br />
                    Deposit Amount<br />
                    <input type="input" className="form-control" id="deposit" placeholder="Enter Amount" value={deposit} onChange={e => setDeposit(Number(e.currentTarget.value))} /><br />
                    <button type="submit" className="btn btn-light" onClick={handleDeposit}>Deposit</button>
                </>
            ) : (
                <>
                    <h5>Please Login</h5>
                    <button type="submit" className="btn btn-light"><a href='/login/' >Click to Go to Login Page</a></button>
                    {/* need to fix routing on this button as it doesn't work at all. */}

                </>
            )}
        />
    )
}