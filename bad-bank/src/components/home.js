import { Card } from "./shared/Card";
import imageLarge from '../pictures/catalyststuff_jar_cat.jpg'


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
                body={
                    <>
                        <img src={imageLarge} className="img-fluid" alt="kitty in a jar with money" />
                        <p><a href="https://www.freepik.com/free-vector/cute-cat-with-money-gold-coin-bottle-cartoon-vector-icon-illustration-animal-business-flat_31094233.htm#query=money%20cat&position=1&from_view=keyword&track=ais">Image by catalyststuff</a> on Freepik</p>
                    </>
                }
            />

        </>

    )
}