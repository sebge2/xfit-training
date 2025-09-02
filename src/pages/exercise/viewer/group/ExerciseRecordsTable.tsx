import {UserExerciseGroupRecords} from "../../../../model/record/user-exercise-group-records.tsx";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {MeasureUnit} from "../../../../model/exercise/measure-unit.ts";
import {RecordValueViewer} from "../../../../components/activity/RecordValueViewer.tsx";
import {IconButton, Input, InputAdornment} from "@mui/material";
import {MobileDatePicker} from "@mui/x-date-pickers";
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';

type Props = {
    records: UserExerciseGroupRecords,
    unit: MeasureUnit,
};

export function ExerciseRecordsTable({records, unit}: Props) {
    return <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TableContainer component={Paper}>
            <Table size="small" aria-label="My records">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Date</TableCell>
                        <TableCell align="left">Value</TableCell>
                        <TableCell align="left">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow
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
                            <IconButton aria-label="save" size="small">
                                <SaveIcon />
                            </IconButton>
                        </TableCell>
                    </TableRow>

                    {records.records.map((record, i) => (
                        <TableRow
                            key={i}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell align="left">{record.date.toDateString()}</TableCell>
                            <TableCell align="left">
                                <RecordValueViewer value={record.value} unit={unit}/>
                            </TableCell>
                            <TableCell align="left">
                                <IconButton aria-label="save" size="small">
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </LocalizationProvider>;
}