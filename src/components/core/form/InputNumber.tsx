import * as React from "react";
import {ReactElement} from "react";
import FormControl from "@mui/material/FormControl";
import {FormField} from "../../../model/core/form/form-field.ts";
import {FormHelperText, Input} from "@mui/material";

export type InputNumberFormField = FormField<number | unknown>;

type Props = {
    formField: InputNumberFormField,
    endAdornment?: React.ReactNode,
    onChange?: (value: number | undefined) => Promise<void> | void,
};

export function InputNumber({formField, endAdornment, onChange: onChangeDelegate}: Props): ReactElement {
    async function onChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (onChangeDelegate) {
            await onChangeDelegate((event.target.value !== '') ? +event.target.value : undefined);
        }
    }

    return <FormControl fullWidth>
        <Input
            type="number"
            id={formField.id}
            name={formField.id}
            defaultValue={formField.defaultValue}
            error={formField.hasErrors}
            endAdornment={endAdornment}
            onChange={onChange}/>
        {formField.required && <FormHelperText>{formField.joinedError || 'Required'}</FormHelperText>}
    </FormControl>;
}