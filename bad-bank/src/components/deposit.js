import { useState } from "react";
import { Card } from "./shared/Card";
import useValidateAmounts from "../utilities/useValidateAmounts";

export function Deposit({ adjustMoney, balance }) {

    const [statusMessage, setStatusMesssage] = useState('');
    const [depositField, setDepositField] = useState('');

    const validationError = useValidateAmounts(depositField)

    function handleDeposit(amount) {

        if (validationError) {
            setStatusMesssage(`Error Deposit ${validationError}`);
            console.log('validation result exists in deposit.js')
            return;
        }

        adjustMoney(amount)

        // TODO find a nicer way to do this
        setTimeout(() => {
            setDepositField('');
            setStatusMesssage('Deposit successful');
        }, 3000);
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
                        value={depositField}
                        onChange={e => setDepositField(e.currentTarget.value)}
                    />
                    <br />
                    <button
                        type="submit"
                        className="btn btn-light"
                        onClick={() => handleDeposit(depositField)}
                        disabled={depositField === ''}
                    >
                        Deposit
                    </button>
                </>

            }
        />
    )
}