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

type Props = {
    records: UserExerciseGroupRecords,
    unit: MeasureUnit,
};

export function ExerciseRecordsTable({records, unit}: Props) {
    return <TableContainer component={Paper}>
        <Table sx={{minWidth: 650}} size="small" aria-label="My records">
            <TableHead>
                <TableRow>
                    <TableCell align="left">Date</TableCell>
                    <TableCell align="left">Value</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {records.records.map((record, i) => (
                    <TableRow
                        key={i}
                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                    >
                        <TableCell align="left">{record.date.toDateString()}</TableCell>
                        <TableCell align="left">
                            <RecordValueViewer value={record.value} unit={unit} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>;
}