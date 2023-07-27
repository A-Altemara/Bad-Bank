// import { FindCurrentUser } from "./FindCurrentUser.js"
import { useContext, useState } from "react";
import { UserContext, Card } from "./context";
// import InitializeBalance from "../initializeBalance";
import useValidateAmounts from "../helpers/useValidateAmounts";

export function Deposit() {
    const ctx = useContext(UserContext);
    const [status, setStatus] = useState('');
    const [deposit, setDeposit] = useState('');
    const [balance, setBalance] = useState(null);


    const validationResult = useValidateAmounts(deposit)

    //TODO: Extract into separate component as stretch goal
    function findCurrentUser() {
        return ctx.users.find((user) => user.email === ctx.currentUser);
    }

    //TODO: Extract into separat component as stretch goal
    function initializeBalance() {
        setBalance(findCurrentUser().balance)
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
        findCurrentUser().balance += depositNum;
        setStatus('Deposit successful');
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
                </>
            )}
        />
    )
}