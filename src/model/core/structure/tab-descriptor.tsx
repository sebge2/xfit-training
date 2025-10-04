import * as React from "react";
import InfoIcon from '@mui/icons-material/Info';
import {Outlet} from "react-router-dom";

export type TabDescriptor = {
    header: React.ReactNode,
    defaultSelected: boolean | undefined,
    content: React.ReactNode,
};

export function createInfoTab(selected?: boolean): TabDescriptor {
    return {
        header: <InfoIcon/>,
        content: <Outlet/>,
        defaultSelected: selected,
    };
}