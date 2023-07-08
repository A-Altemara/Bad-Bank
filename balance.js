function Balance() {
    const ctx = React.useContext(UserContext);
    const [show, setShow]         = React.useState(true);
    const [status, setStatus]     = React.useState('');
    const [withdrawal, setWithdrawal]   = React.useState('');

    React.useEffect(() => {
        setShow(ctx.users[ctx.index] === 1);
    }, [ctx.index]); // this is supposed to hanld the toggle of the logged in user and it is not working correctly.

    return (
        <Card
        bgcolor="primary"
        header='Balance'
        status={status}
        body={show ? (
            <>
            {/* still need to add the visiable balance to this card and get the format correct and get the toggle of the show not show to to work properly*/}
            Balance <br/>
            Your Balance is<br/>
            {/* balance goes here */}
        
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