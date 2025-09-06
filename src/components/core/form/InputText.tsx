import {TextField} from "@mui/material";
import {ChangeEvent, ReactElement} from "react";
import FormControl from "@mui/material/FormControl";

type Props = {
    id: string,
    originalValue?: string,
    label?: string,
    required?: boolean,
    onChange?: (value: string) => void,
};

export function InputText({
                              id,
                              originalValue,
                              label,
                              required,
                              onChange
                          }: Props): ReactElement {
    function onChangeField(input: ChangeEvent<HTMLInputElement>): void {
        if (onChange) {
            onChange(input.target.value);
        }
    }

    // TODO label around box

    return <FormControl fullWidth>
        <TextField
            id={id}
            name={id}
            label={label}
            value={originalValue}
            required={required}
            onChange={onChangeField}/>
    </FormControl>;
}