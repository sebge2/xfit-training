import {Button, IconButton} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

type Props = {
    iconButton?: boolean,
    size?: 'small' | 'medium' | 'large',
    onAdd: () => void,
    disabled?: boolean,
};

export function AddButton({iconButton, size, onAdd, disabled}: Props) {

    if (iconButton) {
        return <IconButton color="success"
                           type="submit"
                           size={size}
                           aria-label="Add"
                           onClick={onAdd}
                           disabled={disabled}>
            <SaveIcon/>
        </IconButton>
    } else {
        return <Button variant="contained"
                       color="success"
                       startIcon={<SaveIcon/>}
                       type="submit"
                       size={size}
                       aria-label="Add"
                       onClick={onAdd}
                       disabled={disabled}>
            Save
        </Button>;
    }
}