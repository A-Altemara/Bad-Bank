import { useState } from "react";
import { Card } from "./shared/Card";


export function Login({ initializeUser }) {
    const [statusMessage, setStatusMessage] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function logIn() {

        setStatusMessage(initializeUser(email, password))
    }

    return (
        <Card
            bgcolor="info"
            title="Login"
            status={statusMessage}
            body={
                <>
                    Email address<br />
                    <input
                        type="input"
                        className="form-control"
                        id="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={e => { setEmail(e.currentTarget.value) }}
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
                        onChange={e => setPassword(e.currentTarget.value)} />
                    <br />
                    <button
                        type="submit"
                        className="btn btn-light"
                        onClick={() => logIn()}
                    >
                        Login
                    </button>
                </>
            }
        />
    )
}
