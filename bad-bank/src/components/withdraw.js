import { useContext, useEffect, useState } from "react";
import { UserContext } from "./context";
import { Card } from "./shared/Card";
import useValidateAmounts from "../utilities/useValidateAmounts";

const testUser = 'a@a.com'
export function Withdraw() {
    const ctx = useContext(UserContext);
    const [status, setStatus] = useState('');
    const [withdrawal, setWithdrawal] = useState('');
    const [balance, setBalance] = useState(null);

    const validationResult = useValidateAmounts(withdrawal)

    const baseUrl = 'http://localhost:4500';

    function handleWithdrawal() {

        if (validationResult) {
            setStatus(`Error Withdrawal ${validationResult}`);
            console.log('validation result exists in withdrawl.js')
            return;
        }

        // if (withdrawalNum > balance) {
        //     setStatus('Insufficient funds.');
        //     return;
        // }

        fetch(`${baseUrl}/account/withdraw/${testUser}/${Number(withdrawal)}`)
            .then(async (res) => {
                const newBalance = await res.json();
                console.log('withdrawal', newBalance)
                setBalance(newBalance)
                // setStatus(`Your withdrawal is: ${withdrawal}`)

                if (withdrawal === null) {
                    setStatus('Balance error, Please contact support')
                }
            })
            .catch((err) => {
                console.log(err);

            })

        setWithdrawal('');
        setStatus('Withdrawal sucessful')
    }

    return (
        <Card
            bgcolor="primary"
            header='Withdrawal'
            status={status}
            body={
                // ctx.currentUser ? (
                <>
                    Current Account Balance {balance} <br />
                    Amount<br />
                    <input type="input" className="form-control" id="" placeholder="Enter Amount" value={withdrawal} onChange={e => setWithdrawal(e.currentTarget.value)} /><br />
                    <button type="submit" className="btn btn-light" onClick={handleWithdrawal} disabled={withdrawal === ''}>Withdraw</button>
                </>
                // ) : (
                //     <>
                //         <h5>Please Login</h5>
                //         <button type="submit" className="btn btn-light"><a href='#/login/' >Click to Go to Login Page</a></button>
                //     </>
                // )
            }
        />
    )
}