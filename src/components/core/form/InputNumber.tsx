import * as React from "react";
import {ReactElement} from "react";
import FormControl from "@mui/material/FormControl";
import {FormField} from "../../../model/core/form/form-field.ts";
import {FormHelperText, Input} from "@mui/material";

export type InputNumberFormField = FormField<number | unknown>;

type Props = {
    formField: InputNumberFormField,
    endAdornment?: React.ReactNode,
};

export function InputNumber({formField, endAdornment}: Props): ReactElement {
    return <FormControl fullWidth>
        <Input
            type="number"
            id={formField.id}
            name={formField.id}
            defaultValue={formField.defaultValue}
            error={formField.hasErrors}
            endAdornment={endAdornment}/>
        {formField.required && <FormHelperText>{formField.joinedError || 'Required'}</FormHelperText>}
    </FormControl>;
}