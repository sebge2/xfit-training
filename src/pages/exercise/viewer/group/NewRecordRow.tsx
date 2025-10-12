import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import {InputAdornment} from "@mui/material";
import {DatePicker} from "../../../../components/core/form/DatePicker.tsx";
import {InputNumber} from "../../../../components/core/form/InputNumber.tsx";
import {FormField} from "../../../../model/core/form/form-field.ts";
import {UserRecord} from "../../../../model/record/user-record.tsx";
import {AddButton} from "../../../../components/core/buttton/AddButton.tsx";
import {useState} from "react";

type Props = {
    onAdd: (record: UserRecord) => Promise<void> | void,
}

export function NewRecordRow({onAdd: onAddDelegate}: Props) {
    function initDateField(date?: Date) {
        return new FormField<Date | undefined>('date', undefined, date, true);
    }

    function initValueField(value?: number) {
        return new FormField<number | undefined>('value', 'Value', value, true);
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
            <InputNumber key={`value-${resetKey}`}
                         formField={valueField}
                         endAdornment={<InputAdornment position="end">kg</InputAdornment>}
                         onChange={(value) => {
                             setValueField(initValueField(value))
                         }}
            />
        </TableCell>
        <TableCell align="left">
            <AddButton iconButton={true} size="small" onAdd={onAdd} disabled={disabled}/>
        </TableCell>
    </TableRow>;
}