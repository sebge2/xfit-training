import {IconButton} from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';

type Props = {
    onSave: () => Promise<void> | void,
};

export function SaveRowButton({onSave: onSaveDelegation}: Props) {
    function onSave() {
        onSaveDelegation();
    }

    return <IconButton aria-label="save" size="small" onClick={onSave}>
        <SaveIcon/>
    </IconButton>;
}