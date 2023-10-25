import { useState } from "react";
import { Card } from "./shared/Card";
import useValidateAmounts from "../utilities/useValidateAmounts";

export function Deposit() {
    // Josh's version of what this file should do:
    // note: balance, deposit & withdraw validation all happen in app.js, status validation
    // import setBalance from App.js

    // const [status, setStatus] = useState('');
    // function handler(depositAmount){
    // depositMoney(depositAmount)
    // handle setStatus() & validation
    // }
    // return (all the stuff)


    // End Josh's version
    const [status, setStatus] = useState('');
    const [deposit, setDeposit] = useState('');
    const [balance, setBalance] = useState(null);


    const validationResult = useValidateAmounts(deposit)

    const testUser = 'a@a.com'
    const baseUrl = 'http://localhost:4500';

    function handleDeposit(email, amount) {

        if (validationResult) {
            setStatus(`Error Deposit ${validationResult}`);
            console.log('validation result exists in deposit.js')
            return;
        }

        fetch(`${baseUrl}/account/deposit/${testUser}/${Number(deposit)}`)
            .then(async (res) => {
                const newBalance = await res.json();
                console.log('deposit', newBalance)
                setBalance(newBalance)

                if (deposit === null) {
                    setStatus('Balance error, Please contact support')
                }
            })
            .catch((err) => {
                console.log(err);

            })

        setDeposit('');
        setStatus('Deposit successful');
    }

    return (
        <Card
            bgcolor="info"
            header='Deposit'
            status={status}
            body=
            {
                <>
                    Current Account Balance {balance}
                    <br />
                    Deposit Amount
                    <br />
                    <input
                        type="input"
                        className="form-control"
                        id="deposit"
                        placeholder="Enter Amount"
                        value={deposit}
                        onChange={e => setDeposit(e.currentTarget.value)}
                    />
                    <br />
                    <button
                        type="submit"
                        className="btn btn-light"
                        onClick={handleDeposit}
                        disabled={deposit === ''}
                    >
                        Deposit
                    </button>
                </>

            }
        />
    )
}