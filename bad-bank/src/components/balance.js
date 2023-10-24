import { useState } from "react";
import { Card } from "./shared/Card";


export function Balance() {
    const [status, setStatus] = useState('');
    const [balance, setBalance] = useState(null);

    const testUser = 'a@a.com'
    const baseUrl = 'http://localhost:4500';

    const url = `${baseUrl}/account/balance/${testUser}`;

    function handle(email) {
        fetch(url)
            .then(async (res) => {
                setBalance(await res.json());

                setStatus(`Your balance is: ${balance}`)

                if (balance === null) {
                    setStatus('Balance error, Please contact support')
                }
            })
            .catch((err) => {
                console.log(err);

            })
    }
    handle(testUser)

    return (
        <Card
            bgcolor="info"
            header='Balance'
            status={status}
            body={
                <>
                    Your Balance is {balance}

                </>
            }
        />
    )
}


