import { useContext, useState } from "react";
import { UserContext, Card } from "./context";
import { useFindCurrentUser } from "../helpers/useFindCurrentUser";


export function Balance() {
    const ctx = useContext(UserContext);
    const [status, setStatus] = useState('');

    const currentUser = useFindCurrentUser()

    const baseUrl = 'http://localhost:27017';

    function handle() {
        const url = `${baseUrl}/`;
        (async () => {
            let res = await fetch(url);
            console.log("baseUrl res: " + res)
            // let balance = await res.json();
            // console.log(balance);
            // if (balance === null) {
            //     props.setStatus('Email not found')
            // } else {
            //     props.setStatus(`Your new balance is: ${balance}`);
            //     props.setShow(false);
            // }
        })();
    }

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
                    {handle()}
                </>
            )}
        />
    )
}


