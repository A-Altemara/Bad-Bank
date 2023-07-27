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
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Password</th>
                                <th scope="col">Balance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ctx.users.map(
                                (user, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index}</th>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.password}</td>
                                        <td>{user.balance}</td>
                                    </tr>
                                )
                            )}


                        </tbody>
                    </table>


                </>
            }
        />
    )
}