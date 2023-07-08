function CreateAccount() {
   const [show, setShow]         = React.useState(true);
   const [status, setStatus]     = React.useState('');
   const [name, setName]         = React.useState('');
   const [email, setEmail]       = React.useState('');
   const [password, setPassword] = React.useState('');
    const ctx = React.useContext(UserContext);

    function validate(field, label) { // only validates that there is something in the field should be expanded to actually validate the fields.
        if (!field) {
            setStatus('Error: ' + label);
            setTimeout(() => setStatus(''),3000);
            return false
        }
        return true;
    }

    function handleCreate() { // this shows the values in the console to check its working, revalidates the data and pushes the user into our context and hides our user and allows the user to add another.
        console.log(name, email, password);
        if (!validate(name, 'name')) return;
        if (!validate(email, 'email')) return;
        if (!validate(password, 'password')) return;
        ctx.users.push({name, email, password, balance:100});
        setShow(false);
    }

    function clearForm() {
        setName('');
        setEmail('');
        setPassword('');
        setShow(true);
    }

    return (
        <Card
            bgcolor="primary"
            header='Create Account'
            status={status}
            body={show ? (
                <>
                Name<br/>
                <input type="input" className="form-control" id="name" placeholder="Enter Name" value={name} onChange={e => setName(e.currentTarget.value)}/><br/>
                Email address<br/>
                <input type="input" className="form-control" id="email" placeholder="Enter Email" value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
                Password<br/>
                <input type="input" className="form-control" id="password" placeholder="Enter Password" value={password} onChange={e => setPassword(e.currentTarget.value)}/><br/>
                <button type="submit" className="btn btn-light" onClick={handleCreate} >Create Account</button>
                </>
            ) : (
                <>
                <h5>Success</h5>
                <button type="submit" className="btn btn-light" onClick={clearForm} >Add Another Account</button>

                </>
            )}
        />
    )
}