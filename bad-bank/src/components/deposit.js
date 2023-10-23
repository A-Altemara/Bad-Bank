import { useContext, useState } from "react";
import { UserContext, Card } from "./context";
import useValidateAmounts from "../helpers/useValidateAmounts";
import { useFindCurrentUser } from "../helpers/useFindCurrentUser";

export function Deposit() {
    const ctx = useContext(UserContext);
    const [status, setStatus] = useState('');
    const [deposit, setDeposit] = useState('');
    const [balance, setBalance] = useState(null);


    const validationResult = useValidateAmounts(deposit)
    const currentUser = useFindCurrentUser()

    //TODO: Extract into separat component as stretch goal
    function initializeBalance() {
        setBalance(currentUser.balance)
        return balance
    }


    function handleDeposit() {

        //TODO handle deposit button inactive
        if (validationResult) {
            setStatus(`Error Deposit ${validationResult}`);
            console.log('validation result exists in deposit.js')
            return;
        }

        const depositNum = Number(deposit);

        setBalance(balance + depositNum);
        currentUser.balance += depositNum;
        setDeposit('');
        setStatus('Deposit successful');
    }
    const baseUrl = 'https://corsproxy.io/?http://localhost:27017';

    function handle() {
        const url = `/account/balance/a@a.com`;
        (async () => {
            let res = await fetch(url);
            // console.log("baseUrl res: " + res)

        })();
    }



    return (
        <Card
            bgcolor="primary"
            header='Deposit'
            status={status}
            body={ctx.currentUser ? (
                <>
                    Current Account Balance {balance ? balance : initializeBalance()} <br />
                    Deposit Amount<br />
                    <input type="input" className="form-control" id="deposit" placeholder="Enter Amount" value={deposit} onChange={e => setDeposit(e.currentTarget.value)} /><br />
                    {/* TODO remove diable once added to context */}
                    <button type="submit" className="btn btn-light" onClick={handleDeposit} disabled={deposit === ''}>Deposit</button>
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