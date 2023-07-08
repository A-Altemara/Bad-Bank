function AllData() {
    const ctx = React.useContext(UserContext);
    return (
        <>
            <h1>AllData<br />
                {JSON.stringify(ctx)}</h1>
            <h1>{JSON.stringify(ctx.users[0].balance)}</h1>
        </>
    )
}