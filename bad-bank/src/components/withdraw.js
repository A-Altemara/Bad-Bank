import { useState } from "react";
import { Card } from "./shared/Card";
import useValidateAmounts from "../utilities/useValidateAmounts";

export function Withdraw({ adjustMoney, balance }) {
    const [status, setStatus] = useState('');
    const [withdrawalAmount, setWithdrawalAmount] = useState('');

    const validationError = useValidateAmounts(withdrawalAmount)

    function handleWithdrawal() {

        if (validationError) {
            setStatus(`Error Withdrawal ${validationError}`);
            console.log('validation result exists in withdrawl.js')
            return;
        }

        // TODO: Reinstate OverDraft notification
        // if (withdrawalNum > balance) {
        //     setStatus('Insufficient funds.');
        //     return;
        // }

        adjustMoney(-withdrawalAmount)

        setWithdrawalAmount('');
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
                        value={withdrawalAmount}
                        onChange={e => setWithdrawalAmount(e.currentTarget.value)}
                    />
                    <br />
                    <button
                        type="submit"
                        className="btn btn-light"
                        onClick={handleWithdrawal}
                        disabled={withdrawalAmount === ''}
                    >
                        Withdraw
                    </button>
                </>
            }
        />
    )
}