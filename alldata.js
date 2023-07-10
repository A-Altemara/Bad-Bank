function AllData() {
    const ctx = React.useContext(UserContext);
    return (
        <Card
            bgcolor="primary"
            header='All Data'
            body={
                <>
                    User Email Password Balance <br />
                    {ctx.users.map(
                        (user) => (
                            <>{user.name + ' ' + user.email + ' ' + user.password + ' ' + user.balance}</>
                        )
                    )}
                </>
            }
        />
    )
}