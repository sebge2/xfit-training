import {ConfirmationDialog} from "../interaction/ConfirmationDialog.tsx";
import {useState} from "react";
import {IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

type Props = {
    confirmationText: string,
    onDelete: () => Promise<void> | void,
};

export function DeleteRowButton({confirmationText, onDelete : onDeleteDelegation}: Props) {
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

        <IconButton aria-label="save" size="small">
            <DeleteIcon onClick={onDeleteRequested}/>
        </IconButton>
    </>;
}