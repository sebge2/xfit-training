import Box from "@mui/material/Box";
import {ReactNode} from "react";

type Props = {
    children?: ReactNode[],
};

export function ActionsContainer({children}: Props) {
    return <>
        {(children || []).length > 0 && <Box component="section">
            <Box sx={{display: 'flex', gap: '2rem', marginTop: '2rem'}}>
                {children}
            </Box>
        </Box>}
    </>;
}