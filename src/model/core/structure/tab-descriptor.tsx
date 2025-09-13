import * as React from "react";
import InfoIcon from '@mui/icons-material/Info';
import {Outlet} from "react-router-dom";

export type TabDescriptor = {
    label: React.ReactNode,
    icon: React.ReactElement | undefined,
    defaultSelected: boolean | undefined,
    content: React.ReactNode,
};

export function createInfoTab(selected?: boolean): TabDescriptor {
    return {
        label: undefined,
        icon: <InfoIcon/>,
        content: <Outlet/>,
        defaultSelected: selected,
    };
}