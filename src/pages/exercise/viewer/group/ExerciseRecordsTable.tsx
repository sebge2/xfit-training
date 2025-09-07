import {UserExerciseGroupRecords} from "../../../../model/record/user-exercise-group-records.tsx";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {NewRecordRow} from "./NewRecordRow.tsx";
import {ExistingRecordRow} from "./ExistingRecordRow.tsx";
import {Exercise} from "../../../../model/exercise/exercise.ts";

type Props = {
    records: UserExerciseGroupRecords,
    exercise: Exercise,
};

export function ExerciseRecordsTable({records, exercise}: Props) {
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
                    <NewRecordRow/>

                    {records.records.map((record, i) => <ExistingRecordRow key={i} record={record} exercise={exercise}/>)}
                </TableBody>
            </Table>
        </TableContainer>
    </LocalizationProvider>;
}