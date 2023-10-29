import { Card } from "./shared/Card";
import imageLarge from '../pictures/marble-bank.png'


export function Home() {
    const cardStyle = {
        textAlign: 'center',
        justifyContent: 'center',
    };

    return (
        <>
            <Card style={cardStyle}
                bgcolor="info"
                txtcolor="white"
                header="Welcome to the Hiss-toric FuzzyPaws Bank"
                title="We care for you with purrfect customer service! Rated 5 paw prints by our customers."
                text="Open and account today and you'll be feline fine about your finances!"
                body={<img src={imageLarge} className="img-fluid" alt="marble bank" />}
            />

        </>

    )
}