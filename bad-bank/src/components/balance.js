import { useContext, useEffect, useState } from "react";
import { UserContext, Card } from "./context";
import { useFindCurrentUser } from "../helpers/useFindCurrentUser";


export function Balance() {
    const ctx = useContext(UserContext);
    const [status, setStatus] = useState('');

    const currentUser = useFindCurrentUser()

    const baseUrl = 'http://localhost:4500';


    function handle(email) {
        // const url = `${baseUrl}/account/balance/a@a.com`;
        fetch(`${baseUrl}/account/balance/${email}`)
            .then(async (res) => {
                const balance = await res.json();

                setStatus(`Your balance is: ${balance}`)

                if (balance === null) {
                    setStatus('Email not found')
                } else {
                    setStatus(`Your new balance is: ${balance}`);
                    // setShow(false);
                }
            })
            .catch((err) => {
                console.log(err);

            })

        // (async () => {
        //     let res = await fetch(url);
        //     console.log('res', res)
        //     // console.log("baseUrl res: " + res)
        //     let balance = await res;
        //     console.log(balance);
        //     
        // })();
    }
    if (ctx.currentUser) { handle(ctx.currentUser.email) }

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


