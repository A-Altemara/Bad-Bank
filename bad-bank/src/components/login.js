import { useContext, useState } from "react";
import { UserContext } from "./context";
import { Card } from "./shared/Card";


export function Login() {
    const [status, setStatus] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const ctx = useContext(UserContext);

    const isLoggedIn = ctx.currentUser !== null;
    const [loggedIn, setLoggedIn] = useState(isLoggedIn);

    function matchEmail(name) {
        return name.email === email
    }

    // should match email first then verify password. if password fails then return false
    function validate() {
        if (ctx.users.find(matchEmail)) {
            ctx.currentUser = ctx.users.find(matchEmail)
            ctx.index = ctx.users.findIndex(user => user.email === email);
            console.log(ctx.currentUser)
        } else {
            setStatus('Error: Email incorrect');
            return false
        }

        if (password != ctx.currentUser.password) {
            delete ctx.users.currentUser;
            setStatus('Error: Password incorrect');
            return false
        }

        setStatus('')
        return true
    }

    function logIn() {
        if (!validate()) return;
        ctx.currentUser = email;
        setLoggedIn(true)
    }

    function logOut() {
        ctx.currentUser = null;
        setEmail('')
        setPassword('')
        setLoggedIn(false)
    }

    return (
        <Card
            bgcolor="info"
            title="Login"
            status={status}
            body={!loggedIn ? (
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
                        type="input"
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
            ) : (
                <>
                    <h5>You have successfully logged in</h5>
                    <button
                        type="submit"
                        className="btn btn-light"
                        onClick={() => logOut()}
                    >
                        Log Out
                    </button>
                </>
            )
            }
        />
    )
}
