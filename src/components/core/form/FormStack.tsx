import React, {ReactNode} from "react";
import Stack from '@mui/material/Stack';

type Props = {
    children: ReactNode[] | ReactNode,
    onKeyDown?: (event: React.KeyboardEvent<HTMLElement>) => void,
};

export function FormStack({children, onKeyDown}: Props) {
    return <Stack spacing={4} onKeyDown={onKeyDown}>
        {children}
    </Stack>;
}