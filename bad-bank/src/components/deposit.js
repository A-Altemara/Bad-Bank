import { useState } from "react";
import { Card } from "./shared/Card";
import useValidateAmounts from "../utilities/useValidateAmounts";

export function Deposit({ adjustMoney, balance }) {

    const [statusMessage, setStatusMesssage] = useState('');
    const [depositAmount, setDepositAmount] = useState('');

    const validationError = useValidateAmounts(depositAmount)

    function handleDeposit() {

        if (validationError) {
            setStatusMesssage(`Error Deposit ${validationError}`);
            console.log('validation result exists in deposit.js')
            return;
        }

        adjustMoney(depositAmount)

        setDepositAmount('');
        setStatusMesssage('Deposit successful');

    }

    return (
        <Card
            bgcolor="info"
            header='Deposit'
            status={statusMessage}
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
                        value={depositAmount}
                        onChange={e => setDepositAmount(e.currentTarget.value)}
                    />
                    <br />
                    <button
                        type="submit"
                        className="btn btn-light"
                        onClick={() => handleDeposit()}
                        disabled={depositAmount === ''}
                    >
                        Deposit
                    </button>
                </>

            }
        />
    )
}