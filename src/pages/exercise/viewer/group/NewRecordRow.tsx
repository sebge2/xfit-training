import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import {InputAdornment} from "@mui/material";
import {InputDateFormField, DatePicker} from "../../../../components/core/form/DatePicker.tsx";
import {SaveFormButton} from "../../../../components/core/form/SaveFormButton.tsx";
import {InputNumber} from "../../../../components/core/form/InputNumber.tsx";

type Props = {
    dateField: InputDateFormField,
    valueField: any,
}

export function NewRecordRow({dateField, valueField}: Props) {
    return <TableRow
        key="add"
        sx={{
            backgroundColor: 'grey.100',
        }}
    >
        <TableCell align="left">
            <DatePicker formField={dateField}/>
        </TableCell>
        <TableCell align="left">
            <InputNumber formField={valueField}
                         endAdornment={<InputAdornment position="end">kg</InputAdornment>}
            />
        </TableCell>
        <TableCell align="left">
            <SaveFormButton iconButton={true} size="small"/>
        </TableCell>
    </TableRow>;
}