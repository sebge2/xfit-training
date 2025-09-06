import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import {ReactElement} from "react";
import {MEASURE_UNIT_LABELS, MeasureUnit} from "../../model/exercise/measure-unit.ts";
import {FormHelperText} from "@mui/material";
import {FormField} from "../../model/core/form/form-field.ts";

type Props = {
    formField: FormField,
};

export function MeasureUnitSelector({formField}: Props): ReactElement {
    return <Box sx={{minWidth: 120}}>
        <FormControl fullWidth>
            <InputLabel id={formField.id + 'label'}>{formField.label}</InputLabel>
            <Select
                labelId={formField.id + 'label'}
                id={formField.id}
                name={formField.id}
                defaultValue={formField.defaultValue}
                label={formField.label}
            >
                {Object.keys(MeasureUnit)
                    .map(unit => unit as MeasureUnit)
                    .map(unit => <MenuItem value={unit}>{MEASURE_UNIT_LABELS[unit]}</MenuItem>)
                }
            </Select>
            {formField.required && <FormHelperText>{formField.joinedError || 'Required'}</FormHelperText>}
        </FormControl>
    </Box>;
}