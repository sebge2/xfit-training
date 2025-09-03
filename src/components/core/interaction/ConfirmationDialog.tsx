import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Button from "@mui/material/Button";

type Props = {
    text: string,
    open: boolean,
    onOk: () => void,
    onCancel: () => void,

    confirmationText?: string,
    confirmationCancel?: string,
};

export function ConfirmationDialog({text, open, onOk, onCancel, confirmationText, confirmationCancel}: Props) {
    return <>
        <Dialog open={open} onKeyDown={onCancel} onClose={onCancel} aria-labelledby={text}>
        <DialogTitle>{text}</DialogTitle>
        <DialogActions>
            <Button autoFocus onClick={onCancel}>
                {confirmationCancel || 'Cancel'}
            </Button>
            <Button onClick={onOk}>{confirmationText || 'OK'}</Button>
        </DialogActions>
    </Dialog></>;
}