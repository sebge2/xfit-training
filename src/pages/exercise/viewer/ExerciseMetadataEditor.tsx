import {useNavigate, useRouteLoaderData} from "react-router-dom";
import Box from "@mui/material/Box";
import {Exercise} from "../../../model/exercise/exercise.ts";
import {UserExerciseRecords} from "../../../model/record/user-exercise-records.tsx";
import {AUTHENTICATION_SERVICE} from "../../../services/authentication-service.ts";
import {Permission} from "../../../model/auth/permission.ts";
import {MeasureUnitSelector} from "../../../components/activity/MeasureUnitSelector.tsx";
import {CategorySelector} from "../../../components/activity/CategorySelector.tsx";
import {ExerciseTag} from "../../../model/exercise/exercise-tag.ts";
import {useActionState} from "react";
import {FormState} from "../../../model/core/form/form-state.ts";
import {InputText} from "../../../components/core/form/InputText.tsx";
import Stack from '@mui/material/Stack';
import {
    getExerciseTagsValue,
    getMeasureUnitValue,
    getSubCategoryValue,
    getTextValue,
    validateRequiredFields
} from "../../../utils/form-utils.ts";
import {EXERCISE_SERVICE} from "../../../services/exercise-service.ts";
import {SaveFormButton} from "../../../components/core/form/SaveFormButton.tsx";
import {CancelFormButton} from "../../../components/core/form/CancelFormButton.tsx";
import {FormField} from "../../../model/core/form/form-field.ts";
import {MeasureUnit} from "../../../model/exercise/measure-unit.ts";
import {SubCategory} from "../../../model/exercise/sub-category.ts";
import {ExerciseTagSelector} from "../../../components/activity/ExerciseTagSelector.tsx";

export function ExerciseMetadataEditor() {
    const routeData = useRouteLoaderData('exercise-details') as { exercise: Exercise, records: UserExerciseRecords };
    const exercise = routeData.exercise;

    const navigate = useNavigate();

    const commentField = new FormField<string | undefined>('comment', 'Comment', exercise.comment);
    const measureUnitField = new FormField<MeasureUnit>('measure-unit', 'Unit', exercise.unit, true);
    const categoryField = new FormField<SubCategory>('category', 'Category', exercise.subCategory, true);
    const tagsField = new FormField<ExerciseTag[]>('tags', 'Tags', exercise.tags, true);
    const originalFormState = FormState.create([commentField, measureUnitField, categoryField, tagsField]);

    async function onSave(prev: FormState, formData: FormData): Promise<FormState> {
        const newState = prev.reset();

        validateRequiredFields(newState, formData);

        if (newState.isSuccessful) {
            exercise.comment = getTextValue(commentField, formData);
            exercise.unit = getMeasureUnitValue(measureUnitField, formData);
            exercise.subCategory = getSubCategoryValue(categoryField, formData);
            exercise.tags = getExerciseTagsValue(tagsField, formData);

            await EXERCISE_SERVICE.update(exercise); // TODO handle error

            navigate("..?tabIndex=0", {replace: true}); // TODO move to route utils
        }

        return newState;
    }

    const [, formAction] = useActionState<FormState, FormData>(onSave, originalFormState);

    function onCancel() {
        navigate("..?tabIndex=0", {replace: true}); // TODO move to route utils
    }

    return <form action={formAction}>
        <Stack spacing={4}>
            <InputText formField={commentField}/>

            <MeasureUnitSelector formField={measureUnitField}/>

            <CategorySelector formField={categoryField}/>

            <ExerciseTagSelector formField={tagsField}/>
        </Stack>

        {AUTHENTICATION_SERVICE.currentUserOrFail.hasPermission(Permission.MODIFY_EXERCISE) &&
            <Box component="section">
                <Box sx={{display: 'flex', gap: '2rem', marginTop: '2rem'}}>
                    <CancelFormButton onCancel={onCancel}/>
                    <SaveFormButton/>
                </Box>
            </Box>}
    </form>;
}