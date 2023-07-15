import { FindCurrentUser } from "./findCurrentUser.js"
import { useContext, useState } from "react";
import { UserContext, Card } from "./context";

export function Balance() {
    const ctx = useContext(UserContext);
    const [status, setStatus] = useState('');

    FindCurrentUser()

    return (
        <Card
            bgcolor="primary"
            header='Balance'
            status={status}
            body={ctx.currentUser !== null ? (
                <>
                    {/* TODO: still need format correct */}
                    Balance <br />
                    Your Balance is<br />
                    {FindCurrentUser().balance}

                </>
            ) : (
                <>
                    <h5>Please Login</h5>
                    <button type="submit" className="btn btn-light"><a href='#/login/' >Click to Go to Login Page</a></button>
                </>
            )}
        />
    )
}


