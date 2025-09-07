import SaveIcon from "@mui/icons-material/Save";
import {Button, IconButton} from "@mui/material";
import {useFormStatus} from "react-dom";

type Props = {
    iconButton?: boolean,
    size?: 'small' | 'medium' | 'large',
}

export function SaveFormButton({iconButton, size}: Props) {
    const {pending} = useFormStatus();

    if (iconButton) {
        return <IconButton aria-label="save"
                           size="small"
                           type="submit"
                           color="success">
            <SaveIcon/>
        </IconButton>
    } else {
        return <Button variant="contained"
                       color="success"
                       startIcon={<SaveIcon/>}
                       type="submit"
                       size={size}
                       aria-label="Save"
                       loading={pending}
                       disabled={pending}>
            Save
        </Button>;
    }
}