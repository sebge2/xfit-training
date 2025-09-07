import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import {RecordValueViewer} from "../../../../components/activity/RecordValueViewer.tsx";
import {UserRecord} from "../../../../model/record/user-record.tsx";
import {Exercise} from "../../../../model/exercise/exercise.ts";
import {DeleteButton} from "../../../../components/core/buttton/DeleteButton.tsx";
import {useState} from "react";

type Props = {
    record: UserRecord,
    exercise: Exercise,
    onDelete: () => Promise<void> | void,
}

export function ExistingRecordRow({record, exercise, onDelete: onDeleteDelegation}: Props) {
    const [deleting, setDeleting] = useState(false);

    async function deleteRecord() {
        setDeleting(true);

        await onDeleteDelegation();

        setDeleting(false);
    }

    return <>
        <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}}>
            <TableCell align="left">{record.date.toDateString()}</TableCell>
            <TableCell align="left">
                <RecordValueViewer value={record.value} unit={exercise.unit}/>
            </TableCell>
            <TableCell align="left">
                <DeleteButton confirmationText={`Are you sure to delete record of ${record.date.toDateString()}?`}
                              iconButton={true}
                              deleting={deleting}
                              onDelete={deleteRecord}
                              size="small"/>
            </TableCell>
        </TableRow>
    </>;
}