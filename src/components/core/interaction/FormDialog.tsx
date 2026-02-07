import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Button from "@mui/material/Button";
import {DialogContent} from "@mui/material";
import {ReactNode} from "react";
import {FormStack} from "../form/FormStack.tsx";

type Props = {
    text: string,
    open: boolean,
    onOk: () => void,
    onCancel: () => void,

    confirmationText?: string,
    confirmationCancel?: string,

    children: ReactNode[] | ReactNode,
};

export function FormDialog({text, open, onOk, onCancel, confirmationText, confirmationCancel, children}: Props) {
    return <Dialog open={open} onClose={onCancel} aria-labelledby={text}>
        <DialogTitle>{text}</DialogTitle>
        <DialogContent>
            <FormStack>
                {children}
            </FormStack>
        </DialogContent>
        <DialogActions>
            <Button autoFocus onClick={onCancel}>
                {confirmationCancel || 'Cancel'}
            </Button>
            <Button onClick={onOk}>{confirmationText || 'OK'}</Button>
        </DialogActions>
    </Dialog>;
}