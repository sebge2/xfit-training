import {Outlet} from "react-router-dom";
import Menu from "../components/core/menu/Menu";

export default function RootLayout() {
    return (
        <Menu>
            <Outlet/>
        </Menu>
    );
}