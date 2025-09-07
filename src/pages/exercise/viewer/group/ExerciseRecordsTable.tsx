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
import {validateRequiredFields} from "../../../../utils/form-utils.ts";

type Props = {
    records: UserExerciseGroupRecords,
    exercise: Exercise,
};

export function ExerciseRecordsTable({records, exercise}: Props) {
    const dateField = new FormField<Date | undefined>('date', undefined, undefined);
    const valueField = new FormField<number | undefined>('value', 'Value', undefined);
    const originalSaveState = FormState.create([dateField, valueField]);

    async function onSave(prev: FormState, formData: FormData): Promise<FormState> {
        const newState = prev.reset();

        validateRequiredFields(newState, formData);

        if (newState.isSuccessful) {
            console.log(formData.get('date'), formData.get('value'));

            // exercise.comment = getTextValue(commentField, formData);
            // exercise.unit = getMeasureUnitValue(measureUnitField, formData);
            // exercise.subCategory = getSubCategoryValue(categoryField, formData);
            // exercise.tags = getExerciseTagsValue(tagsField, formData);


            // TODO handle
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

                        {records.records
                            .map((record, i) => <ExistingRecordRow key={i} record={record} exercise={exercise}/>)}
                    </TableBody>
                </Table>
            </TableContainer>
        </form>
    </LocalizationProvider>;
}