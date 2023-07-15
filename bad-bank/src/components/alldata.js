import { useContext } from "react";
import { UserContext, Card } from "./context";

export function AllData() {
    const ctx = useContext(UserContext);
    return (
        <Card
            bgcolor="primary"
            header='All Data'
            body={
                <>
                    User Email Password Balance <br />
                    {ctx.users.map(
                        // TODO: Add table formating
                        (user, index) => (
                            <p key={index}>{user.name + ' ' + user.email + ' ' + user.password + ' ' + user.balance}</p>
                        )
                    )}
                </>
            }
        />
    )
}