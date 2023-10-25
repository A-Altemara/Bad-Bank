import { useState } from "react";
import { Card } from "./shared/Card";


export function Balance({ getBalance, balance }) {

    getBalance()

    // strecth goal add trasaction history
    return (
        <Card
            bgcolor="info"
            header='Balance'
            body={
                <>
                    Your Balance is {balance}

                </>
            }
        />
    )
}


