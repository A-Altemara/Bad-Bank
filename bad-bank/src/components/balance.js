// import { FindCurrentUser } from "./FindCurrentUser.js"
import { useContext, useState } from "react";
import { UserContext, Card } from "./context";

export function Balance() {
    const ctx = useContext(UserContext);
    const [status, setStatus] = useState('');

    //TODO: Extract into separate component as stretch goal
    function findCurrentUser() {
        return ctx.users.find((user) => user.email === ctx.currentUser);
    }
    return (
        <Card
            bgcolor="primary"
            header='Balance'
            status={status}
            body={ctx.currentUser ? (
                <>
                    {/* TODO: still need format correct */}

                    Your Balance is {findCurrentUser().balance}

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


