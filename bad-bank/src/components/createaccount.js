import { useContext, useState } from "react";
import { UserContext, Card } from "./context";

export function CreateAccount() {
    const [show, setShow] = useState(true);
    const [status, setStatus] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const ctx = useContext(UserContext);

    // only validates that there is something in the field should be expanded to actually validate the fields.
    function validate(field, label) {
        if (!field) {
            setStatus('Error: ' + label + ' must not be blank');
            setTimeout(() => setStatus(''), 3000);
            return false
        }
        return true;
    }

    // this shows the values in the console to check its working, revalidates the data and pushes the user into our context and hides our user and allows the user to add another.
    function handleCreate() {
        console.log(name, email, password);
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (!validate(name, 'Name')) return;
        if (!validate(email, 'Email')) return;
        if (!validate(password, 'Password')) return;
        if (!emailRegex.test(email)) {
            setStatus('Please enter a valid email address');
            return;
        }
        if (password.length < 8) {
            setStatus('Error: Password must be at least 8 characters')
            return;
        }

        ctx.users.push({ name, email, password, balance: 100 });
        setStatus('You have created your account')
        setShow(false);
    }

    function clearForm() {
        setName('');
        setEmail('');
        setPassword('');
        setStatus('');
        setShow(true);
    }

    return (
        <Card
            bgcolor="primary"
            header='Create Account'
            status={status}
            body={show ? (
                <>
                    Name<br />
                    <input type="input" className="form-control" id="name" placeholder="Enter Name" value={name} onChange={e => setName(e.currentTarget.value)} /><br />
                    Email address<br />
                    <input type="input" className="form-control" id="email" placeholder="Enter Email" value={email} onChange={e => setEmail(e.currentTarget.value)} /><br />
                    Password<br />
                    <input type="password" className="form-control" id="password" placeholder="Enter Password" value={password} onChange={e => setPassword(e.currentTarget.value)} /><br />
                    <button type="submit" className="btn btn-light" onClick={handleCreate} disabled={name + email + password === ''}>Create Account</button>
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