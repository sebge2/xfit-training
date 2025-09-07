import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import {RecordValueViewer} from "../../../../components/activity/RecordValueViewer.tsx";
import {UserRecord} from "../../../../model/record/user-record.tsx";
import {Exercise} from "../../../../model/exercise/exercise.ts";
import {DeleteRowButton} from "../../../../components/core/table/DeleteRowButton.tsx";

type Props = {
    record: UserRecord,
    exercise: Exercise,
}

export function ExistingRecordRow({record, exercise}: Props) {
    function deleteRecord() {
        // TODO
    }

    return <>
        <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}}>
            <TableCell align="left">{record.date.toDateString()}</TableCell>
            <TableCell align="left">
                <RecordValueViewer value={record.value} unit={exercise.unit}/>
            </TableCell>
            <TableCell align="left">
                <DeleteRowButton confirmationText="Are you sure you want to delete this record?" onDelete={deleteRecord}/>
            </TableCell>
        </TableRow>
    </>;
}