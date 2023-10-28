import { useState } from "react";
import { Card } from "./shared/Card";

const baseUrl = 'http://localhost:4500';

export function CreateAccount() {
    const [show, setShow] = useState(true);
    const [status, setStatus] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function validate(field, label) {
        if (!field) {
            setStatus('Error: ' + label + ' must not be blank');
            setTimeout(() => setStatus(''), 3000);
            return false
        }
        return true;
    }

    // this validates the data and pushes the user into our datbase and hides our user and allows the user to add another.
    function handleCreate() {
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

        // TODO: add Role field to form and set to 'user'
        const url = `${baseUrl}/account/create/${name}/${email}/${password}`;
        (async () => {
            var res = await fetch(url);
            // var data = await res.json();
            // console.log(data);
        })();
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
            bgcolor="info"
            header='Create Account'
            status={status}
            body={show ? (
                <>
                    Name
                    <br />
                    <input
                        type="input"
                        className="form-control"
                        id="name"
                        placeholder="Enter Name"
                        value={name}
                        onChange={e => setName(e.currentTarget.value)}
                    />
                    <br />
                    Email address
                    <br />
                    <input
                        type="input" className="form-control"
                        id="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={e => setEmail(e.currentTarget.value)}
                    />
                    <br />
                    Password
                    <br />
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={e => setPassword(e.currentTarget.value)}
                    />
                    <br />
                    <button
                        type="submit"
                        className="btn btn-light"
                        onClick={handleCreate}
                        disabled={name + email + password === ''}>
                        Create Account
                    </button>
                </>
            ) : (
                <>
                    <h5>Success</h5>
                    <button
                        type="submit"
                        className="btn btn-light"
                        onClick={clearForm}
                    >
                        Add Another Account
                    </button>

                </>
            )}
        />
    )
}