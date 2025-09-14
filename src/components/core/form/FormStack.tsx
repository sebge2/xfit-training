import {ReactNode} from "react";
import Stack from '@mui/material/Stack';

type Props = {
    children: ReactNode[],
};

export function FormStack({children}: Props) {
    return <Stack spacing={4}>
        {children}
    </Stack>;
}