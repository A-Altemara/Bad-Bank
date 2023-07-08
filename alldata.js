function AllData() {
    const ctx = React.useContext(UserContext);
    return (
        <h1>AllData<br/>
        {JSON.stringify(ctx)}</h1>
    )
}