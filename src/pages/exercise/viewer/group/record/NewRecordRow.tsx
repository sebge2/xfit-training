import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import {DatePicker} from "../../../../../components/core/form/DatePicker.tsx";
import {FormField} from "../../../../../model/core/form/form-field.ts";
import {UserRecord} from "../../../../../model/record/user-record.tsx";
import {AddButton} from "../../../../../components/core/buttton/AddButton.tsx";
import {useState} from "react";
import {InputMinuteSecond} from "../../../../../components/core/form/InputMinuteSecond.tsx";
import {MeasureUnit} from "../../../../../model/exercise/measure-unit.ts";
import {InputNumber} from "../../../../../components/core/form/InputNumber.tsx";
import {InputAdornment} from "@mui/material";

type Props = {
    unit: MeasureUnit,
    onAdd: (record: UserRecord) => Promise<void> | void,
}

export function NewRecordRow({unit, onAdd: onAddDelegate}: Props) {
    function initDateField(date?: Date) {
        return new FormField<Date | undefined>('date', undefined, date, true);
    }

    function initValueField(value?: number) {
        return new FormField<number | undefined>('value', undefined, value, true);
    }

    const [dateField, setDateField] = useState(initDateField());
    const [valueField, setValueField] = useState(initValueField());
    const [resetKey, setResetKey] = useState(0);

    const disabled = !dateField.defaultValue || !valueField.defaultValue;

    async function onAdd(): Promise<void> {
        const newRecord = new UserRecord(valueField.defaultValue as number, dateField.defaultValue as Date);

        await onAddDelegate(newRecord);

        setDateField(initDateField());
        setValueField(initValueField());
        setResetKey(prev => prev + 1);
    }

    return <TableRow
        key="add"
        sx={{
            backgroundColor: 'grey.100',
        }}
    >
        <TableCell align="left">
            <DatePicker key={`date-${resetKey}`}
                        formField={dateField}
                        onChange={(value) => {
                            setDateField(initDateField(value))
                        }}
            />
        </TableCell>
        <TableCell align="left">
            {unit === MeasureUnit.KILOGRAMS &&
                <InputNumber key={`value-${resetKey}`}
                             formField={valueField}
                             endAdornment={<InputAdornment position="end">kg</InputAdornment>}
                             onChange={(value) => {
                                 setValueField(initValueField(value))
                             }}
                />}
            {unit === MeasureUnit.TIME &&
                <InputMinuteSecond key={`value-${resetKey}`} formField={valueField}
                                   onChange={(value) => {
                                       setValueField(initValueField(value))
                                   }}
                />}
        </TableCell>
        <TableCell align="left">
            <AddButton iconButton={true} size="small" onAdd={onAdd} disabled={disabled}/>
        </TableCell>
    </TableRow>;
}