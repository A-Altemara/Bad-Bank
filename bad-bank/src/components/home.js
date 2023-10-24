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
                bgcolor="primary"
                txtcolor="white"
                header="BadBank™"
                title="Welcome to your trusted banking intitiution"
                text="Enjoy 24/7 digital banking and we cover the opening $100 deposit!"
                body={<img src={imageLarge} className="img-fluid" alt="marble bank" />}
            />

        </>

    )
}