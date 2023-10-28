import { Card } from "./shared/Card";

export function Balance({ balance }) {

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


