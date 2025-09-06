import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import {ReactElement, useState} from "react";
import {MEASURE_UNIT_LABELS, MeasureUnit} from "../../model/exercise/measure-unit.ts";

type MeasureUnitSelectorProps = {
    id: string,
    originalValue: MeasureUnit,
    onChange: (unit: MeasureUnit) => void
};

export function MeasureUnitSelector({id, originalValue, onChange}: MeasureUnitSelectorProps): ReactElement {
    const [unit, setUnit] = useState(originalValue);

    const handleChange = (event: SelectChangeEvent) => {
        setUnit(event.target.value as MeasureUnit);

        if (onChange) {
            onChange(event.target.value as MeasureUnit);
        }
    };

    const label = 'Unit';

    return <Box sx={{minWidth: 120}}>
        <FormControl fullWidth>
            <InputLabel id={id + 'label'}>{label}</InputLabel>
            <Select
                labelId={id + 'label'}
                id={id}
                name={id}
                value={unit}
                label={label}
                onChange={handleChange}
            >
                {Object.keys(MeasureUnit)
                    .map(unit => unit as MeasureUnit)
                    .map(unit => <MenuItem value={unit}>{MEASURE_UNIT_LABELS[unit]}</MenuItem>)
                }
            </Select>
        </FormControl>
    </Box>;
}