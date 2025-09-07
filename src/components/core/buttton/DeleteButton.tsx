import {ConfirmationDialog} from "../interaction/ConfirmationDialog.tsx";
import {useState} from "react";
import {Button, IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

type Props = {
    confirmationText: string,
    iconButton?: boolean,
    size?: 'small' | 'medium' | 'large',
    onDelete: () => Promise<void> | void,
};

export function DeleteButton({
                                 confirmationText,
                                 iconButton = false,
                                 size,
                                 onDelete: onDeleteDelegation
                             }: Props) {
    const [showDialog, setShowDialog] = useState<boolean>(false);

    function cancelDelete() {
        setShowDialog(false);
    }

    function onDelete() {
        setShowDialog(false);

        onDeleteDelegation();
    }

    function onDeleteRequested() {
        setShowDialog(true);
    }

    return <>
        <ConfirmationDialog text={confirmationText}
                            open={showDialog}
                            onOk={onDelete}
                            onCancel={cancelDelete}/>
        {!iconButton &&
            <Button aria-label="Delete"
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon/>} onClick={onDeleteRequested}>
                Delete
            </Button>}

        {iconButton &&
            <IconButton aria-label="Delete"
                        size={size}
                        color="error">
                <DeleteIcon onClick={onDeleteRequested}/>
            </IconButton>}
    </>;
}