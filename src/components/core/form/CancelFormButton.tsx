import CancelIcon from "@mui/icons-material/Cancel";
import {Button} from "@mui/material";
import {useFormStatus} from "react-dom";

type Props = {
    onCancel: () => void,
}

export function CancelFormButton({onCancel}: Props) {
    const {pending} = useFormStatus();

    return <Button variant="outlined"
                   color="primary"
                   startIcon={<CancelIcon/>}
                   onClick={onCancel}
                   disabled={pending}>
        Cancel
    </Button>;
}