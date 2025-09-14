import Box from "@mui/material/Box";
import {ReactNode} from "react";

type Props = {
    children?: ReactNode[] | ReactNode,
};

export function ActionsContainer({children}: Props) {
    if(!children) return (
        <></>
    )

    return <>
        <Box component="section">
            <Box sx={{display: 'flex', gap: '2rem', marginTop: '2rem'}}>
                {children}
            </Box>
        </Box>
    </>;
}