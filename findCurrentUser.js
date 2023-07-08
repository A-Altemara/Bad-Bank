export function findCurrentUser() {
    const ctx = React.useContext(UserContext);
    return ctx.users.find((user) => user.email === ctx.currentUser);
}