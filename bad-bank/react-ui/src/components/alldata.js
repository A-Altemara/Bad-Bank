import { useContext, useEffect, useState } from "react";
import { UserContext } from "./context";
import { Card } from "./shared/Card";


export function AllData() {
    const [data, setData] = useState('');
    // const baseUrl = 'http://localhost:4500';
    const baseUrl = 'http://147.182.251.144/:4500';
    function getStuff() {
        fetch(`${baseUrl}/account/all`)
            .then(async (res) => {

                const data = await res.json();
                return setData(data);
            })
    }

    useEffect(() => {
        if (data === '') { getStuff() }


    }, [data]);

    // const ctx = useContext(UserContext);
    // TODO: move the fetch to context, so context holds user data, and the action pull user data.

    if (data !== '')
        return (
            <Card
                bgcolor="secondary"
                header='All Data'
                body={
                    <>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Balance</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map(
                                    (user, index) => (
                                        <tr key={index}>
                                            <th scope="row">{index}</th>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
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
    else return (
        <Card
            bgcolor="primary"
            header='All Data'
            body={
                <>
                    <h5>No Data</h5>
                </>
            }
        />
    )
}
