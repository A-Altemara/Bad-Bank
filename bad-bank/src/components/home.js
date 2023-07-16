import { Card } from "./context";
export function Home() {

    return (
        <Card
            bgcolor="primary"
            txtcolor="black"
            header="BadBank Landing Page"
            title="Welcome to the bank."
            text="You can use this bank."
            body={<img src="./src/pictures/bank.png" className="img-fluid" alt="bank outline" />}
        />
    )
}