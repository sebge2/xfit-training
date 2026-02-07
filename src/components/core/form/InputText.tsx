import TextField from '@mui/material/TextField';
import {ReactElement} from "react";
import FormControl from "@mui/material/FormControl";
import {FormField} from "../../../model/core/form/form-field.ts";
import {FormHelperText} from "@mui/material";

export type InputTextFormField = FormField<string | unknown>;

type Props = {
    formField: InputTextFormField,
};

export function InputText({formField,}: Props): ReactElement {
    return <FormControl fullWidth sx={{mt: '0.3rem'}}>
        <TextField
            id={formField.id}
            name={formField.id}
            label={formField.label}
            defaultValue={formField.defaultValue}
            error={formField.hasErrors}
            slotProps={{
                inputLabel: {
                    shrink: true
                }
            }}/>
        {formField.required && <FormHelperText>{formField.joinedError || 'Required'}</FormHelperText>}
    </FormControl>;
}