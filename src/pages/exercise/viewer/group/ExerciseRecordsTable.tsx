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
import {useActionState} from "react";
import {FormState} from "../../../../model/core/form/form-state.ts";
import {FormField} from "../../../../model/core/form/form-field.ts";
import {getDateValue, getNumberValue, validateRequiredFields} from "../../../../utils/form-utils.ts";
import {UserRecord} from "../../../../model/record/user-record.tsx";
import {USER_RECORDS_SERVICE} from "../../../../services/user-records-service.ts";

type Props = {
    groupRecords: UserExerciseGroupRecords,
    exercise: Exercise,
};

export function ExerciseRecordsTable({groupRecords, exercise}: Props) {
    const dateField = new FormField<Date | undefined>('date', undefined, undefined);
    const valueField = new FormField<number | undefined>('value', 'Value', undefined);
    const originalSaveState = FormState.create([dateField, valueField]);

    async function onSave(prev: FormState, formData: FormData): Promise<FormState> {
        const newState = prev.reset();

        validateRequiredFields(newState, formData);

        if (newState.isSuccessful) {
            const newRecord = new UserRecord(getNumberValue(valueField, formData) as number, getDateValue(dateField, formData) as Date);

            await USER_RECORDS_SERVICE.addUserRecord(exercise.id, groupRecords, newRecord);

            // TODO handle refresh
        }

        return newState;
    }

    const [, saveAction] = useActionState<FormState, FormData>(onSave, originalSaveState);

    return <LocalizationProvider dateAdapter={AdapterDayjs}>
        <form action={saveAction}>
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
                        <NewRecordRow dateField={dateField} valueField={valueField}/>

                        {groupRecords.records
                            .map((record, i) => <ExistingRecordRow key={i} record={record} exercise={exercise}/>)}
                    </TableBody>
                </Table>
            </TableContainer>
        </form>
    </LocalizationProvider>;
}