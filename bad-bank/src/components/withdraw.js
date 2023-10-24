import { useContext, useState } from "react";
import { UserContext } from "./context";
import { Card } from "./shared/Card";
import useValidateAmounts from "../utilities/useValidateAmounts";
import { useFindCurrentUser } from "../utilities/useFindCurrentUser";


export function Withdraw() {
    const ctx = useContext(UserContext);
    const [status, setStatus] = useState('');
    const [withdrawal, setWithdrawal] = useState('');
    const [balance, setBalance] = useState(null);

    const validationResult = useValidateAmounts(withdrawal)
    const currentUser = useFindCurrentUser()

    function initializeBalance() {
        setBalance(currentUser.balance)
        return balance
    }


    function handleWithdrawal() {

        if (validationResult) {
            setStatus(`Error Withdrawal ${validationResult}`);
            console.log('validation result exists in withdrawl.js')
            return;
        }

        const withdrawalNum = Number(withdrawal);

        if (withdrawalNum > balance) {
            setStatus('Insufficient funds.');
            return;
        }

        setBalance(balance - withdrawalNum);
        currentUser.balance -= withdrawalNum;
        setWithdrawal('');
        setStatus('Withdrawal sucessful')
    }

    return (
        <Card
            bgcolor="primary"
            header='Withdrawal'
            status={status}
            body={ctx.currentUser ? (
                <>
                    Current Account Balance {balance ? balance : initializeBalance()} <br />
                    Amount<br />
                    <input type="input" className="form-control" id="" placeholder="Enter Amount" value={withdrawal} onChange={e => setWithdrawal(e.currentTarget.value)} /><br />
                    <button type="submit" className="btn btn-light" onClick={handleWithdrawal} disabled={withdrawal === ''}>Withdraw</button>
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