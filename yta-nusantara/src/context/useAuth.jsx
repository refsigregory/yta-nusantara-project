
import * as React from "react";

export const AuthContext = React.createContext(null);

export function useAuth() {
    return React.useContext(AuthContext);
}