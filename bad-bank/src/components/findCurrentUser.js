import { useContext } from "react";
import { UserContext } from "./context";

export function FindCurrentUser() {
    const ctx = useContext(UserContext);
    return ctx.users.find((user) => user.email === ctx.currentUser);
}