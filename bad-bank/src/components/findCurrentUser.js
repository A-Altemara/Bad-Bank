import { useContext } from "react";
import { UserContext } from "./context";

// TODO: get extracted componenet working, currently not functional.
export function FindCurrentUser() {
    const ctx = useContext(UserContext);
    return ctx.users.find((user) => user.email === ctx.currentUser);
}