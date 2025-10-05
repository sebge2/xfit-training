import {Button} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

type Props = {
    onAdd: () => void,
    disabled?: boolean,
};

export function AddButton({onAdd, disabled}: Props) {
    return <Button variant="contained" color="success" startIcon={<AddIcon/>} onClick={onAdd} disabled={disabled}>
        Add
    </Button>;
}