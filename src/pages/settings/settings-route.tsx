import {RouteObject} from "react-router";
import SettingsPage from "./SettingsPage.tsx";

export const SETTINGS_ROUTE: RouteObject = {
    path: 'settings',
    element: <SettingsPage/>,
    handle: {pageName: 'Settings'},
};