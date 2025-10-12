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
import {UserRecord} from "../../../../model/record/user-record.tsx";
import {USER_RECORDS_SERVICE} from "../../../../services/user-records-service.ts";
import {useState} from "react";

type Props = {
    groupRecords: UserExerciseGroupRecords,
    exercise: Exercise,
};

export function ExerciseRecordsTable({groupRecords: originalGroupRecords, exercise}: Props) {
    const [groupRecords, setGroupRecords] = useState(originalGroupRecords);

    async function onAdd(newRecord: UserRecord) {
        const userRecords = await USER_RECORDS_SERVICE.addUserRecord(exercise.id as string, groupRecords, newRecord);

        // TODO handle not successful

        setGroupRecords(userRecords.group(groupRecords.id));
    }

    async function onDelete(record: UserRecord): Promise<void> {
        const userRecords =await USER_RECORDS_SERVICE.deleteUserRecord(exercise.id as string, groupRecords, record);
        // TODO handle not successful

        setGroupRecords(userRecords.group(groupRecords.id));
    }

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
                    <NewRecordRow onAdd={onAdd}/>

                    {groupRecords.records
                        .map((record, i) => <ExistingRecordRow key={i} record={record} exercise={exercise}
                                                               onDelete={() => onDelete(record)}/>)}
                </TableBody>
            </Table>
        </TableContainer>
    </LocalizationProvider>;
}