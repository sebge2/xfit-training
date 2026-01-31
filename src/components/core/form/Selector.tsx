import {ReactElement} from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {FormHelperText} from "@mui/material";
import {FormField} from "../../../model/core/form/form-field.ts";

export interface SelectorItem<T> {
    value: T;
    label: string;
}

type Props<T> = {
    formField: FormField<T>,
    items: SelectorItem<T>[],
};

export function Selector<T>({formField, items}: Props<T>): ReactElement {
    const labelId = `${formField.id}-label`;

    return <Box sx={{minWidth: '5rem', paddingTop: '1rem'}}>
        <FormControl fullWidth variant="outlined">
            <InputLabel id={labelId}>{formField.label}</InputLabel>
            <Select
                labelId={labelId}
                id={formField.id}
                name={formField.id}
                defaultValue={formField.defaultValue}
                label={formField.label}
            >
                {items.map(item => <MenuItem value={item.value as string}>{item.label}</MenuItem>)}
            </Select>
            {formField.required && <FormHelperText>{formField.joinedError || 'Required'}</FormHelperText>}
        </FormControl>
    </Box>;
}