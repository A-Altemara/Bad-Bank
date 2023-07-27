import { useContext, useState } from "react";
import { UserContext, Card } from "./context";
import { useFindCurrentUser } from "../helpers/useFindCurrentUser";


export function Balance() {
    const ctx = useContext(UserContext);
    const [status, setStatus] = useState('');

    const currentUser = useFindCurrentUser()

    return (
        <Card
            bgcolor="primary"
            header='Balance'
            status={status}
            body={ctx.currentUser ? (
                <>
                    Your Balance is {currentUser.balance}

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


