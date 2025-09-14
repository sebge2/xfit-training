import {Button} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

type Props = {
    onAdd: () => void,
};

export function AddButton({onAdd}: Props) {
    return <Button variant="contained" color="success" startIcon={<AddIcon/>} onClick={onAdd}>
        Add
    </Button>;
}