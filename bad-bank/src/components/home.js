import { Card } from "./context";
import imageLarge from '../../src/pictures/marble-bank.png'


export function Home() {

    return (
        <>
            <Card
                bgcolor="primary"
                txtcolor="black"
                header="BadBank Landing Page"
                title="Welcome to the bank."
                text="You can use this bank."
                body={<img src={imageLarge} className="img-fluid" alt="marble bank" />}
            />

        </>

    )
}