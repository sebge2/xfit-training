import SaveIcon from "@mui/icons-material/Save";
import {Button} from "@mui/material";
import {useFormStatus} from "react-dom";

export function SaveFormButton() {
    const {pending} = useFormStatus();

    return <Button variant="contained"
                   color="success"
                   startIcon={<SaveIcon/>}
                   type="submit"
                   loading={pending}
                   disabled={pending}>
        Save
    </Button>;
}