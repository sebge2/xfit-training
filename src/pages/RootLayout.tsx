import {Outlet} from "react-router-dom";
import Menu from "../components/core/menu/Menu";
import { AuthenticationRequired } from "../components/core/authentication/AuthenticationRequired";

export default function RootLayout() {
    return (
        <AuthenticationRequired>
            <Menu>
                <Outlet/>
            </Menu>
        </AuthenticationRequired>
    );
}