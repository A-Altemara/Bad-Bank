import { useState } from "react";
import { Card } from "./shared/Card";

export function Login({ logIn, googleLogin }) {
    const [statusMessage, setStatusMessage] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function emailLogIn(email, password) {
        console.log("email ", email, "password ", password);
        logIn(email, password)
        setStatusMessage("Login successful")
    }

    // duplicated on createaccount.js should be moved to shared folder when custom hook is created
    function googleLogMeIn() {
        console.log("google sign in clicked");
        googleLogin()
        setStatusMessage("Logged in with Google")
    };

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
                        onClick={() => emailLogIn(email, password)}
                    >
                        Login
                    </button>
                    <br />
                    <br />
                    <button
                        type="submit"
                        className="btn btn-light"
                        onClick={() => googleLogMeIn()}>
                        Login with Google
                    </button>
                </>
            }
        />
    )
}
