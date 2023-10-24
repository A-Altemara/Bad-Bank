import { useState } from "react";
import { Card } from "./shared/Card";
import useValidateAmounts from "../utilities/useValidateAmounts";

const testUser = 'a@a.com'
export function Withdraw() {
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

        // TODO: Reinstate OverDraft notification
        // if (withdrawalNum > balance) {
        //     setStatus('Insufficient funds.');
        //     return;
        // }

        fetch(`${baseUrl}/account/withdraw/${testUser}/${Number(withdrawal)}`)
            .then(async (res) => {
                const newBalance = await res.json();
                console.log('withdrawal', newBalance)
                setBalance(newBalance)

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
            bgcolor="info"
            header='Withdrawal'
            status={status}
            body={
                <>
                    Current Account Balance {balance} <br />
                    Amount<br />
                    <input
                        type="input"
                        className="form-control"
                        id=""
                        placeholder="Enter Amount"
                        value={withdrawal}
                        onChange={e => setWithdrawal(e.currentTarget.value)}
                    />
                    <br />
                    <button
                        type="submit"
                        className="btn btn-light"
                        onClick={handleWithdrawal}
                        disabled={withdrawal === ''}
                    >
                        Withdraw
                    </button>
                </>
            }
        />
    )
}