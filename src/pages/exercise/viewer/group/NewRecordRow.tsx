import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import {Input, InputAdornment} from "@mui/material";
import {MobileDatePicker} from "@mui/x-date-pickers";
import {SaveRowButton} from "../../../../components/core/table/SaveRowButton.tsx";

export function NewRecordRow() {
    function onSave() {
        // TODO handle save + extract component
    }

    return <TableRow
        key="add"
        sx={{
            backgroundColor: 'grey.100',
        }}
    >
        <TableCell align="left">
            <MobileDatePicker
                format="YYYY-MM-DD"
                slotProps={{
                    textField: {
                        sx: {
                            padding: 0,
                            '> .MuiPickersInputBase-root': {
                                height: '2rem',
                                width: '8.8rem',
                                padding: '0.5rem',
                                marginLeft: '-0.5rem',
                            }
                        }
                    },

                    openPickerButton: {
                        sx: {
                            '& .MuiSvgIcon-root': {
                                fontSize: '1rem'
                            },
                            '& .MuiInputAdornment-outlined': {
                                margin: 0,
                            }
                        },
                    }
                }}
            />
        </TableCell>
        <TableCell align="left">
            <Input
                id="value"
                endAdornment={<InputAdornment position="end">kg</InputAdornment>}
                type="number"
                size="small"
                sx={{minWidth: '4rem'}}
                inputProps={{
                    'aria-label': 'value',
                }}
            />
        </TableCell>
        <TableCell align="left">
            <SaveRowButton onSave={onSave}/>
        </TableCell>
    </TableRow>;
}