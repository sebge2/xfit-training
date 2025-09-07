import {Button} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

type Props = {
    onEdit: () => void,
};

export function EditButton({onEdit}: Props) {
    return <Button variant="contained" startIcon={<EditIcon/>} onClick={onEdit}>
        Edit
    </Button>;
}